// error logger
process.on("uncaughtExceptionMonitor", (err, origin) => {
  console.log("Error Occurs: ", err);
});
