const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, MessageType, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@adiwajshing/baileys')
let fs = require('fs')
let path = require('path')
let fetch = require('node-fetch')
let moment = require('moment-timezone')
let levelling = require('../lib/levelling')
let tags = {
  'rpgabsen': '𝐑𝐏𝐆-𝐀𝐁𝐒𝐄𝐍',
  'rpg': '𝐑𝐏𝐆',
  'game': '𝐆𝐀𝐌𝐄',
  'xp': '𝐄𝐗𝐏, 𝐋𝐈𝐌𝐈𝐓',
  'asupan': '𝐀𝐒𝐔𝐏𝐀𝐍',
  'sticker': '𝐒𝐓𝐈𝐊𝐄𝐑',
  'main': '𝐌𝐀𝐈𝐍',
  'kerang': '𝐊𝐄𝐑𝐀𝐍𝐆 𝐀𝐉𝐀𝐈𝐁',
  'quotes': '𝐐𝐔𝐎𝐓𝐄𝐒',
  'admin': '𝐀𝐃𝐌𝐈𝐍',
  'group': '𝐆𝐑𝐔𝐏',
  'internet': '𝐈𝐍𝐓𝐄𝐑𝐍𝐄𝐓',
  'anonymous': '𝐀𝐍𝐎𝐍𝐘𝐌𝐎𝐔𝐒 𝐂𝐇𝐀𝐓',
  'downloader': '𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑',
  'berita': '𝐁𝐄𝐑𝐈𝐓𝐀',
  'tools': '𝐓𝐎𝐎𝐋𝐒',
  'fun': '𝐅𝐔𝐍',
  'database': '𝐃𝐀𝐓𝐀𝐁𝐀𝐒𝐄', 
  'vote': '𝐕𝐎𝐓𝐈𝐍𝐆',
  'absen': '𝐀𝐁𝐒𝐄𝐍',
  'catatan': '𝐂𝐀𝐓𝐀𝐓𝐀𝐍',
  'jadian': '𝐉𝐀𝐃𝐈𝐀𝐍',
  'islami': '𝐈𝐒𝐋𝐀𝐌𝐈',
  'owner': '𝐎𝐖𝐍𝐄𝐑',
  'virtex': '𝗩𝗜𝗥𝗧𝗘𝗫',
  'info': '𝐈𝐍𝐅𝐎',
  'audio': '𝐀𝐔𝐃𝐈𝐎',
  'maker': '𝐌𝐀𝐊𝐄𝐑',
}
const defaultMenu = {
  before: `
❂═══❖•ೋ•
╟ꂑ 𝐻𝑎𝑖, %ucapan %name! 👋
╟  
╟⌛*𝕎𝔸𝕂𝕋𝕌:* 
╟%wib WIB
╟%wita WITA
╟%wit WIT
╟🌄*𝐇𝐚𝐫𝐢:* %week
╟📅*𝐓𝐚𝐧𝐠𝐠𝐚𝐥:* %date
╟🕔*𝐔𝐩𝐭𝐢𝐦𝐞:* %uptime (%muptime)
╚»★★ミ


📊*𝐋𝐢𝐦𝐢𝐭𝐦𝐮:* %limit
📶*𝐋𝐞𝐯𝐞𝐥𝐦𝐮:* %level
🏋️‍♀️*𝐄𝐱𝐩𝐦𝐮:* %exp
%readmore`.trimStart(),
  header: '⃝▣──「 %category 」───⬣',
  body: '│ ○ %cmd %islimit %isPremium',
  footer: '▣────────────⬣\n',
  after: `ᴄʀᴇᴀᴛᴇ ʙʏ Qᴜᴇᴇɴᴢʏ
ᴠᴇʀꜱɪᴏɴ | %version
${'ᴀᴜᴛʜᴏʀ: ᴅᴇᴠxʏᴢ '}
`,
}

handler.all = async function (m, { isBlocked }) {
    if (isBlocked) return

      let regl = /(cok)/i
    let isLoveYou = regl.exec(m.text)
    let lovou = [
'Hay kak/bang, ada yang bisa saya bantu? klik button untuk fitur yang saya punya'
]
let loveyou = lovou[Math.floor(Math.random() * lovou.length)]
    if (isLoveYou && !m.fromMe) {


        conn.sendButton(m.chat, loveyou,`Author: DevXyZ %uptime`, 'https://telegra.ph/file/4f4ad87466958814ef22b.jpg',[['All Fitur','/semua']], m, { asLocation: true })
    }
    }

