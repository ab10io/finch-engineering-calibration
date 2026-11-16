let input = ''
process.stdin.on('data', chunk => { input += chunk })
process.stdin.on('end', () => console.log(JSON.stringify(JSON.parse(input), null, 2)))
