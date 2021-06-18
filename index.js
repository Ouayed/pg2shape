var cmd = require('child_process').execFile // { spawn,execFile,fork,exec } 
var argv = require('minimist')(process.argv.slice(2));
var chalk = require('chalk');
const path = require("path")

console.log(chalk.green('\nUsage: pg2shape -d <database> [-w <password>] [-h <host>] [-p <port>] [-s <query|table>] [-q <where clause>] [-f <outputfile>]\n'))

if (argv.help) {
     console.log(chalk.green('--help print this help'))
     console.log(chalk.green('-p port'))
     console.log(chalk.green('-w password'))
     console.log(chalk.green('-h host'))
     console.log(chalk.green('-u dbuser'))
     console.log(chalk.green('-d database'))
     console.log(chalk.green('-s query or tablename'))
     console.log(chalk.green('-q where clause'))
     console.log(chalk.green('-o order by clause'))
     console.log(chalk.green('-l limit '))
     console.log(chalk.green('-f output shapefile fullpath '))
     console.log(chalk.blue('\nExample: pg2shape -d WDB -w **** -h localhost -p 5432 -s [t1|"select * from t1 where ..."] -f .\output\export_xxxx.shp\n'))
     return
}

var port = ['-p', argv.p    || 5432]
var pass = argv.w?['-P',argv.w  ]:[]
var user = ['-u',argv.u     || 'postgres']
var host = ['-h',argv.h     || 'localhost']


var limit = argv.l && !isNaN(argv.l) ? (" limit " + argv.l) : ''

var where = argv.q ? (" where " + argv.q) : ''

var orderby = argv.o ? (" order by " + argv.o) : ''

var sql = argv.s  //|| `SELECT * from wdb_profielen_hoeveelheden_all${where}`

if(!argv.s){
     console.log(chalk.orange('No query or table, usage: -s table or "select * from table"'))
     return
}

var query = `${sql} ${where} ${orderby} ${limit}`
if (sql.match(/\w+/g).length ==1 && (limit||where)){//its table
     query = `select * from ${query}`
}
query = `"${query}"`

var database_query = [argv.d || 'postgres',query]

var destFile = ['-f',(argv.f ? path.resolve(argv.f) : null) || path.resolve('output', `export_${Date.now()}.shp`)]

var parameters =[...destFile,...port,...pass,...user,...host,...database_query]

var pgsql2shp = path.join(process.cwd(), 'lib', 'pgsql2shp.exe')

console.log(chalk.magenta('Output file: ' + destFile))
console.log(chalk.magenta('Query: ' +  query),'\n')

const ls = cmd(pgsql2shp, parameters, { shell: true });

ls.stdout.on('data', (data) => {
     console.log(chalk.green(`${data}`));
});

ls.stderr.on('data', (data) => {
     console.error(chalk.red(`${data}`));
});

ls.on('close', (code) => {
     console.log(chalk.gray(`close ${code}`));
}); 





