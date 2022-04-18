module.exports = {
    apps: [
        {
            name:'youtube-mp3-extraction-site',
            script : './src/index.js',
            instance_var: 'INSTANCE_ID',
            instances:2,
            exec_mode : 'cluster',
            wait_ready : true,
            listen_timeout:50000,
            error_file : "./pm2Logs/errLogs/err.log",
            out_file : "./pm2Logs/outLogs/out.log",
        }
    ]
}