export const getJson = async(url: string, data?: JSON): Promise<JSON> => {
  return new Promise((resolve, reject) => {
      let r = new XMLHttpRequest();
      r.timeout = 10000;
      r.onload = function(e) {
          let j = JSON.parse(r.responseText)
          if (j["success"] == true) {
              resolve(j["data"]);
          }else{
              reject(j["cause"]);
          }
      }
      r.ontimeout = function(e) {
          reject("Timeout");
      }

      r.open("GET", url);
      r.send(JSON.stringify(data));
  });
}