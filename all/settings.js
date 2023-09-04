require("./module")

global.owner = "6285786539008"
global.namabot = "ShinzuuMD"
global.namaCreator = "Angel Bot 〆 THE PART OF TENSE"
global.autoJoin = false
global.antilink = false
global.versisc = '4.0.0'
global.codeInvite = "CswK4kvQD1u7SfSmsYfMHZ"
global.domain = 'https://xenzsenpai.sanzz-hosting.my.id' // Isi Domain Lu
global.apikey = 'ptla_3oRLYQ691ZoBMMfv5TMsUH9uGv3KTwEr37pTOCmeRxg' // Isi Apikey Plta Lu
global.capikey = 'ptlc_Lh2Qx4i2T8y1PyhXpA79a70zb84zoSuJVjro25yRqmf' // Isi Apikey Pltc Lu
global.eggsnya = '5' // id eggs yang dipakai
global.location = '15' // id location
global.thumb = fs.readFileSync("./thumb.png")
global.audionya = fs.readFileSync("./all/sound.mp3")
global.tekspushkon = ""
global.tekspushkonv2 = ""
global.packname = ""
global.author = "Sticker By Fahrul"
global.jumlah = "5"
global.wagc = "https://chat.whatsapp.com/FSbrP6LWWm4A8i8uGdyDTs"
global.keyopenai = "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"
global.wtf = "fahrul"

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})
