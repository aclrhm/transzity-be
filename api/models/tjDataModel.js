const { admin } = require("../config/firebase");

const db = admin.database();

const listenTjData = (callback) => {
  const ref = db.ref("tj_data");

  // realtime
  const listener = ref.on("value", (snapshot) => {
    const data = snapshot.val() || {};
    callback(data);
  });

  

  // stop listening
  return () => ref.off("value", listener);
};

module.exports = { listenTjData };