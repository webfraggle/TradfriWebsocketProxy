'use strict';

import { Accessory } from 'node-tradfri-client';
import { IGenericDevice, GenericDevice } from './GenericDevice'

interface ILight extends IGenericDevice {
    onOff: Boolean;
    brightness:Number;
    
}

export class Light extends GenericDevice implements ILight {
	constructor(payload: Accessory) {
        super(payload);
	}

	get onOff(): Boolean {
		return this.accessory.lightList[0].onOff;
    }
    get brightness(): Number {
		return this.accessory.lightList[0].dimmer
	}
}