let handler = async m => m.reply(`
╭─「 Donasi • Pulsa 」
│ •  [0896-3026-7618 DANA]
│ •  [0895-3230-40460 DANA]
╰────
`.trim()) // Tambah sendiri kalo mau
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

module.exports = handler
