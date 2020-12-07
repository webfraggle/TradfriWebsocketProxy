import { discoverGateway, TradfriClient, Accessory, AccessoryTypes } from "node-tradfri-client";

import { Light } from './models/Light';

import data from './config.json';

console.log(data.config);

if (data.config.gateway != null && data.config.gateway != "" )
{
    var tradfri = new TradfriClient(data.config.gateway);
    console.log(tradfri);

}


async function authenticate()
{
    // Please use this to get your credential, copy the credentials to confg.json
    const result = await discoverGateway();
    console.log(result);
    const tradfri = new TradfriClient(result.name);
    const securityCode = data.config.securityCode;
    const {identity, psk} = await tradfri.authenticate(securityCode);
    console.log("Identity: ",identity,"PSK:",psk);
    return(result);
}

// Do only authentication if no credentials are in the config

// authenticate().then((result) => {
//     // work with the result
//     console.log('yo', result);
// })
// .catch((e) => {
    //     // handle error
    // console.log(e); 
// });

async function start()
{
    console.log("trying to connect")
    await tradfri.connect(data.config.identity, data.config.psk);
    // console.log(tradfri);
    tradfri
    .on("device updated", tradfri_deviceUpdated)
    .on("device removed", tradfri_deviceRemoved)
    .observeDevices()
;
}

const lightbulbs:Light[] = [];
function tradfri_deviceUpdated(device: Accessory) {
    console.log(device.instanceId, device.name);
    if (device.type === AccessoryTypes.lightbulb) {
        // remember it
        lightbulbs[device.instanceId] = new Light(device);
        console.log(lightbulbs[device.instanceId].brightness, lightbulbs[device.instanceId].onOff);
    }

    if (device.name == "Rollo 1")
    {
        console.log(device);
    }

}

function tradfri_deviceRemoved(instanceId: number) {
    // clean up
}

start().then((result) => {
    // work with the result
    console.log('yo', result);
})
.catch((e) => {
    // handle error
    console.log(e);
});

