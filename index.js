const wifi = require('node-wifi');
const prompt = require('prompt');

wifi.init();

wifi.scan((err, networks) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Redes Wi-Fi disponíveis próximas ao dispositivo:');
  console.log(networks);
  const openNetworks = networks.filter(n => n.security === 'none');
  console.log('Redes Wi-Fi abertas disponíveis próximas ao dispositivo:');
  console.log(openNetworks);

  prompt.start();
  prompt.get(['ssid'], (err, result) => {
    if (err) {
      console.error(err);
      return;
    }

    const ssid = result.ssid;

    const network = networks.find(n => n.ssid === ssid);

    if (!network) {
      console.error(`Rede Wi-Fi "${ssid}" não encontrada`);
      return;
    }
   


    console.log(`Informações sobre a rede Wi-Fi "${ssid}":`);
    console.log(`SSID: ${network.ssid}`);
    console.log(`BSSID: ${network.bssid}`);
    console.log(`Signal Level: ${network.signal_level}`);
    console.log(`Security: ${network.security}`);
  });
});
