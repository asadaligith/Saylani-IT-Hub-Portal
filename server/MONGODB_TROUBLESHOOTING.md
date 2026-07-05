# MongoDB Connection & DNS Troubleshooting Guide

This guide summarizes the analysis, debugging process, and permanent resolution steps for the `querySrv ECONNREFUSED` error and MongoDB connection failures. Use this guide if you encounter these issues again in the future.

---

## 🔍 Understanding the Errors

### 1. `querySrv ECONNREFUSED` (DNS SRV Error)
* **What it looks like:** 
  ```text
  Error: querySrv ECONNREFUSED _mongodb._tcp.cluster0.xxxxxx.mongodb.net
  ```
* **Why it happens:** MongoDB's modern connection strings (`mongodb+srv://`) use **SRV DNS records** to dynamically find the hosts in your MongoDB Atlas cluster. Some local networks, routers, ISPs, or local DNS proxies (like `127.0.0.1` setups) do not support or block SRV record lookups, resulting in an immediate lookup failure.

### 2. `queryTxt ETIMEOUT` (DNS TXT Error)
* **What it looks like:**
  ```text
  Error: queryTxt ETIMEOUT cluster0.xxxxxx.mongodb.net
  ```
* **Why it happens:** Along with SRV records, `mongodb+srv://` URIs lookup **TXT records** to fetch cluster parameters (such as `replicaSet` name, SSL settings, etc.). If external DNS requests (like `8.8.8.8`) are restricted or rate-limited by your ISP/firewall, these TXT queries will time out.

### 3. Password Angle Brackets `<...>` (Credential Parsing Error)
* **What it looks like:**
  ```text
  MongooseServerSelectionError: connection timed out OR Authentication failed
  ```
* **Why it happens:** MongoDB Atlas provides connection strings with a placeholder password: `mongodb+srv://username:<password>@cluster0...`. If you keep the angle brackets (`<` and `>)` in your `.env` file, the MongoDB client interprets them literally as part of the password, causing authentication to fail.

---

## 🛠️ Step-by-Step Resolution Workflow

### Phase 1: Clean Your Password
Ensure the password does **NOT** contain `<` and `>`.
* **Incorrect:** `mongodb+srv://user:<myPassword123>@cluster0...`
* **Correct:** `mongodb+srv://user:myPassword123@cluster0...`

---

### Phase 2: Switch to Non-SRV connection string (Recommended)
If your network blocks SRV/TXT queries, the most robust solution is to bypass SRV DNS entirely and connect directly using the standard `mongodb://` protocol. 

1. Go to your MongoDB Atlas Dashboard.
2. Select **Connect** -> **Drivers**.
3. Under the driver version, select a legacy driver version (e.g., Node.js **2.2.12 or later**). This will output a standard connection string format that lists all cluster replica shards directly.
4. Set your `.env` URI to this format:
   ```env
   MONGO_URI=mongodb://username:password@shard-00-00.mongodb.net:27017,shard-00-01.mongodb.net:27017,shard-00-02.mongodb.net:27017/?ssl=true&replicaSet=atlas-shard-0&authSource=admin
   ```
5. Restart your application.

---

### Phase 3: Programmatic DNS Fallback (Node.js Level)
If you must use `mongodb+srv://` but local DNS is failing, you can force Node.js to resolve DNS queries using Google's public DNS servers (`8.8.8.8` & `8.8.4.4`). 

Add the following to your database connection file (e.g., `db.js`) **before** calling `mongoose.connect()`:

```javascript
const dns = require('dns');

// Force Node.js process to resolve DNS queries using Google DNS
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
  console.log("DNS servers set to Google DNS (8.8.8.8, 8.8.4.4)");
} catch (error) {
  console.error("Failed to set custom DNS servers:", error);
}
```

> [!WARNING]
> Programmatic DNS resolution only works for functions inside Node's native `dns` module (such as `dns.resolveSrv`). It does **not** override `dns.lookup` (which uses the OS resolver `getaddrinfo`). Therefore, if the raw shard hostnames cannot be resolved by your OS, you must resolve your network/DNS configuration.

---

## 📋 Diagnostics Check Script
You can use this simple script to quickly diagnose where the connection is failing:

```javascript
const dns = require('dns');
const mongoose = require('mongoose');

console.log("System DNS Servers:", dns.getServers());

// 1. Test SRV lookup
dns.resolveSrv('_mongodb._tcp.cluster0.b2xcqgp.mongodb.net', (err, addresses) => {
    if (err) {
        console.error("❌ SRV Lookup Failed:", err.message);
    } else {
        console.log("✅ SRV Lookup Succeeded. Found shards:", addresses.map(a => a.name));
    }
});

// 2. Test Connection
mongoose.connect("YOUR_CONNECTION_STRING", { serverSelectionTimeoutMS: 5000 })
    .then(() => {
        console.log("✅ Mongoose Connection Success!");
        process.exit(0);
    })
    .catch(err => {
        console.error("❌ Mongoose Connection Failed:", err.message);
        process.exit(1);
    });
```
