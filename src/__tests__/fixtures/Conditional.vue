<template>
	<section>
		<p role="age" v-text="model.age"></p>
		<button role="increase" @click="model.increase"></button>
		<button role="toggle" @click="model.toggle"></button>
		<div v-if="model.show">
			<p role="count" v-text="model.count"></p>
		</div>
		<button role="native-toggle" @click="nativeToggle"></button>
		<button role="native-increase" @click="model.nativeIncrease"></button>
		<div v-if="show">
			<p role="native-count" v-text="model.nativeCount"></p>
		</div>
	</section>
</template>

<script lang="ts">

	import { action, observable } from "mobx";
	import Vue from "vue";
	import Component from "vue-class-component";
	import { Observer } from "../../observer";

	class Model {
		@observable
		age = 10;

		@observable
		show = false;

		@observable
		count = 0;

		@observable
		nativeCount = 0;

		@action.bound
		setAge() {
			this.age++;
		}

		@action.bound
		toggle() {
			this.show = !this.show;
		}

		@action.bound
		increase() {
			this.count++;
		}

		@action.bound
		nativeIncrease() {
			this.nativeCount++;
		}

	}

	@Observer
	@Component
	export default class Conditional extends Vue {
		model = new Model();

		show = false;

		nativeToggle() {
			this.show = !this.show;
		}
	}
</script>
