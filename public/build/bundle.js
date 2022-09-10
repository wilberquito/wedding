
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.50.0' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/components/CountDown.svelte generated by Svelte v3.50.0 */

    const file$2 = "src/components/CountDown.svelte";

    function create_fragment$3(ctx) {
    	let div4;
    	let div0;
    	let span0;
    	let t0_value = zeroPad(/*remainingDays*/ ctx[0]) + "";
    	let t0;
    	let t1;
    	let span1;
    	let t3;
    	let div1;
    	let span2;
    	let t4_value = zeroPad(/*remainingHours*/ ctx[1]) + "";
    	let t4;
    	let t5;
    	let span3;
    	let t7;
    	let div2;
    	let span4;
    	let t8_value = zeroPad(/*remainingMinuts*/ ctx[2]) + "";
    	let t8;
    	let t9;
    	let span5;
    	let t11;
    	let div3;
    	let span6;
    	let t12_value = zeroPad(/*remainingSeconds*/ ctx[3]) + "";
    	let t12;
    	let t13;
    	let span7;

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div0 = element("div");
    			span0 = element("span");
    			t0 = text(t0_value);
    			t1 = space();
    			span1 = element("span");
    			span1.textContent = "días";
    			t3 = space();
    			div1 = element("div");
    			span2 = element("span");
    			t4 = text(t4_value);
    			t5 = space();
    			span3 = element("span");
    			span3.textContent = "horas";
    			t7 = space();
    			div2 = element("div");
    			span4 = element("span");
    			t8 = text(t8_value);
    			t9 = space();
    			span5 = element("span");
    			span5.textContent = "minutos";
    			t11 = space();
    			div3 = element("div");
    			span6 = element("span");
    			t12 = text(t12_value);
    			t13 = space();
    			span7 = element("span");
    			span7.textContent = "segundos";
    			attr_dev(span0, "class", "countdown svelte-pl02em");
    			add_location(span0, file$2, 47, 8, 1418);
    			attr_dev(span1, "class", "label svelte-pl02em");
    			add_location(span1, file$2, 50, 8, 1504);
    			attr_dev(div0, "class", "countdown__item svelte-pl02em");
    			add_location(div0, file$2, 46, 4, 1380);
    			attr_dev(span2, "class", "countdown svelte-pl02em");
    			add_location(span2, file$2, 53, 8, 1589);
    			attr_dev(span3, "class", "label svelte-pl02em");
    			add_location(span3, file$2, 56, 8, 1676);
    			attr_dev(div1, "class", "countdown__item svelte-pl02em");
    			add_location(div1, file$2, 52, 4, 1551);
    			attr_dev(span4, "class", "countdown svelte-pl02em");
    			add_location(span4, file$2, 59, 8, 1762);
    			attr_dev(span5, "class", "label svelte-pl02em");
    			add_location(span5, file$2, 62, 8, 1850);
    			attr_dev(div2, "class", "countdown__item svelte-pl02em");
    			add_location(div2, file$2, 58, 4, 1724);
    			attr_dev(span6, "class", "countdown svelte-pl02em");
    			add_location(span6, file$2, 65, 8, 1938);
    			attr_dev(span7, "class", "label svelte-pl02em");
    			add_location(span7, file$2, 68, 8, 2027);
    			attr_dev(div3, "class", "countdown__item svelte-pl02em");
    			add_location(div3, file$2, 64, 4, 1900);
    			attr_dev(div4, "class", "countdown__container svelte-pl02em");
    			add_location(div4, file$2, 45, 0, 1341);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div0);
    			append_dev(div0, span0);
    			append_dev(span0, t0);
    			append_dev(div0, t1);
    			append_dev(div0, span1);
    			append_dev(div4, t3);
    			append_dev(div4, div1);
    			append_dev(div1, span2);
    			append_dev(span2, t4);
    			append_dev(div1, t5);
    			append_dev(div1, span3);
    			append_dev(div4, t7);
    			append_dev(div4, div2);
    			append_dev(div2, span4);
    			append_dev(span4, t8);
    			append_dev(div2, t9);
    			append_dev(div2, span5);
    			append_dev(div4, t11);
    			append_dev(div4, div3);
    			append_dev(div3, span6);
    			append_dev(span6, t12);
    			append_dev(div3, t13);
    			append_dev(div3, span7);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*remainingDays*/ 1 && t0_value !== (t0_value = zeroPad(/*remainingDays*/ ctx[0]) + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*remainingHours*/ 2 && t4_value !== (t4_value = zeroPad(/*remainingHours*/ ctx[1]) + "")) set_data_dev(t4, t4_value);
    			if (dirty & /*remainingMinuts*/ 4 && t8_value !== (t8_value = zeroPad(/*remainingMinuts*/ ctx[2]) + "")) set_data_dev(t8, t8_value);
    			if (dirty & /*remainingSeconds*/ 8 && t12_value !== (t12_value = zeroPad(/*remainingSeconds*/ ctx[3]) + "")) set_data_dev(t12, t12_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function zeroPad(num, pads = 2) {
    	return String(num).padStart(pads, "0");
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CountDown', slots, []);
    	const weddingDate = new Date("2022-09-20 17:15:30");
    	let remainingDays;
    	let remainingHours;
    	let remainingMinuts;
    	let remainingSeconds;
    	updateRemainings();
    	setInterval(updateRemainings, 1000);

    	function computeRemainings() {
    		const countDownDate = weddingDate.getTime();
    		const now = new Date().getTime();
    		const distance = Math.abs(countDownDate - now);
    		const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    		const hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    		const minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
    		const seconds = Math.floor(distance % (1000 * 60) / 1000);
    		return { days, hours, minutes, seconds };
    	}

    	function updateRemainings() {
    		let { days, hours, minutes, seconds } = computeRemainings();
    		$$invalidate(0, remainingDays = days);
    		$$invalidate(1, remainingHours = hours);
    		$$invalidate(2, remainingMinuts = minutes);
    		$$invalidate(3, remainingSeconds = seconds);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CountDown> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		weddingDate,
    		remainingDays,
    		remainingHours,
    		remainingMinuts,
    		remainingSeconds,
    		computeRemainings,
    		updateRemainings,
    		zeroPad
    	});

    	$$self.$inject_state = $$props => {
    		if ('remainingDays' in $$props) $$invalidate(0, remainingDays = $$props.remainingDays);
    		if ('remainingHours' in $$props) $$invalidate(1, remainingHours = $$props.remainingHours);
    		if ('remainingMinuts' in $$props) $$invalidate(2, remainingMinuts = $$props.remainingMinuts);
    		if ('remainingSeconds' in $$props) $$invalidate(3, remainingSeconds = $$props.remainingSeconds);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [remainingDays, remainingHours, remainingMinuts, remainingSeconds, weddingDate];
    }

    class CountDown extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { weddingDate: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CountDown",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get weddingDate() {
    		return this.$$.ctx[4];
    	}

    	set weddingDate(value) {
    		throw new Error("<CountDown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const openNewWindow = (url) => window.open(url, '_blank');

    /* src/components/Location.svelte generated by Svelte v3.50.0 */
    const file$1 = "src/components/Location.svelte";

    function create_fragment$2(ctx) {
    	let div1;
    	let div0;
    	let t0;
    	let p;
    	let t2;
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t0 = space();
    			p = element("p");
    			p.textContent = `${/*plaintText*/ ctx[0]}`;
    			t2 = space();
    			button = element("button");
    			button.textContent = "VER MAPA";
    			attr_dev(div0, "class", "box svelte-1o95mjs");
    			add_location(div0, file$1, 17, 4, 538);
    			add_location(p, file$1, 18, 4, 562);
    			attr_dev(button, "class", "g__button");
    			add_location(button, file$1, 19, 4, 586);
    			attr_dev(div1, "class", "g__section");
    			add_location(div1, file$1, 16, 0, 509);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div1, t0);
    			append_dev(div1, p);
    			append_dev(div1, t2);
    			append_dev(div1, button);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*openGoogleMapsReference*/ ctx[1], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Location', slots, []);
    	const weddingLocationUrl = "https://goo.gl/maps/fwkFsFwauuNjLwq18";
    	const title = "Fiesta";

    	const plaintText = `La fiesta sera el sabado 09 de julio de 2022.
        Os esperamos a las 19:30 hs en Masia
        Durba, hotel hubicado en Carretera Geldo
        Castelnovo KM1 123, Casterllnovo, Castellon`;

    	function openGoogleMapsReference() {
    		openNewWindow(weddingLocationUrl);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Location> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		openNewWindow,
    		weddingLocationUrl,
    		title,
    		plaintText,
    		openGoogleMapsReference
    	});

    	return [plaintText, openGoogleMapsReference, weddingLocationUrl, title];
    }

    class Location extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
    			weddingLocationUrl: 2,
    			title: 3,
    			plaintText: 0
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Location",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get weddingLocationUrl() {
    		return this.$$.ctx[2];
    	}

    	set weddingLocationUrl(value) {
    		throw new Error("<Location>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		return this.$$.ctx[3];
    	}

    	set title(value) {
    		throw new Error("<Location>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get plaintText() {
    		return this.$$.ctx[0];
    	}

    	set plaintText(value) {
    		throw new Error("<Location>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Confirmation.svelte generated by Svelte v3.50.0 */
    const file = "src/components/Confirmation.svelte";

    function create_fragment$1(ctx) {
    	let div;
    	let h1;
    	let t1;
    	let p;
    	let t3;
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h1 = element("h1");
    			h1.textContent = `${/*title*/ ctx[0]}`;
    			t1 = space();
    			p = element("p");
    			p.textContent = `${/*warnConfirmation*/ ctx[1]}`;
    			t3 = space();
    			button = element("button");
    			button.textContent = "CONFIRMAR";
    			add_location(h1, file, 12, 4, 402);
    			add_location(p, file, 13, 4, 423);
    			attr_dev(button, "class", "g__button g__custom");
    			add_location(button, file, 14, 4, 453);
    			attr_dev(div, "class", "g__section g__custom");
    			add_location(div, file, 11, 0, 363);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    			append_dev(div, t1);
    			append_dev(div, p);
    			append_dev(div, t3);
    			append_dev(div, button);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*openConfirmationGoogleForms*/ ctx[2], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Confirmation', slots, []);
    	const title = "Confirmar Asistencia";
    	const warnConfirmation = "Confirma antes del 31 de mayo";
    	const confirmationUrl = "https://forms.gle/yw9XCV5awPuWxrVN8";

    	function openConfirmationGoogleForms() {
    		openNewWindow(confirmationUrl);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Confirmation> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		openNewWindow,
    		title,
    		warnConfirmation,
    		confirmationUrl,
    		openConfirmationGoogleForms
    	});

    	return [title, warnConfirmation, openConfirmationGoogleForms, confirmationUrl];
    }

    class Confirmation extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {
    			title: 0,
    			warnConfirmation: 1,
    			confirmationUrl: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Confirmation",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get title() {
    		return this.$$.ctx[0];
    	}

    	set title(value) {
    		throw new Error("<Confirmation>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get warnConfirmation() {
    		return this.$$.ctx[1];
    	}

    	set warnConfirmation(value) {
    		throw new Error("<Confirmation>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get confirmationUrl() {
    		return this.$$.ctx[3];
    	}

    	set confirmationUrl(value) {
    		throw new Error("<Confirmation>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/App.svelte generated by Svelte v3.50.0 */

    function create_fragment(ctx) {
    	let countdown;
    	let t0;
    	let location;
    	let t1;
    	let confirmation;
    	let current;
    	countdown = new CountDown({ $$inline: true });
    	location = new Location({ $$inline: true });
    	confirmation = new Confirmation({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(countdown.$$.fragment);
    			t0 = space();
    			create_component(location.$$.fragment);
    			t1 = space();
    			create_component(confirmation.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(countdown, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(location, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(confirmation, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(countdown.$$.fragment, local);
    			transition_in(location.$$.fragment, local);
    			transition_in(confirmation.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(countdown.$$.fragment, local);
    			transition_out(location.$$.fragment, local);
    			transition_out(confirmation.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(countdown, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(location, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(confirmation, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ CountDown, Location, Confirmation });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
