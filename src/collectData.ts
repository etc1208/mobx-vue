/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2018-06-08 10:16
 */

import { isObservable } from 'mobx';
import Vue from 'vue';
import { DefaultData } from 'vue/types/options';

export default function collectData(vm: Vue, data?: DefaultData<Vue>) {

	const dataDefinition = typeof data === 'function' ? data.call(vm, vm) : (data || {});
	const filteredData = Object.keys(dataDefinition).reduce((result: any, field) => {

		const value = dataDefinition[field];
		if (isObservable(value)) {
			Object.defineProperty(vm, field, {
				configurable: true,
				get() {
					return value;
				},
				// @formatter:off
				// tslint:disable-next-line
				set() {}
				// @formatter:on
			});
		} else {
			result[field] = value;
		}

		return result;

	}, {});

	return filteredData;
}
