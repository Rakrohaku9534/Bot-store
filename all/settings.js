require("./module")

global.owner = "6281351692548"
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
global.author = "Sticker By Kyuu"
global.jumlah = "5"
global.wagc = "https://chat.whatsapp.com/GxpCNxNd7w99fjSzHJPwGL"
global.keyopenai = "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"
global.wtf = "kikyy"

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})