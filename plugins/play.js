let fetch = require('node-fetch')
let handler = async(m, { conn, text }) => {
    if (!text) throw 'masukin judulnya!'
    let yt = await fetch(`https://zenzapis.xyz/downloader/y2mate?apikey=SyaizZ&query=${text}`)
    let json = await yt.json()
    if (!json.status) throw json
    let js = json.result
    let txt = `
[ *PLAY MUSIC* ]
*title:* ${js.title}
*size:* ${js.sizeAudio}
link ${js.link}

_*sabar audio akan dikirim*_
`
    conn.sendFile(m.chat, js.thumb, '', txt, m)
    conn.sendFile(m.chat, json.result.getAudio, '', '', m)
}
handler.help = ['play']
handler.tags = ['downloader']
handler.command = /^(ytp|play)$/i

module.exports = handler