let handler = async (m, { conn, usedPrefix: _p }) => {
  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let { exp, limit, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    const wib = moment.tz('Asia/Jakarta').format("HH:mm:ss")
    const wita = moment.tz('Asia/Makassar').format("HH:mm:ss")
    const wit = moment.tz('Asia/Jayapura').format("HH:mm:ss")
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? 'Ⓛ' : '')
                .replace(/%isPremium/g, menu.premium ? 'Ⓟ' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.getName(conn.user.jid),
      ucapan: ucapan(),
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      level, limit, name, weton, week, date, dateIslamic, wib, wit, wita, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    conn.sendHydrated(m.chat, text.trim(), 'Ⓟ premium | Ⓛ limit', 'https://telegra.ph/file/4f4ad87466958814ef22b.jpg', 'Polsek terdekat, Awoawok... dipenjara 9 bulan lu tod', 'Jangan dibuka!!!','6285609524655', 'Telepon Owner via seluler',  [
      ['Donate', '/donasi'],
      ['Sewa Bot', '/sewa'],
      ['Owner', '/owner']
    ], m, { asLocation: true })
        /*let url = `https://telegra.ph/file/ab1df70dfd5c2bac64da1.jpg`.trim()
    let res = await fetch(url)
    let buffer = await res.buffer()
    let message = await prepareWAMessageMedia({ image: buffer }, { upload: conn.waUploadToServer })
                const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
                    templateMessage: {
                        hydratedTemplate: {
                            imageMessage: message.imageMessage,
                            hydratedContentText: text.trim(),
                            hydratedFooterText:'Ⓟ premium | Ⓛ limit',
                            hydratedButtons: [{
                                urlButton: {
                                    displayText: 'Website',
                                    url: 'https://Ainebot.github.io/'
                                }
                            }, {
                                quickReplyButton: {
                                    displayText: 'Donasi',
                                    id: '/donasi'
                                }
                            }, {
                                quickReplyButton: {
                                    displayText: 'Sewa',
                                    id: '/sewa'
                                }  
                            }, {
                                quickReplyButton: {
                                    displayText: 'Owner',
                                    id: '/owner'
                                }
                            }]
                        }
                    }
                }), { userJid: m.chat, quoted: m })
                conn.relayMessage(m.chat, template.message, { messageId: template.key.id })*/
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu']
handler.tags = ['main']
handler.command = /^(semua|\?)$/i

handler.exp = 3


handler.all = async function (m, { isBlocked }) {
    if (isBlocked) return

      let regl = /(queenzy|.menu|help)/i
    let isLoveYou = regl.exec(m.text)
    let lovou = [
'Hay kak/bang, ada yang bisa saya bantu? klik button untuk fitur yang saya punya'
]
let loveyou = lovou[Math.floor(Math.random() * lovou.length)]
    if (isLoveYou && !m.fromMe) {


        conn.sendButton(m.chat, loveyou,`Author: DevXyZ`, 'https://telegra.ph/file/4f4ad87466958814ef22b.jpg',[['All Fitur','/semua']], m, { asLocation: true })
    }
    }


handler.limit = true

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function ucapan() {
        const hour_now = moment.tz('Asia/Jakarta').format('HH')
        var ucapanWaktu = 'Pagi kak'
        if (hour_now >= '03' && hour_now <= '10') {
          ucapanWaktu = 'Pagi kak'
        } else if (hour_now >= '10' && hour_now <= '15') {
          ucapanWaktu = 'Siang kak'
        } else if (hour_now >= '15' && hour_now <= '17') {
          ucapanWaktu = 'Sore kak'
        } else if (hour_now >= '17' && hour_now <= '18') {
          ucapanWaktu = 'Selamat Petang kak'
        } else if (hour_now >= '18' && hour_now <= '23') {
          ucapanWaktu = 'Malam kak'
        } else {
          ucapanWaktu = 'Selamat Begadang'
        }	
        return ucapanWaktu
}
