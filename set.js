const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWU5QU3NCdzFpaEsrcWVOUTFydkRpL05scjJsTTJUaWJYVHIrZE1DRFZuUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZWVFbHdZNlJna2R6amFKeHhmSGJEY0FNZXE0N3I5bklsZHo0TzFweTlBMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0RlFkVktISWtUcjFiSmcyd1lBUS9qMDMrZzYvYWZlTjlhb0lRbGFLeTBFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPYnNZMWYrVU9sMWZZa3JqL202R1JrdE4rbS8zcjZsWXRaaUU4RW1leVVvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVIeU1wUlVoMzFVM1JGamtCZUZyUWpob0RMaGlYeWh1SmRKR2NwTFhrRUU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii9XemFLMWVUa2RyV0h3b29NeDVoYm5ZUGZ4YmlHZHc3MWk4ZmRxMVQ3MkE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUl4endxWXpZeXgrUzVPQW9vbjNHc05xYmZwdjVPdElwaThyN3J2c1FIWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWFNCWDcxeS9tTkhqUnBNVC9PMDRhTGdxUmpvSE01ekVPYWJMd0NqOEF6UT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZCeXBOemw3OHBHZXdlSHF1OGJyejV4bVFVb3hwTit3QitLNjVoQ09wZWdvOWtFMGhFdHB5ZHpEdFdXMlVvdjE3R3BPSDZONmxSRWNYYkxzSlJMeURnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTU1LCJhZHZTZWNyZXRLZXkiOiIzaEhBTHRESlVVM0w4U0VXUU14TkdvM2drSTBBRktybEg0SUxmdHhPWW1BPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDgxNDQzMTcxNTJAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiOTRCMEUyOUQ0Qzg0MjkyMUE2QTNFNUY5Qjg4OEEzM0YifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyNDUyODgxNX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoibEZsSGR3dVZTUnliOWM0M2pMam1mZyIsInBob25lSWQiOiJkODEzNmNiYS00NmY1LTRkYjktOWY3MS0zODBlMjQ2NWZjZjEiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVERRVnhlRnMxZS9VTmtJY0p0eHh2OFZUWW9NPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlhmRkFRS1dhRytFM1MwVnh6ZTFUZmFyaEJrTT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiI5UEFDQlBIWiIsIm1lIjp7ImlkIjoiMjM0ODE0NDMxNzE1Mjo1NEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSjJyLzV3Q0VKN3hxTFlHR0E4Z0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiQ0Y0eVZEVWxZcE4xd0hnK1hLaG1UZFNWMFpOMmJVV2h1WUNMSlNsbUYzND0iLCJhY2NvdW50U2lnbmF0dXJlIjoiVVJvK3JCVTUvakU1RnpramRjQmFBbjZ4Y0g4M09ENGkvUm96VS9Gd1R6OXNKQktBcjFFdU8rMVZSQmNpdHBqbFQ0cjhvdjdTdzI1bS94ZTJjSXB3Q0E9PSIsImRldmljZVNpZ25hdHVyZSI6IngyZEgyZm14OXZOL2hKRjBWd1pMWUtwRXkvWWM0b3pnNTNhNFpST25vZGpLOGpRQ1ppQTlia3c5Y25MM3hpYW9EeGRtR1B4dklKUFE3c2xwaE1iR0RBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0ODE0NDMxNzE1Mjo1NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJRaGVNbFExSldLVGRjQjRQbHlvWmszVWxkR1RkbTFGb2JtQWl5VXBaaGQrIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI0NTI4ODExLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU5LcSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Wally Jay Tech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2348144317152",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'WALLYJAYTECH-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://graph.org/file/b373b90acd94cb2908739.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'online',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});


