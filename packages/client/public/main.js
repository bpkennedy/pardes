(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // node_modules/@vue/shared/dist/shared.esm-bundler.js
  function makeMap(str, expectsLowerCase) {
    const map2 = /* @__PURE__ */ Object.create(null);
    const list = str.split(",");
    for (let i = 0; i < list.length; i++) {
      map2[list[i]] = true;
    }
    return expectsLowerCase ? (val) => !!map2[val.toLowerCase()] : (val) => !!map2[val];
  }
  var specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
  var isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
  var isBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`);
  function includeBooleanAttr(value) {
    return !!value || value === "";
  }
  function normalizeStyle(value) {
    if (isArray(value)) {
      const res = {};
      for (let i = 0; i < value.length; i++) {
        const item = value[i];
        const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
        if (normalized) {
          for (const key in normalized) {
            res[key] = normalized[key];
          }
        }
      }
      return res;
    } else if (isString(value)) {
      return value;
    } else if (isObject(value)) {
      return value;
    }
  }
  var listDelimiterRE = /;(?![^(]*\))/g;
  var propertyDelimiterRE = /:(.+)/;
  function parseStringStyle(cssText) {
    const ret = {};
    cssText.split(listDelimiterRE).forEach((item) => {
      if (item) {
        const tmp = item.split(propertyDelimiterRE);
        tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
      }
    });
    return ret;
  }
  function normalizeClass(value) {
    let res = "";
    if (isString(value)) {
      res = value;
    } else if (isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        const normalized = normalizeClass(value[i]);
        if (normalized) {
          res += normalized + " ";
        }
      }
    } else if (isObject(value)) {
      for (const name in value) {
        if (value[name]) {
          res += name + " ";
        }
      }
    }
    return res.trim();
  }
  var HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
  var SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
  var isHTMLTag = /* @__PURE__ */ makeMap(HTML_TAGS);
  var isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
  function looseCompareArrays(a, b) {
    if (a.length !== b.length)
      return false;
    let equal = true;
    for (let i = 0; equal && i < a.length; i++) {
      equal = looseEqual(a[i], b[i]);
    }
    return equal;
  }
  function looseEqual(a, b) {
    if (a === b)
      return true;
    let aValidType = isDate(a);
    let bValidType = isDate(b);
    if (aValidType || bValidType) {
      return aValidType && bValidType ? a.getTime() === b.getTime() : false;
    }
    aValidType = isSymbol(a);
    bValidType = isSymbol(b);
    if (aValidType || bValidType) {
      return a === b;
    }
    aValidType = isArray(a);
    bValidType = isArray(b);
    if (aValidType || bValidType) {
      return aValidType && bValidType ? looseCompareArrays(a, b) : false;
    }
    aValidType = isObject(a);
    bValidType = isObject(b);
    if (aValidType || bValidType) {
      if (!aValidType || !bValidType) {
        return false;
      }
      const aKeysCount = Object.keys(a).length;
      const bKeysCount = Object.keys(b).length;
      if (aKeysCount !== bKeysCount) {
        return false;
      }
      for (const key in a) {
        const aHasKey = a.hasOwnProperty(key);
        const bHasKey = b.hasOwnProperty(key);
        if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
          return false;
        }
      }
    }
    return String(a) === String(b);
  }
  function looseIndexOf(arr, val) {
    return arr.findIndex((item) => looseEqual(item, val));
  }
  var toDisplayString = (val) => {
    return isString(val) ? val : val == null ? "" : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
  };
  var replacer = (_key, val) => {
    if (val && val.__v_isRef) {
      return replacer(_key, val.value);
    } else if (isMap(val)) {
      return {
        [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
          entries[`${key} =>`] = val2;
          return entries;
        }, {})
      };
    } else if (isSet(val)) {
      return {
        [`Set(${val.size})`]: [...val.values()]
      };
    } else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
      return String(val);
    }
    return val;
  };
  var EMPTY_OBJ = true ? Object.freeze({}) : {};
  var EMPTY_ARR = true ? Object.freeze([]) : [];
  var NOOP = () => {
  };
  var NO = () => false;
  var onRE = /^on[^a-z]/;
  var isOn = (key) => onRE.test(key);
  var isModelListener = (key) => key.startsWith("onUpdate:");
  var extend = Object.assign;
  var remove = (arr, el) => {
    const i = arr.indexOf(el);
    if (i > -1) {
      arr.splice(i, 1);
    }
  };
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var hasOwn = (val, key) => hasOwnProperty.call(val, key);
  var isArray = Array.isArray;
  var isMap = (val) => toTypeString(val) === "[object Map]";
  var isSet = (val) => toTypeString(val) === "[object Set]";
  var isDate = (val) => toTypeString(val) === "[object Date]";
  var isFunction = (val) => typeof val === "function";
  var isString = (val) => typeof val === "string";
  var isSymbol = (val) => typeof val === "symbol";
  var isObject = (val) => val !== null && typeof val === "object";
  var isPromise = (val) => {
    return isObject(val) && isFunction(val.then) && isFunction(val.catch);
  };
  var objectToString = Object.prototype.toString;
  var toTypeString = (value) => objectToString.call(value);
  var toRawType = (value) => {
    return toTypeString(value).slice(8, -1);
  };
  var isPlainObject = (val) => toTypeString(val) === "[object Object]";
  var isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
  var isReservedProp = /* @__PURE__ */ makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
  var isBuiltInDirective = /* @__PURE__ */ makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
  var cacheStringFunction = (fn) => {
    const cache = /* @__PURE__ */ Object.create(null);
    return (str) => {
      const hit = cache[str];
      return hit || (cache[str] = fn(str));
    };
  };
  var camelizeRE = /-(\w)/g;
  var camelize = cacheStringFunction((str) => {
    return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
  });
  var hyphenateRE = /\B([A-Z])/g;
  var hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
  var capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
  var toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
  var hasChanged = (value, oldValue) => !Object.is(value, oldValue);
  var invokeArrayFns = (fns, arg) => {
    for (let i = 0; i < fns.length; i++) {
      fns[i](arg);
    }
  };
  var def = (obj, key, value) => {
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: false,
      value
    });
  };
  var toNumber = (val) => {
    const n = parseFloat(val);
    return isNaN(n) ? val : n;
  };
  var _globalThis;
  var getGlobalThis = () => {
    return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
  };

  // node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
  function warn(msg, ...args) {
    console.warn(`[Vue warn] ${msg}`, ...args);
  }
  var activeEffectScope;
  var EffectScope = class {
    constructor(detached = false) {
      this.active = true;
      this.effects = [];
      this.cleanups = [];
      if (!detached && activeEffectScope) {
        this.parent = activeEffectScope;
        this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
      }
    }
    run(fn) {
      if (this.active) {
        const currentEffectScope = activeEffectScope;
        try {
          activeEffectScope = this;
          return fn();
        } finally {
          activeEffectScope = currentEffectScope;
        }
      } else if (true) {
        warn(`cannot run an inactive effect scope.`);
      }
    }
    on() {
      activeEffectScope = this;
    }
    off() {
      activeEffectScope = this.parent;
    }
    stop(fromParent) {
      if (this.active) {
        let i, l;
        for (i = 0, l = this.effects.length; i < l; i++) {
          this.effects[i].stop();
        }
        for (i = 0, l = this.cleanups.length; i < l; i++) {
          this.cleanups[i]();
        }
        if (this.scopes) {
          for (i = 0, l = this.scopes.length; i < l; i++) {
            this.scopes[i].stop(true);
          }
        }
        if (this.parent && !fromParent) {
          const last = this.parent.scopes.pop();
          if (last && last !== this) {
            this.parent.scopes[this.index] = last;
            last.index = this.index;
          }
        }
        this.active = false;
      }
    }
  };
  function effectScope(detached) {
    return new EffectScope(detached);
  }
  function recordEffectScope(effect2, scope = activeEffectScope) {
    if (scope && scope.active) {
      scope.effects.push(effect2);
    }
  }
  function onScopeDispose(fn) {
    if (activeEffectScope) {
      activeEffectScope.cleanups.push(fn);
    } else if (true) {
      warn(`onScopeDispose() is called when there is no active effect scope to be associated with.`);
    }
  }
  var createDep = (effects) => {
    const dep = new Set(effects);
    dep.w = 0;
    dep.n = 0;
    return dep;
  };
  var wasTracked = (dep) => (dep.w & trackOpBit) > 0;
  var newTracked = (dep) => (dep.n & trackOpBit) > 0;
  var initDepMarkers = ({ deps }) => {
    if (deps.length) {
      for (let i = 0; i < deps.length; i++) {
        deps[i].w |= trackOpBit;
      }
    }
  };
  var finalizeDepMarkers = (effect2) => {
    const { deps } = effect2;
    if (deps.length) {
      let ptr = 0;
      for (let i = 0; i < deps.length; i++) {
        const dep = deps[i];
        if (wasTracked(dep) && !newTracked(dep)) {
          dep.delete(effect2);
        } else {
          deps[ptr++] = dep;
        }
        dep.w &= ~trackOpBit;
        dep.n &= ~trackOpBit;
      }
      deps.length = ptr;
    }
  };
  var targetMap = /* @__PURE__ */ new WeakMap();
  var effectTrackDepth = 0;
  var trackOpBit = 1;
  var maxMarkerBits = 30;
  var activeEffect;
  var ITERATE_KEY = Symbol(true ? "iterate" : "");
  var MAP_KEY_ITERATE_KEY = Symbol(true ? "Map key iterate" : "");
  var ReactiveEffect = class {
    constructor(fn, scheduler = null, scope) {
      this.fn = fn;
      this.scheduler = scheduler;
      this.active = true;
      this.deps = [];
      this.parent = void 0;
      recordEffectScope(this, scope);
    }
    run() {
      if (!this.active) {
        return this.fn();
      }
      let parent = activeEffect;
      let lastShouldTrack = shouldTrack;
      while (parent) {
        if (parent === this) {
          return;
        }
        parent = parent.parent;
      }
      try {
        this.parent = activeEffect;
        activeEffect = this;
        shouldTrack = true;
        trackOpBit = 1 << ++effectTrackDepth;
        if (effectTrackDepth <= maxMarkerBits) {
          initDepMarkers(this);
        } else {
          cleanupEffect(this);
        }
        return this.fn();
      } finally {
        if (effectTrackDepth <= maxMarkerBits) {
          finalizeDepMarkers(this);
        }
        trackOpBit = 1 << --effectTrackDepth;
        activeEffect = this.parent;
        shouldTrack = lastShouldTrack;
        this.parent = void 0;
        if (this.deferStop) {
          this.stop();
        }
      }
    }
    stop() {
      if (activeEffect === this) {
        this.deferStop = true;
      } else if (this.active) {
        cleanupEffect(this);
        if (this.onStop) {
          this.onStop();
        }
        this.active = false;
      }
    }
  };
  function cleanupEffect(effect2) {
    const { deps } = effect2;
    if (deps.length) {
      for (let i = 0; i < deps.length; i++) {
        deps[i].delete(effect2);
      }
      deps.length = 0;
    }
  }
  var shouldTrack = true;
  var trackStack = [];
  function pauseTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = false;
  }
  function resetTracking() {
    const last = trackStack.pop();
    shouldTrack = last === void 0 ? true : last;
  }
  function track(target, type, key) {
    if (shouldTrack && activeEffect) {
      let depsMap = targetMap.get(target);
      if (!depsMap) {
        targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
      }
      let dep = depsMap.get(key);
      if (!dep) {
        depsMap.set(key, dep = createDep());
      }
      const eventInfo = true ? { effect: activeEffect, target, type, key } : void 0;
      trackEffects(dep, eventInfo);
    }
  }
  function trackEffects(dep, debuggerEventExtraInfo) {
    let shouldTrack2 = false;
    if (effectTrackDepth <= maxMarkerBits) {
      if (!newTracked(dep)) {
        dep.n |= trackOpBit;
        shouldTrack2 = !wasTracked(dep);
      }
    } else {
      shouldTrack2 = !dep.has(activeEffect);
    }
    if (shouldTrack2) {
      dep.add(activeEffect);
      activeEffect.deps.push(dep);
      if (activeEffect.onTrack) {
        activeEffect.onTrack(Object.assign({ effect: activeEffect }, debuggerEventExtraInfo));
      }
    }
  }
  function trigger(target, type, key, newValue, oldValue, oldTarget) {
    const depsMap = targetMap.get(target);
    if (!depsMap) {
      return;
    }
    let deps = [];
    if (type === "clear") {
      deps = [...depsMap.values()];
    } else if (key === "length" && isArray(target)) {
      depsMap.forEach((dep, key2) => {
        if (key2 === "length" || key2 >= newValue) {
          deps.push(dep);
        }
      });
    } else {
      if (key !== void 0) {
        deps.push(depsMap.get(key));
      }
      switch (type) {
        case "add":
          if (!isArray(target)) {
            deps.push(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isIntegerKey(key)) {
            deps.push(depsMap.get("length"));
          }
          break;
        case "delete":
          if (!isArray(target)) {
            deps.push(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set":
          if (isMap(target)) {
            deps.push(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
    const eventInfo = true ? { target, type, key, newValue, oldValue, oldTarget } : void 0;
    if (deps.length === 1) {
      if (deps[0]) {
        if (true) {
          triggerEffects(deps[0], eventInfo);
        } else {
          triggerEffects(deps[0]);
        }
      }
    } else {
      const effects = [];
      for (const dep of deps) {
        if (dep) {
          effects.push(...dep);
        }
      }
      if (true) {
        triggerEffects(createDep(effects), eventInfo);
      } else {
        triggerEffects(createDep(effects));
      }
    }
  }
  function triggerEffects(dep, debuggerEventExtraInfo) {
    const effects = isArray(dep) ? dep : [...dep];
    for (const effect2 of effects) {
      if (effect2.computed) {
        triggerEffect(effect2, debuggerEventExtraInfo);
      }
    }
    for (const effect2 of effects) {
      if (!effect2.computed) {
        triggerEffect(effect2, debuggerEventExtraInfo);
      }
    }
  }
  function triggerEffect(effect2, debuggerEventExtraInfo) {
    if (effect2 !== activeEffect || effect2.allowRecurse) {
      if (effect2.onTrigger) {
        effect2.onTrigger(extend({ effect: effect2 }, debuggerEventExtraInfo));
      }
      if (effect2.scheduler) {
        effect2.scheduler();
      } else {
        effect2.run();
      }
    }
  }
  var isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
  var builtInSymbols = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol));
  var get = /* @__PURE__ */ createGetter();
  var shallowGet = /* @__PURE__ */ createGetter(false, true);
  var readonlyGet = /* @__PURE__ */ createGetter(true);
  var shallowReadonlyGet = /* @__PURE__ */ createGetter(true, true);
  var arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
  function createArrayInstrumentations() {
    const instrumentations = {};
    ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
      instrumentations[key] = function(...args) {
        const arr = toRaw(this);
        for (let i = 0, l = this.length; i < l; i++) {
          track(arr, "get", i + "");
        }
        const res = arr[key](...args);
        if (res === -1 || res === false) {
          return arr[key](...args.map(toRaw));
        } else {
          return res;
        }
      };
    });
    ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
      instrumentations[key] = function(...args) {
        pauseTracking();
        const res = toRaw(this)[key].apply(this, args);
        resetTracking();
        return res;
      };
    });
    return instrumentations;
  }
  function createGetter(isReadonly2 = false, shallow = false) {
    return function get2(target, key, receiver) {
      if (key === "__v_isReactive") {
        return !isReadonly2;
      } else if (key === "__v_isReadonly") {
        return isReadonly2;
      } else if (key === "__v_isShallow") {
        return shallow;
      } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
        return target;
      }
      const targetIsArray = isArray(target);
      if (!isReadonly2 && targetIsArray && hasOwn(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      const res = Reflect.get(target, key, receiver);
      if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
        return res;
      }
      if (!isReadonly2) {
        track(target, "get", key);
      }
      if (shallow) {
        return res;
      }
      if (isRef(res)) {
        return targetIsArray && isIntegerKey(key) ? res : res.value;
      }
      if (isObject(res)) {
        return isReadonly2 ? readonly(res) : reactive(res);
      }
      return res;
    };
  }
  var set = /* @__PURE__ */ createSetter();
  var shallowSet = /* @__PURE__ */ createSetter(true);
  function createSetter(shallow = false) {
    return function set2(target, key, value, receiver) {
      let oldValue = target[key];
      if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
        return false;
      }
      if (!shallow && !isReadonly(value)) {
        if (!isShallow(value)) {
          value = toRaw(value);
          oldValue = toRaw(oldValue);
        }
        if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
          oldValue.value = value;
          return true;
        }
      }
      const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
      const result = Reflect.set(target, key, value, receiver);
      if (target === toRaw(receiver)) {
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key, value, oldValue);
        }
      }
      return result;
    };
  }
  function deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  function has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  function ownKeys(target) {
    track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
    return Reflect.ownKeys(target);
  }
  var mutableHandlers = {
    get,
    set,
    deleteProperty,
    has,
    ownKeys
  };
  var readonlyHandlers = {
    get: readonlyGet,
    set(target, key) {
      if (true) {
        warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
      }
      return true;
    },
    deleteProperty(target, key) {
      if (true) {
        warn(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
      }
      return true;
    }
  };
  var shallowReactiveHandlers = /* @__PURE__ */ extend({}, mutableHandlers, {
    get: shallowGet,
    set: shallowSet
  });
  var shallowReadonlyHandlers = /* @__PURE__ */ extend({}, readonlyHandlers, {
    get: shallowReadonlyGet
  });
  var toShallow = (value) => value;
  var getProto = (v) => Reflect.getPrototypeOf(v);
  function get$1(target, key, isReadonly2 = false, isShallow3 = false) {
    target = target["__v_raw"];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (!isReadonly2) {
      if (key !== rawKey) {
        track(rawTarget, "get", key);
      }
      track(rawTarget, "get", rawKey);
    }
    const { has: has3 } = getProto(rawTarget);
    const wrap = isShallow3 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    if (has3.call(rawTarget, key)) {
      return wrap(target.get(key));
    } else if (has3.call(rawTarget, rawKey)) {
      return wrap(target.get(rawKey));
    } else if (target !== rawTarget) {
      target.get(key);
    }
  }
  function has$1(key, isReadonly2 = false) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (!isReadonly2) {
      if (key !== rawKey) {
        track(rawTarget, "has", key);
      }
      track(rawTarget, "has", rawKey);
    }
    return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
  }
  function size(target, isReadonly2 = false) {
    target = target["__v_raw"];
    !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
    return Reflect.get(target, "size", target);
  }
  function add(value) {
    value = toRaw(value);
    const target = toRaw(this);
    const proto = getProto(target);
    const hadKey = proto.has.call(target, value);
    if (!hadKey) {
      target.add(value);
      trigger(target, "add", value, value);
    }
    return this;
  }
  function set$1(key, value) {
    value = toRaw(value);
    const target = toRaw(this);
    const { has: has3, get: get2 } = getProto(target);
    let hadKey = has3.call(target, key);
    if (!hadKey) {
      key = toRaw(key);
      hadKey = has3.call(target, key);
    } else if (true) {
      checkIdentityKeys(target, has3, key);
    }
    const oldValue = get2.call(target, key);
    target.set(key, value);
    if (!hadKey) {
      trigger(target, "add", key, value);
    } else if (hasChanged(value, oldValue)) {
      trigger(target, "set", key, value, oldValue);
    }
    return this;
  }
  function deleteEntry(key) {
    const target = toRaw(this);
    const { has: has3, get: get2 } = getProto(target);
    let hadKey = has3.call(target, key);
    if (!hadKey) {
      key = toRaw(key);
      hadKey = has3.call(target, key);
    } else if (true) {
      checkIdentityKeys(target, has3, key);
    }
    const oldValue = get2 ? get2.call(target, key) : void 0;
    const result = target.delete(key);
    if (hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  function clear() {
    const target = toRaw(this);
    const hadItems = target.size !== 0;
    const oldTarget = true ? isMap(target) ? new Map(target) : new Set(target) : void 0;
    const result = target.clear();
    if (hadItems) {
      trigger(target, "clear", void 0, void 0, oldTarget);
    }
    return result;
  }
  function createForEach(isReadonly2, isShallow3) {
    return function forEach(callback, thisArg) {
      const observed = this;
      const target = observed["__v_raw"];
      const rawTarget = toRaw(target);
      const wrap = isShallow3 ? toShallow : isReadonly2 ? toReadonly : toReactive;
      !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
      return target.forEach((value, key) => {
        return callback.call(thisArg, wrap(value), wrap(key), observed);
      });
    };
  }
  function createIterableMethod(method, isReadonly2, isShallow3) {
    return function(...args) {
      const target = this["__v_raw"];
      const rawTarget = toRaw(target);
      const targetIsMap = isMap(rawTarget);
      const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
      const isKeyOnly = method === "keys" && targetIsMap;
      const innerIterator = target[method](...args);
      const wrap = isShallow3 ? toShallow : isReadonly2 ? toReadonly : toReactive;
      !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
      return {
        next() {
          const { value, done } = innerIterator.next();
          return done ? { value, done } : {
            value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
            done
          };
        },
        [Symbol.iterator]() {
          return this;
        }
      };
    };
  }
  function createReadonlyMethod(type) {
    return function(...args) {
      if (true) {
        const key = args[0] ? `on key "${args[0]}" ` : ``;
        console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
      }
      return type === "delete" ? false : this;
    };
  }
  function createInstrumentations() {
    const mutableInstrumentations2 = {
      get(key) {
        return get$1(this, key);
      },
      get size() {
        return size(this);
      },
      has: has$1,
      add,
      set: set$1,
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, false)
    };
    const shallowInstrumentations2 = {
      get(key) {
        return get$1(this, key, false, true);
      },
      get size() {
        return size(this);
      },
      has: has$1,
      add,
      set: set$1,
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, true)
    };
    const readonlyInstrumentations2 = {
      get(key) {
        return get$1(this, key, true);
      },
      get size() {
        return size(this, true);
      },
      has(key) {
        return has$1.call(this, key, true);
      },
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear"),
      forEach: createForEach(true, false)
    };
    const shallowReadonlyInstrumentations2 = {
      get(key) {
        return get$1(this, key, true, true);
      },
      get size() {
        return size(this, true);
      },
      has(key) {
        return has$1.call(this, key, true);
      },
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear"),
      forEach: createForEach(true, true)
    };
    const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
    iteratorMethods.forEach((method) => {
      mutableInstrumentations2[method] = createIterableMethod(method, false, false);
      readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
      shallowInstrumentations2[method] = createIterableMethod(method, false, true);
      shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
    });
    return [
      mutableInstrumentations2,
      readonlyInstrumentations2,
      shallowInstrumentations2,
      shallowReadonlyInstrumentations2
    ];
  }
  var [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
  function createInstrumentationGetter(isReadonly2, shallow) {
    const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
    return (target, key, receiver) => {
      if (key === "__v_isReactive") {
        return !isReadonly2;
      } else if (key === "__v_isReadonly") {
        return isReadonly2;
      } else if (key === "__v_raw") {
        return target;
      }
      return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
    };
  }
  var mutableCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, false)
  };
  var shallowCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, true)
  };
  var readonlyCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(true, false)
  };
  var shallowReadonlyCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(true, true)
  };
  function checkIdentityKeys(target, has3, key) {
    const rawKey = toRaw(key);
    if (rawKey !== key && has3.call(target, rawKey)) {
      const type = toRawType(target);
      console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
    }
  }
  var reactiveMap = /* @__PURE__ */ new WeakMap();
  var shallowReactiveMap = /* @__PURE__ */ new WeakMap();
  var readonlyMap = /* @__PURE__ */ new WeakMap();
  var shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
  function targetTypeMap(rawType) {
    switch (rawType) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }
  function getTargetType(value) {
    return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
  }
  function reactive(target) {
    if (isReadonly(target)) {
      return target;
    }
    return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
  }
  function shallowReactive(target) {
    return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
  }
  function readonly(target) {
    return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
  }
  function shallowReadonly(target) {
    return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
  }
  function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
    if (!isObject(target)) {
      if (true) {
        console.warn(`value cannot be made reactive: ${String(target)}`);
      }
      return target;
    }
    if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
      return target;
    }
    const existingProxy = proxyMap.get(target);
    if (existingProxy) {
      return existingProxy;
    }
    const targetType = getTargetType(target);
    if (targetType === 0) {
      return target;
    }
    const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
    proxyMap.set(target, proxy);
    return proxy;
  }
  function isReactive(value) {
    if (isReadonly(value)) {
      return isReactive(value["__v_raw"]);
    }
    return !!(value && value["__v_isReactive"]);
  }
  function isReadonly(value) {
    return !!(value && value["__v_isReadonly"]);
  }
  function isShallow(value) {
    return !!(value && value["__v_isShallow"]);
  }
  function isProxy(value) {
    return isReactive(value) || isReadonly(value);
  }
  function toRaw(observed) {
    const raw = observed && observed["__v_raw"];
    return raw ? toRaw(raw) : observed;
  }
  function markRaw(value) {
    def(value, "__v_skip", true);
    return value;
  }
  var toReactive = (value) => isObject(value) ? reactive(value) : value;
  var toReadonly = (value) => isObject(value) ? readonly(value) : value;
  function trackRefValue(ref2) {
    if (shouldTrack && activeEffect) {
      ref2 = toRaw(ref2);
      if (true) {
        trackEffects(ref2.dep || (ref2.dep = createDep()), {
          target: ref2,
          type: "get",
          key: "value"
        });
      } else {
        trackEffects(ref2.dep || (ref2.dep = createDep()));
      }
    }
  }
  function triggerRefValue(ref2, newVal) {
    ref2 = toRaw(ref2);
    if (ref2.dep) {
      if (true) {
        triggerEffects(ref2.dep, {
          target: ref2,
          type: "set",
          key: "value",
          newValue: newVal
        });
      } else {
        triggerEffects(ref2.dep);
      }
    }
  }
  function isRef(r) {
    return !!(r && r.__v_isRef === true);
  }
  function ref(value) {
    return createRef(value, false);
  }
  function shallowRef(value) {
    return createRef(value, true);
  }
  function createRef(rawValue, shallow) {
    if (isRef(rawValue)) {
      return rawValue;
    }
    return new RefImpl(rawValue, shallow);
  }
  var RefImpl = class {
    constructor(value, __v_isShallow) {
      this.__v_isShallow = __v_isShallow;
      this.dep = void 0;
      this.__v_isRef = true;
      this._rawValue = __v_isShallow ? value : toRaw(value);
      this._value = __v_isShallow ? value : toReactive(value);
    }
    get value() {
      trackRefValue(this);
      return this._value;
    }
    set value(newVal) {
      newVal = this.__v_isShallow ? newVal : toRaw(newVal);
      if (hasChanged(newVal, this._rawValue)) {
        this._rawValue = newVal;
        this._value = this.__v_isShallow ? newVal : toReactive(newVal);
        triggerRefValue(this, newVal);
      }
    }
  };
  function unref(ref2) {
    return isRef(ref2) ? ref2.value : ref2;
  }
  var shallowUnwrapHandlers = {
    get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
    set: (target, key, value, receiver) => {
      const oldValue = target[key];
      if (isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      } else {
        return Reflect.set(target, key, value, receiver);
      }
    }
  };
  function proxyRefs(objectWithRefs) {
    return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
  }
  function toRefs(object) {
    if (!isProxy(object)) {
      console.warn(`toRefs() expects a reactive object but received a plain one.`);
    }
    const ret = isArray(object) ? new Array(object.length) : {};
    for (const key in object) {
      ret[key] = toRef(object, key);
    }
    return ret;
  }
  var ObjectRefImpl = class {
    constructor(_object, _key, _defaultValue) {
      this._object = _object;
      this._key = _key;
      this._defaultValue = _defaultValue;
      this.__v_isRef = true;
    }
    get value() {
      const val = this._object[this._key];
      return val === void 0 ? this._defaultValue : val;
    }
    set value(newVal) {
      this._object[this._key] = newVal;
    }
  };
  function toRef(object, key, defaultValue) {
    const val = object[key];
    return isRef(val) ? val : new ObjectRefImpl(object, key, defaultValue);
  }
  var ComputedRefImpl = class {
    constructor(getter, _setter, isReadonly2, isSSR) {
      this._setter = _setter;
      this.dep = void 0;
      this.__v_isRef = true;
      this._dirty = true;
      this.effect = new ReactiveEffect(getter, () => {
        if (!this._dirty) {
          this._dirty = true;
          triggerRefValue(this);
        }
      });
      this.effect.computed = this;
      this.effect.active = this._cacheable = !isSSR;
      this["__v_isReadonly"] = isReadonly2;
    }
    get value() {
      const self2 = toRaw(this);
      trackRefValue(self2);
      if (self2._dirty || !self2._cacheable) {
        self2._dirty = false;
        self2._value = self2.effect.run();
      }
      return self2._value;
    }
    set value(newValue) {
      this._setter(newValue);
    }
  };
  function computed(getterOrOptions, debugOptions, isSSR = false) {
    let getter;
    let setter;
    const onlyGetter = isFunction(getterOrOptions);
    if (onlyGetter) {
      getter = getterOrOptions;
      setter = true ? () => {
        console.warn("Write operation failed: computed value is readonly");
      } : NOOP;
    } else {
      getter = getterOrOptions.get;
      setter = getterOrOptions.set;
    }
    const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
    if (debugOptions && !isSSR) {
      cRef.effect.onTrack = debugOptions.onTrack;
      cRef.effect.onTrigger = debugOptions.onTrigger;
    }
    return cRef;
  }
  var _a;
  _a = "__v_isReadonly";

  // node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
  var stack = [];
  function pushWarningContext(vnode) {
    stack.push(vnode);
  }
  function popWarningContext() {
    stack.pop();
  }
  function warn2(msg, ...args) {
    pauseTracking();
    const instance = stack.length ? stack[stack.length - 1].component : null;
    const appWarnHandler = instance && instance.appContext.config.warnHandler;
    const trace = getComponentTrace();
    if (appWarnHandler) {
      callWithErrorHandling(appWarnHandler, instance, 11, [
        msg + args.join(""),
        instance && instance.proxy,
        trace.map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`).join("\n"),
        trace
      ]);
    } else {
      const warnArgs = [`[Vue warn]: ${msg}`, ...args];
      if (trace.length && true) {
        warnArgs.push(`
`, ...formatTrace(trace));
      }
      console.warn(...warnArgs);
    }
    resetTracking();
  }
  function getComponentTrace() {
    let currentVNode = stack[stack.length - 1];
    if (!currentVNode) {
      return [];
    }
    const normalizedStack = [];
    while (currentVNode) {
      const last = normalizedStack[0];
      if (last && last.vnode === currentVNode) {
        last.recurseCount++;
      } else {
        normalizedStack.push({
          vnode: currentVNode,
          recurseCount: 0
        });
      }
      const parentInstance = currentVNode.component && currentVNode.component.parent;
      currentVNode = parentInstance && parentInstance.vnode;
    }
    return normalizedStack;
  }
  function formatTrace(trace) {
    const logs = [];
    trace.forEach((entry, i) => {
      logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
    });
    return logs;
  }
  function formatTraceEntry({ vnode, recurseCount }) {
    const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
    const isRoot = vnode.component ? vnode.component.parent == null : false;
    const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
    const close = `>` + postfix;
    return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
  }
  function formatProps(props) {
    const res = [];
    const keys2 = Object.keys(props);
    keys2.slice(0, 3).forEach((key) => {
      res.push(...formatProp(key, props[key]));
    });
    if (keys2.length > 3) {
      res.push(` ...`);
    }
    return res;
  }
  function formatProp(key, value, raw) {
    if (isString(value)) {
      value = JSON.stringify(value);
      return raw ? value : [`${key}=${value}`];
    } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
      return raw ? value : [`${key}=${value}`];
    } else if (isRef(value)) {
      value = formatProp(key, toRaw(value.value), true);
      return raw ? value : [`${key}=Ref<`, value, `>`];
    } else if (isFunction(value)) {
      return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
    } else {
      value = toRaw(value);
      return raw ? value : [`${key}=`, value];
    }
  }
  var ErrorTypeStrings = {
    ["sp"]: "serverPrefetch hook",
    ["bc"]: "beforeCreate hook",
    ["c"]: "created hook",
    ["bm"]: "beforeMount hook",
    ["m"]: "mounted hook",
    ["bu"]: "beforeUpdate hook",
    ["u"]: "updated",
    ["bum"]: "beforeUnmount hook",
    ["um"]: "unmounted hook",
    ["a"]: "activated hook",
    ["da"]: "deactivated hook",
    ["ec"]: "errorCaptured hook",
    ["rtc"]: "renderTracked hook",
    ["rtg"]: "renderTriggered hook",
    [0]: "setup function",
    [1]: "render function",
    [2]: "watcher getter",
    [3]: "watcher callback",
    [4]: "watcher cleanup function",
    [5]: "native event handler",
    [6]: "component event handler",
    [7]: "vnode hook",
    [8]: "directive hook",
    [9]: "transition hook",
    [10]: "app errorHandler",
    [11]: "app warnHandler",
    [12]: "ref function",
    [13]: "async component loader",
    [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
  };
  function callWithErrorHandling(fn, instance, type, args) {
    let res;
    try {
      res = args ? fn(...args) : fn();
    } catch (err) {
      handleError(err, instance, type);
    }
    return res;
  }
  function callWithAsyncErrorHandling(fn, instance, type, args) {
    if (isFunction(fn)) {
      const res = callWithErrorHandling(fn, instance, type, args);
      if (res && isPromise(res)) {
        res.catch((err) => {
          handleError(err, instance, type);
        });
      }
      return res;
    }
    const values = [];
    for (let i = 0; i < fn.length; i++) {
      values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
    }
    return values;
  }
  function handleError(err, instance, type, throwInDev = true) {
    const contextVNode = instance ? instance.vnode : null;
    if (instance) {
      let cur = instance.parent;
      const exposedInstance = instance.proxy;
      const errorInfo = true ? ErrorTypeStrings[type] : type;
      while (cur) {
        const errorCapturedHooks = cur.ec;
        if (errorCapturedHooks) {
          for (let i = 0; i < errorCapturedHooks.length; i++) {
            if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
              return;
            }
          }
        }
        cur = cur.parent;
      }
      const appErrorHandler = instance.appContext.config.errorHandler;
      if (appErrorHandler) {
        callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
        return;
      }
    }
    logError(err, type, contextVNode, throwInDev);
  }
  function logError(err, type, contextVNode, throwInDev = true) {
    if (true) {
      const info = ErrorTypeStrings[type];
      if (contextVNode) {
        pushWarningContext(contextVNode);
      }
      warn2(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
      if (contextVNode) {
        popWarningContext();
      }
      if (throwInDev) {
        throw err;
      } else {
        console.error(err);
      }
    } else {
      console.error(err);
    }
  }
  var isFlushing = false;
  var isFlushPending = false;
  var queue = [];
  var flushIndex = 0;
  var pendingPreFlushCbs = [];
  var activePreFlushCbs = null;
  var preFlushIndex = 0;
  var pendingPostFlushCbs = [];
  var activePostFlushCbs = null;
  var postFlushIndex = 0;
  var resolvedPromise = /* @__PURE__ */ Promise.resolve();
  var currentFlushPromise = null;
  var currentPreFlushParentJob = null;
  var RECURSION_LIMIT = 100;
  function nextTick(fn) {
    const p2 = currentFlushPromise || resolvedPromise;
    return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
  }
  function findInsertionIndex(id) {
    let start = flushIndex + 1;
    let end = queue.length;
    while (start < end) {
      const middle = start + end >>> 1;
      const middleJobId = getId(queue[middle]);
      middleJobId < id ? start = middle + 1 : end = middle;
    }
    return start;
  }
  function queueJob(job) {
    if ((!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) && job !== currentPreFlushParentJob) {
      if (job.id == null) {
        queue.push(job);
      } else {
        queue.splice(findInsertionIndex(job.id), 0, job);
      }
      queueFlush();
    }
  }
  function queueFlush() {
    if (!isFlushing && !isFlushPending) {
      isFlushPending = true;
      currentFlushPromise = resolvedPromise.then(flushJobs);
    }
  }
  function invalidateJob(job) {
    const i = queue.indexOf(job);
    if (i > flushIndex) {
      queue.splice(i, 1);
    }
  }
  function queueCb(cb, activeQueue, pendingQueue, index) {
    if (!isArray(cb)) {
      if (!activeQueue || !activeQueue.includes(cb, cb.allowRecurse ? index + 1 : index)) {
        pendingQueue.push(cb);
      }
    } else {
      pendingQueue.push(...cb);
    }
    queueFlush();
  }
  function queuePreFlushCb(cb) {
    queueCb(cb, activePreFlushCbs, pendingPreFlushCbs, preFlushIndex);
  }
  function queuePostFlushCb(cb) {
    queueCb(cb, activePostFlushCbs, pendingPostFlushCbs, postFlushIndex);
  }
  function flushPreFlushCbs(seen, parentJob = null) {
    if (pendingPreFlushCbs.length) {
      currentPreFlushParentJob = parentJob;
      activePreFlushCbs = [...new Set(pendingPreFlushCbs)];
      pendingPreFlushCbs.length = 0;
      if (true) {
        seen = seen || /* @__PURE__ */ new Map();
      }
      for (preFlushIndex = 0; preFlushIndex < activePreFlushCbs.length; preFlushIndex++) {
        if (checkRecursiveUpdates(seen, activePreFlushCbs[preFlushIndex])) {
          continue;
        }
        activePreFlushCbs[preFlushIndex]();
      }
      activePreFlushCbs = null;
      preFlushIndex = 0;
      currentPreFlushParentJob = null;
      flushPreFlushCbs(seen, parentJob);
    }
  }
  function flushPostFlushCbs(seen) {
    flushPreFlushCbs();
    if (pendingPostFlushCbs.length) {
      const deduped = [...new Set(pendingPostFlushCbs)];
      pendingPostFlushCbs.length = 0;
      if (activePostFlushCbs) {
        activePostFlushCbs.push(...deduped);
        return;
      }
      activePostFlushCbs = deduped;
      if (true) {
        seen = seen || /* @__PURE__ */ new Map();
      }
      activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
      for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
        if (checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
          continue;
        }
        activePostFlushCbs[postFlushIndex]();
      }
      activePostFlushCbs = null;
      postFlushIndex = 0;
    }
  }
  var getId = (job) => job.id == null ? Infinity : job.id;
  function flushJobs(seen) {
    isFlushPending = false;
    isFlushing = true;
    if (true) {
      seen = seen || /* @__PURE__ */ new Map();
    }
    flushPreFlushCbs(seen);
    queue.sort((a, b) => getId(a) - getId(b));
    const check = true ? (job) => checkRecursiveUpdates(seen, job) : NOOP;
    try {
      for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
        const job = queue[flushIndex];
        if (job && job.active !== false) {
          if (check(job)) {
            continue;
          }
          callWithErrorHandling(job, null, 14);
        }
      }
    } finally {
      flushIndex = 0;
      queue.length = 0;
      flushPostFlushCbs(seen);
      isFlushing = false;
      currentFlushPromise = null;
      if (queue.length || pendingPreFlushCbs.length || pendingPostFlushCbs.length) {
        flushJobs(seen);
      }
    }
  }
  function checkRecursiveUpdates(seen, fn) {
    if (!seen.has(fn)) {
      seen.set(fn, 1);
    } else {
      const count = seen.get(fn);
      if (count > RECURSION_LIMIT) {
        const instance = fn.ownerInstance;
        const componentName = instance && getComponentName(instance.type);
        warn2(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`);
        return true;
      } else {
        seen.set(fn, count + 1);
      }
    }
  }
  var isHmrUpdating = false;
  var hmrDirtyComponents = /* @__PURE__ */ new Set();
  if (true) {
    getGlobalThis().__VUE_HMR_RUNTIME__ = {
      createRecord: tryWrap(createRecord),
      rerender: tryWrap(rerender),
      reload: tryWrap(reload)
    };
  }
  var map = /* @__PURE__ */ new Map();
  function registerHMR(instance) {
    const id = instance.type.__hmrId;
    let record = map.get(id);
    if (!record) {
      createRecord(id, instance.type);
      record = map.get(id);
    }
    record.instances.add(instance);
  }
  function unregisterHMR(instance) {
    map.get(instance.type.__hmrId).instances.delete(instance);
  }
  function createRecord(id, initialDef) {
    if (map.has(id)) {
      return false;
    }
    map.set(id, {
      initialDef: normalizeClassComponent(initialDef),
      instances: /* @__PURE__ */ new Set()
    });
    return true;
  }
  function normalizeClassComponent(component) {
    return isClassComponent(component) ? component.__vccOpts : component;
  }
  function rerender(id, newRender) {
    const record = map.get(id);
    if (!record) {
      return;
    }
    record.initialDef.render = newRender;
    [...record.instances].forEach((instance) => {
      if (newRender) {
        instance.render = newRender;
        normalizeClassComponent(instance.type).render = newRender;
      }
      instance.renderCache = [];
      isHmrUpdating = true;
      instance.update();
      isHmrUpdating = false;
    });
  }
  function reload(id, newComp) {
    const record = map.get(id);
    if (!record)
      return;
    newComp = normalizeClassComponent(newComp);
    updateComponentDef(record.initialDef, newComp);
    const instances = [...record.instances];
    for (const instance of instances) {
      const oldComp = normalizeClassComponent(instance.type);
      if (!hmrDirtyComponents.has(oldComp)) {
        if (oldComp !== record.initialDef) {
          updateComponentDef(oldComp, newComp);
        }
        hmrDirtyComponents.add(oldComp);
      }
      instance.appContext.optionsCache.delete(instance.type);
      if (instance.ceReload) {
        hmrDirtyComponents.add(oldComp);
        instance.ceReload(newComp.styles);
        hmrDirtyComponents.delete(oldComp);
      } else if (instance.parent) {
        queueJob(instance.parent.update);
        if (instance.parent.type.__asyncLoader && instance.parent.ceReload) {
          instance.parent.ceReload(newComp.styles);
        }
      } else if (instance.appContext.reload) {
        instance.appContext.reload();
      } else if (typeof window !== "undefined") {
        window.location.reload();
      } else {
        console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
      }
    }
    queuePostFlushCb(() => {
      for (const instance of instances) {
        hmrDirtyComponents.delete(normalizeClassComponent(instance.type));
      }
    });
  }
  function updateComponentDef(oldComp, newComp) {
    extend(oldComp, newComp);
    for (const key in oldComp) {
      if (key !== "__file" && !(key in newComp)) {
        delete oldComp[key];
      }
    }
  }
  function tryWrap(fn) {
    return (id, arg) => {
      try {
        return fn(id, arg);
      } catch (e) {
        console.error(e);
        console.warn(`[HMR] Something went wrong during Vue component hot-reload. Full reload required.`);
      }
    };
  }
  var devtools;
  var buffer = [];
  var devtoolsNotInstalled = false;
  function emit(event, ...args) {
    if (devtools) {
      devtools.emit(event, ...args);
    } else if (!devtoolsNotInstalled) {
      buffer.push({ event, args });
    }
  }
  function setDevtoolsHook(hook, target) {
    var _a2, _b;
    devtools = hook;
    if (devtools) {
      devtools.enabled = true;
      buffer.forEach(({ event, args }) => devtools.emit(event, ...args));
      buffer = [];
    } else if (typeof window !== "undefined" && window.HTMLElement && !((_b = (_a2 = window.navigator) === null || _a2 === void 0 ? void 0 : _a2.userAgent) === null || _b === void 0 ? void 0 : _b.includes("jsdom"))) {
      const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
      replay.push((newHook) => {
        setDevtoolsHook(newHook, target);
      });
      setTimeout(() => {
        if (!devtools) {
          target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
          devtoolsNotInstalled = true;
          buffer = [];
        }
      }, 3e3);
    } else {
      devtoolsNotInstalled = true;
      buffer = [];
    }
  }
  function devtoolsInitApp(app2, version3) {
    emit("app:init", app2, version3, {
      Fragment,
      Text,
      Comment,
      Static
    });
  }
  function devtoolsUnmountApp(app2) {
    emit("app:unmount", app2);
  }
  var devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook("component:added");
  var devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook("component:updated");
  var devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook("component:removed");
  function createDevtoolsComponentHook(hook) {
    return (component) => {
      emit(hook, component.appContext.app, component.uid, component.parent ? component.parent.uid : void 0, component);
    };
  }
  var devtoolsPerfStart = /* @__PURE__ */ createDevtoolsPerformanceHook("perf:start");
  var devtoolsPerfEnd = /* @__PURE__ */ createDevtoolsPerformanceHook("perf:end");
  function createDevtoolsPerformanceHook(hook) {
    return (component, type, time) => {
      emit(hook, component.appContext.app, component.uid, component, type, time);
    };
  }
  function devtoolsComponentEmit(component, event, params) {
    emit("component:emit", component.appContext.app, component, event, params);
  }
  function emit$1(instance, event, ...rawArgs) {
    if (instance.isUnmounted)
      return;
    const props = instance.vnode.props || EMPTY_OBJ;
    if (true) {
      const { emitsOptions, propsOptions: [propsOptions] } = instance;
      if (emitsOptions) {
        if (!(event in emitsOptions) && true) {
          if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
            warn2(`Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(event)}" prop.`);
          }
        } else {
          const validator = emitsOptions[event];
          if (isFunction(validator)) {
            const isValid = validator(...rawArgs);
            if (!isValid) {
              warn2(`Invalid event arguments: event validation failed for event "${event}".`);
            }
          }
        }
      }
    }
    let args = rawArgs;
    const isModelListener2 = event.startsWith("update:");
    const modelArg = isModelListener2 && event.slice(7);
    if (modelArg && modelArg in props) {
      const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
      const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
      if (trim) {
        args = rawArgs.map((a) => a.trim());
      }
      if (number) {
        args = rawArgs.map(toNumber);
      }
    }
    if (true) {
      devtoolsComponentEmit(instance, event, args);
    }
    if (true) {
      const lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
        warn2(`Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(instance, instance.type)} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(event)}" instead of "${event}".`);
      }
    }
    let handlerName;
    let handler = props[handlerName = toHandlerKey(event)] || props[handlerName = toHandlerKey(camelize(event))];
    if (!handler && isModelListener2) {
      handler = props[handlerName = toHandlerKey(hyphenate(event))];
    }
    if (handler) {
      callWithAsyncErrorHandling(handler, instance, 6, args);
    }
    const onceHandler = props[handlerName + `Once`];
    if (onceHandler) {
      if (!instance.emitted) {
        instance.emitted = {};
      } else if (instance.emitted[handlerName]) {
        return;
      }
      instance.emitted[handlerName] = true;
      callWithAsyncErrorHandling(onceHandler, instance, 6, args);
    }
  }
  function normalizeEmitsOptions(comp, appContext, asMixin = false) {
    const cache = appContext.emitsCache;
    const cached = cache.get(comp);
    if (cached !== void 0) {
      return cached;
    }
    const raw = comp.emits;
    let normalized = {};
    let hasExtends = false;
    if (__VUE_OPTIONS_API__ && !isFunction(comp)) {
      const extendEmits = (raw2) => {
        const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
        if (normalizedFromExtend) {
          hasExtends = true;
          extend(normalized, normalizedFromExtend);
        }
      };
      if (!asMixin && appContext.mixins.length) {
        appContext.mixins.forEach(extendEmits);
      }
      if (comp.extends) {
        extendEmits(comp.extends);
      }
      if (comp.mixins) {
        comp.mixins.forEach(extendEmits);
      }
    }
    if (!raw && !hasExtends) {
      cache.set(comp, null);
      return null;
    }
    if (isArray(raw)) {
      raw.forEach((key) => normalized[key] = null);
    } else {
      extend(normalized, raw);
    }
    cache.set(comp, normalized);
    return normalized;
  }
  function isEmitListener(options, key) {
    if (!options || !isOn(key)) {
      return false;
    }
    key = key.slice(2).replace(/Once$/, "");
    return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
  }
  var currentRenderingInstance = null;
  var currentScopeId = null;
  function setCurrentRenderingInstance(instance) {
    const prev = currentRenderingInstance;
    currentRenderingInstance = instance;
    currentScopeId = instance && instance.type.__scopeId || null;
    return prev;
  }
  function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
    if (!ctx)
      return fn;
    if (fn._n) {
      return fn;
    }
    const renderFnWithContext = (...args) => {
      if (renderFnWithContext._d) {
        setBlockTracking(-1);
      }
      const prevInstance = setCurrentRenderingInstance(ctx);
      const res = fn(...args);
      setCurrentRenderingInstance(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
      if (true) {
        devtoolsComponentUpdated(ctx);
      }
      return res;
    };
    renderFnWithContext._n = true;
    renderFnWithContext._c = true;
    renderFnWithContext._d = true;
    return renderFnWithContext;
  }
  var accessedAttrs = false;
  function markAttrsAccessed() {
    accessedAttrs = true;
  }
  function renderComponentRoot(instance) {
    const { type: Component, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit: emit2, render: render2, renderCache, data, setupState, ctx, inheritAttrs } = instance;
    let result;
    let fallthroughAttrs;
    const prev = setCurrentRenderingInstance(instance);
    if (true) {
      accessedAttrs = false;
    }
    try {
      if (vnode.shapeFlag & 4) {
        const proxyToUse = withProxy || proxy;
        result = normalizeVNode(render2.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx));
        fallthroughAttrs = attrs;
      } else {
        const render3 = Component;
        if (attrs === props) {
          markAttrsAccessed();
        }
        result = normalizeVNode(render3.length > 1 ? render3(props, true ? {
          get attrs() {
            markAttrsAccessed();
            return attrs;
          },
          slots,
          emit: emit2
        } : { attrs, slots, emit: emit2 }) : render3(props, null));
        fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
      }
    } catch (err) {
      blockStack.length = 0;
      handleError(err, instance, 1);
      result = createVNode(Comment);
    }
    let root = result;
    let setRoot = void 0;
    if (result.patchFlag > 0 && result.patchFlag & 2048) {
      [root, setRoot] = getChildRoot(result);
    }
    if (fallthroughAttrs && inheritAttrs !== false) {
      const keys2 = Object.keys(fallthroughAttrs);
      const { shapeFlag } = root;
      if (keys2.length) {
        if (shapeFlag & (1 | 6)) {
          if (propsOptions && keys2.some(isModelListener)) {
            fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
          }
          root = cloneVNode(root, fallthroughAttrs);
        } else if (!accessedAttrs && root.type !== Comment) {
          const allAttrs = Object.keys(attrs);
          const eventAttrs = [];
          const extraAttrs = [];
          for (let i = 0, l = allAttrs.length; i < l; i++) {
            const key = allAttrs[i];
            if (isOn(key)) {
              if (!isModelListener(key)) {
                eventAttrs.push(key[2].toLowerCase() + key.slice(3));
              }
            } else {
              extraAttrs.push(key);
            }
          }
          if (extraAttrs.length) {
            warn2(`Extraneous non-props attributes (${extraAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes.`);
          }
          if (eventAttrs.length) {
            warn2(`Extraneous non-emits event listeners (${eventAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`);
          }
        }
      }
    }
    if (vnode.dirs) {
      if (!isElementRoot(root)) {
        warn2(`Runtime directive used on component with non-element root node. The directives will not function as intended.`);
      }
      root = cloneVNode(root);
      root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
    }
    if (vnode.transition) {
      if (!isElementRoot(root)) {
        warn2(`Component inside <Transition> renders non-element root node that cannot be animated.`);
      }
      root.transition = vnode.transition;
    }
    if (setRoot) {
      setRoot(root);
    } else {
      result = root;
    }
    setCurrentRenderingInstance(prev);
    return result;
  }
  var getChildRoot = (vnode) => {
    const rawChildren = vnode.children;
    const dynamicChildren = vnode.dynamicChildren;
    const childRoot = filterSingleRoot(rawChildren);
    if (!childRoot) {
      return [vnode, void 0];
    }
    const index = rawChildren.indexOf(childRoot);
    const dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;
    const setRoot = (updatedRoot) => {
      rawChildren[index] = updatedRoot;
      if (dynamicChildren) {
        if (dynamicIndex > -1) {
          dynamicChildren[dynamicIndex] = updatedRoot;
        } else if (updatedRoot.patchFlag > 0) {
          vnode.dynamicChildren = [...dynamicChildren, updatedRoot];
        }
      }
    };
    return [normalizeVNode(childRoot), setRoot];
  };
  function filterSingleRoot(children) {
    let singleRoot;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (isVNode(child)) {
        if (child.type !== Comment || child.children === "v-if") {
          if (singleRoot) {
            return;
          } else {
            singleRoot = child;
          }
        }
      } else {
        return;
      }
    }
    return singleRoot;
  }
  var getFunctionalFallthrough = (attrs) => {
    let res;
    for (const key in attrs) {
      if (key === "class" || key === "style" || isOn(key)) {
        (res || (res = {}))[key] = attrs[key];
      }
    }
    return res;
  };
  var filterModelListeners = (attrs, props) => {
    const res = {};
    for (const key in attrs) {
      if (!isModelListener(key) || !(key.slice(9) in props)) {
        res[key] = attrs[key];
      }
    }
    return res;
  };
  var isElementRoot = (vnode) => {
    return vnode.shapeFlag & (6 | 1) || vnode.type === Comment;
  };
  function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
    const { props: prevProps, children: prevChildren, component } = prevVNode;
    const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
    const emits = component.emitsOptions;
    if ((prevChildren || nextChildren) && isHmrUpdating) {
      return true;
    }
    if (nextVNode.dirs || nextVNode.transition) {
      return true;
    }
    if (optimized && patchFlag >= 0) {
      if (patchFlag & 1024) {
        return true;
      }
      if (patchFlag & 16) {
        if (!prevProps) {
          return !!nextProps;
        }
        return hasPropsChanged(prevProps, nextProps, emits);
      } else if (patchFlag & 8) {
        const dynamicProps = nextVNode.dynamicProps;
        for (let i = 0; i < dynamicProps.length; i++) {
          const key = dynamicProps[i];
          if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
            return true;
          }
        }
      }
    } else {
      if (prevChildren || nextChildren) {
        if (!nextChildren || !nextChildren.$stable) {
          return true;
        }
      }
      if (prevProps === nextProps) {
        return false;
      }
      if (!prevProps) {
        return !!nextProps;
      }
      if (!nextProps) {
        return true;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    }
    return false;
  }
  function hasPropsChanged(prevProps, nextProps, emitsOptions) {
    const nextKeys = Object.keys(nextProps);
    if (nextKeys.length !== Object.keys(prevProps).length) {
      return true;
    }
    for (let i = 0; i < nextKeys.length; i++) {
      const key = nextKeys[i];
      if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
        return true;
      }
    }
    return false;
  }
  function updateHOCHostEl({ vnode, parent }, el) {
    while (parent && parent.subTree === vnode) {
      (vnode = parent.vnode).el = el;
      parent = parent.parent;
    }
  }
  var isSuspense = (type) => type.__isSuspense;
  function queueEffectWithSuspense(fn, suspense) {
    if (suspense && suspense.pendingBranch) {
      if (isArray(fn)) {
        suspense.effects.push(...fn);
      } else {
        suspense.effects.push(fn);
      }
    } else {
      queuePostFlushCb(fn);
    }
  }
  function provide(key, value) {
    if (!currentInstance) {
      if (true) {
        warn2(`provide() can only be used inside setup().`);
      }
    } else {
      let provides = currentInstance.provides;
      const parentProvides = currentInstance.parent && currentInstance.parent.provides;
      if (parentProvides === provides) {
        provides = currentInstance.provides = Object.create(parentProvides);
      }
      provides[key] = value;
    }
  }
  function inject(key, defaultValue, treatDefaultAsFactory = false) {
    const instance = currentInstance || currentRenderingInstance;
    if (instance) {
      const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
      if (provides && key in provides) {
        return provides[key];
      } else if (arguments.length > 1) {
        return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
      } else if (true) {
        warn2(`injection "${String(key)}" not found.`);
      }
    } else if (true) {
      warn2(`inject() can only be used inside setup() or functional components.`);
    }
  }
  function watchEffect(effect2, options) {
    return doWatch(effect2, null, options);
  }
  var INITIAL_WATCHER_VALUE = {};
  function watch(source, cb, options) {
    if (!isFunction(cb)) {
      warn2(`\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`);
    }
    return doWatch(source, cb, options);
  }
  function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
    if (!cb) {
      if (immediate !== void 0) {
        warn2(`watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`);
      }
      if (deep !== void 0) {
        warn2(`watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`);
      }
    }
    const warnInvalidSource = (s) => {
      warn2(`Invalid watch source: `, s, `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`);
    };
    const instance = currentInstance;
    let getter;
    let forceTrigger = false;
    let isMultiSource = false;
    if (isRef(source)) {
      getter = () => source.value;
      forceTrigger = isShallow(source);
    } else if (isReactive(source)) {
      getter = () => source;
      deep = true;
    } else if (isArray(source)) {
      isMultiSource = true;
      forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
      getter = () => source.map((s) => {
        if (isRef(s)) {
          return s.value;
        } else if (isReactive(s)) {
          return traverse(s);
        } else if (isFunction(s)) {
          return callWithErrorHandling(s, instance, 2);
        } else {
          warnInvalidSource(s);
        }
      });
    } else if (isFunction(source)) {
      if (cb) {
        getter = () => callWithErrorHandling(source, instance, 2);
      } else {
        getter = () => {
          if (instance && instance.isUnmounted) {
            return;
          }
          if (cleanup) {
            cleanup();
          }
          return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
        };
      }
    } else {
      getter = NOOP;
      warnInvalidSource(source);
    }
    if (cb && deep) {
      const baseGetter = getter;
      getter = () => traverse(baseGetter());
    }
    let cleanup;
    let onCleanup = (fn) => {
      cleanup = effect2.onStop = () => {
        callWithErrorHandling(fn, instance, 4);
      };
    };
    if (isInSSRComponentSetup) {
      onCleanup = NOOP;
      if (!cb) {
        getter();
      } else if (immediate) {
        callWithAsyncErrorHandling(cb, instance, 3, [
          getter(),
          isMultiSource ? [] : void 0,
          onCleanup
        ]);
      }
      return NOOP;
    }
    let oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
    const job = () => {
      if (!effect2.active) {
        return;
      }
      if (cb) {
        const newValue = effect2.run();
        if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
          if (cleanup) {
            cleanup();
          }
          callWithAsyncErrorHandling(cb, instance, 3, [
            newValue,
            oldValue === INITIAL_WATCHER_VALUE ? void 0 : oldValue,
            onCleanup
          ]);
          oldValue = newValue;
        }
      } else {
        effect2.run();
      }
    };
    job.allowRecurse = !!cb;
    let scheduler;
    if (flush === "sync") {
      scheduler = job;
    } else if (flush === "post") {
      scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
    } else {
      scheduler = () => queuePreFlushCb(job);
    }
    const effect2 = new ReactiveEffect(getter, scheduler);
    if (true) {
      effect2.onTrack = onTrack;
      effect2.onTrigger = onTrigger;
    }
    if (cb) {
      if (immediate) {
        job();
      } else {
        oldValue = effect2.run();
      }
    } else if (flush === "post") {
      queuePostRenderEffect(effect2.run.bind(effect2), instance && instance.suspense);
    } else {
      effect2.run();
    }
    return () => {
      effect2.stop();
      if (instance && instance.scope) {
        remove(instance.scope.effects, effect2);
      }
    };
  }
  function instanceWatch(source, value, options) {
    const publicThis = this.proxy;
    const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
    let cb;
    if (isFunction(value)) {
      cb = value;
    } else {
      cb = value.handler;
      options = value;
    }
    const cur = currentInstance;
    setCurrentInstance(this);
    const res = doWatch(getter, cb.bind(publicThis), options);
    if (cur) {
      setCurrentInstance(cur);
    } else {
      unsetCurrentInstance();
    }
    return res;
  }
  function createPathGetter(ctx, path) {
    const segments = path.split(".");
    return () => {
      let cur = ctx;
      for (let i = 0; i < segments.length && cur; i++) {
        cur = cur[segments[i]];
      }
      return cur;
    };
  }
  function traverse(value, seen) {
    if (!isObject(value) || value["__v_skip"]) {
      return value;
    }
    seen = seen || /* @__PURE__ */ new Set();
    if (seen.has(value)) {
      return value;
    }
    seen.add(value);
    if (isRef(value)) {
      traverse(value.value, seen);
    } else if (isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        traverse(value[i], seen);
      }
    } else if (isSet(value) || isMap(value)) {
      value.forEach((v) => {
        traverse(v, seen);
      });
    } else if (isPlainObject(value)) {
      for (const key in value) {
        traverse(value[key], seen);
      }
    }
    return value;
  }
  function useTransitionState() {
    const state = {
      isMounted: false,
      isLeaving: false,
      isUnmounting: false,
      leavingVNodes: /* @__PURE__ */ new Map()
    };
    onMounted(() => {
      state.isMounted = true;
    });
    onBeforeUnmount(() => {
      state.isUnmounting = true;
    });
    return state;
  }
  var TransitionHookValidator = [Function, Array];
  var BaseTransitionImpl = {
    name: `BaseTransition`,
    props: {
      mode: String,
      appear: Boolean,
      persisted: Boolean,
      onBeforeEnter: TransitionHookValidator,
      onEnter: TransitionHookValidator,
      onAfterEnter: TransitionHookValidator,
      onEnterCancelled: TransitionHookValidator,
      onBeforeLeave: TransitionHookValidator,
      onLeave: TransitionHookValidator,
      onAfterLeave: TransitionHookValidator,
      onLeaveCancelled: TransitionHookValidator,
      onBeforeAppear: TransitionHookValidator,
      onAppear: TransitionHookValidator,
      onAfterAppear: TransitionHookValidator,
      onAppearCancelled: TransitionHookValidator
    },
    setup(props, { slots }) {
      const instance = getCurrentInstance();
      const state = useTransitionState();
      let prevTransitionKey;
      return () => {
        const children = slots.default && getTransitionRawChildren(slots.default(), true);
        if (!children || !children.length) {
          return;
        }
        let child = children[0];
        if (children.length > 1) {
          let hasFound = false;
          for (const c of children) {
            if (c.type !== Comment) {
              if (hasFound) {
                warn2("<transition> can only be used on a single element or component. Use <transition-group> for lists.");
                break;
              }
              child = c;
              hasFound = true;
              if (false)
                break;
            }
          }
        }
        const rawProps = toRaw(props);
        const { mode } = rawProps;
        if (mode && mode !== "in-out" && mode !== "out-in" && mode !== "default") {
          warn2(`invalid <transition> mode: ${mode}`);
        }
        if (state.isLeaving) {
          return emptyPlaceholder(child);
        }
        const innerChild = getKeepAliveChild(child);
        if (!innerChild) {
          return emptyPlaceholder(child);
        }
        const enterHooks = resolveTransitionHooks(innerChild, rawProps, state, instance);
        setTransitionHooks(innerChild, enterHooks);
        const oldChild = instance.subTree;
        const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
        let transitionKeyChanged = false;
        const { getTransitionKey } = innerChild.type;
        if (getTransitionKey) {
          const key = getTransitionKey();
          if (prevTransitionKey === void 0) {
            prevTransitionKey = key;
          } else if (key !== prevTransitionKey) {
            prevTransitionKey = key;
            transitionKeyChanged = true;
          }
        }
        if (oldInnerChild && oldInnerChild.type !== Comment && (!isSameVNodeType(innerChild, oldInnerChild) || transitionKeyChanged)) {
          const leavingHooks = resolveTransitionHooks(oldInnerChild, rawProps, state, instance);
          setTransitionHooks(oldInnerChild, leavingHooks);
          if (mode === "out-in") {
            state.isLeaving = true;
            leavingHooks.afterLeave = () => {
              state.isLeaving = false;
              instance.update();
            };
            return emptyPlaceholder(child);
          } else if (mode === "in-out" && innerChild.type !== Comment) {
            leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
              const leavingVNodesCache = getLeavingNodesForType(state, oldInnerChild);
              leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
              el._leaveCb = () => {
                earlyRemove();
                el._leaveCb = void 0;
                delete enterHooks.delayedLeave;
              };
              enterHooks.delayedLeave = delayedLeave;
            };
          }
        }
        return child;
      };
    }
  };
  var BaseTransition = BaseTransitionImpl;
  function getLeavingNodesForType(state, vnode) {
    const { leavingVNodes } = state;
    let leavingVNodesCache = leavingVNodes.get(vnode.type);
    if (!leavingVNodesCache) {
      leavingVNodesCache = /* @__PURE__ */ Object.create(null);
      leavingVNodes.set(vnode.type, leavingVNodesCache);
    }
    return leavingVNodesCache;
  }
  function resolveTransitionHooks(vnode, props, state, instance) {
    const { appear, mode, persisted = false, onBeforeEnter, onEnter, onAfterEnter, onEnterCancelled, onBeforeLeave, onLeave, onAfterLeave, onLeaveCancelled, onBeforeAppear, onAppear, onAfterAppear, onAppearCancelled } = props;
    const key = String(vnode.key);
    const leavingVNodesCache = getLeavingNodesForType(state, vnode);
    const callHook3 = (hook, args) => {
      hook && callWithAsyncErrorHandling(hook, instance, 9, args);
    };
    const callAsyncHook = (hook, args) => {
      const done = args[1];
      callHook3(hook, args);
      if (isArray(hook)) {
        if (hook.every((hook2) => hook2.length <= 1))
          done();
      } else if (hook.length <= 1) {
        done();
      }
    };
    const hooks = {
      mode,
      persisted,
      beforeEnter(el) {
        let hook = onBeforeEnter;
        if (!state.isMounted) {
          if (appear) {
            hook = onBeforeAppear || onBeforeEnter;
          } else {
            return;
          }
        }
        if (el._leaveCb) {
          el._leaveCb(true);
        }
        const leavingVNode = leavingVNodesCache[key];
        if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el._leaveCb) {
          leavingVNode.el._leaveCb();
        }
        callHook3(hook, [el]);
      },
      enter(el) {
        let hook = onEnter;
        let afterHook = onAfterEnter;
        let cancelHook = onEnterCancelled;
        if (!state.isMounted) {
          if (appear) {
            hook = onAppear || onEnter;
            afterHook = onAfterAppear || onAfterEnter;
            cancelHook = onAppearCancelled || onEnterCancelled;
          } else {
            return;
          }
        }
        let called = false;
        const done = el._enterCb = (cancelled) => {
          if (called)
            return;
          called = true;
          if (cancelled) {
            callHook3(cancelHook, [el]);
          } else {
            callHook3(afterHook, [el]);
          }
          if (hooks.delayedLeave) {
            hooks.delayedLeave();
          }
          el._enterCb = void 0;
        };
        if (hook) {
          callAsyncHook(hook, [el, done]);
        } else {
          done();
        }
      },
      leave(el, remove2) {
        const key2 = String(vnode.key);
        if (el._enterCb) {
          el._enterCb(true);
        }
        if (state.isUnmounting) {
          return remove2();
        }
        callHook3(onBeforeLeave, [el]);
        let called = false;
        const done = el._leaveCb = (cancelled) => {
          if (called)
            return;
          called = true;
          remove2();
          if (cancelled) {
            callHook3(onLeaveCancelled, [el]);
          } else {
            callHook3(onAfterLeave, [el]);
          }
          el._leaveCb = void 0;
          if (leavingVNodesCache[key2] === vnode) {
            delete leavingVNodesCache[key2];
          }
        };
        leavingVNodesCache[key2] = vnode;
        if (onLeave) {
          callAsyncHook(onLeave, [el, done]);
        } else {
          done();
        }
      },
      clone(vnode2) {
        return resolveTransitionHooks(vnode2, props, state, instance);
      }
    };
    return hooks;
  }
  function emptyPlaceholder(vnode) {
    if (isKeepAlive(vnode)) {
      vnode = cloneVNode(vnode);
      vnode.children = null;
      return vnode;
    }
  }
  function getKeepAliveChild(vnode) {
    return isKeepAlive(vnode) ? vnode.children ? vnode.children[0] : void 0 : vnode;
  }
  function setTransitionHooks(vnode, hooks) {
    if (vnode.shapeFlag & 6 && vnode.component) {
      setTransitionHooks(vnode.component.subTree, hooks);
    } else if (vnode.shapeFlag & 128) {
      vnode.ssContent.transition = hooks.clone(vnode.ssContent);
      vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
    } else {
      vnode.transition = hooks;
    }
  }
  function getTransitionRawChildren(children, keepComment = false, parentKey) {
    let ret = [];
    let keyedFragmentCount = 0;
    for (let i = 0; i < children.length; i++) {
      let child = children[i];
      const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
      if (child.type === Fragment) {
        if (child.patchFlag & 128)
          keyedFragmentCount++;
        ret = ret.concat(getTransitionRawChildren(child.children, keepComment, key));
      } else if (keepComment || child.type !== Comment) {
        ret.push(key != null ? cloneVNode(child, { key }) : child);
      }
    }
    if (keyedFragmentCount > 1) {
      for (let i = 0; i < ret.length; i++) {
        ret[i].patchFlag = -2;
      }
    }
    return ret;
  }
  function defineComponent(options) {
    return isFunction(options) ? { setup: options, name: options.name } : options;
  }
  var isAsyncWrapper = (i) => !!i.type.__asyncLoader;
  var isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
  function onActivated(hook, target) {
    registerKeepAliveHook(hook, "a", target);
  }
  function onDeactivated(hook, target) {
    registerKeepAliveHook(hook, "da", target);
  }
  function registerKeepAliveHook(hook, type, target = currentInstance) {
    const wrappedHook = hook.__wdc || (hook.__wdc = () => {
      let current = target;
      while (current) {
        if (current.isDeactivated) {
          return;
        }
        current = current.parent;
      }
      return hook();
    });
    injectHook(type, wrappedHook, target);
    if (target) {
      let current = target.parent;
      while (current && current.parent) {
        if (isKeepAlive(current.parent.vnode)) {
          injectToKeepAliveRoot(wrappedHook, type, target, current);
        }
        current = current.parent;
      }
    }
  }
  function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
    const injected = injectHook(type, hook, keepAliveRoot, true);
    onUnmounted(() => {
      remove(keepAliveRoot[type], injected);
    }, target);
  }
  function injectHook(type, hook, target = currentInstance, prepend = false) {
    if (target) {
      const hooks = target[type] || (target[type] = []);
      const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
        if (target.isUnmounted) {
          return;
        }
        pauseTracking();
        setCurrentInstance(target);
        const res = callWithAsyncErrorHandling(hook, target, type, args);
        unsetCurrentInstance();
        resetTracking();
        return res;
      });
      if (prepend) {
        hooks.unshift(wrappedHook);
      } else {
        hooks.push(wrappedHook);
      }
      return wrappedHook;
    } else if (true) {
      const apiName = toHandlerKey(ErrorTypeStrings[type].replace(/ hook$/, ""));
      warn2(`${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`);
    }
  }
  var createHook = (lifecycle) => (hook, target = currentInstance) => (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, hook, target);
  var onBeforeMount = createHook("bm");
  var onMounted = createHook("m");
  var onBeforeUpdate = createHook("bu");
  var onUpdated = createHook("u");
  var onBeforeUnmount = createHook("bum");
  var onUnmounted = createHook("um");
  var onServerPrefetch = createHook("sp");
  var onRenderTriggered = createHook("rtg");
  var onRenderTracked = createHook("rtc");
  function onErrorCaptured(hook, target = currentInstance) {
    injectHook("ec", hook, target);
  }
  function validateDirectiveName(name) {
    if (isBuiltInDirective(name)) {
      warn2("Do not use built-in directive ids as custom directive id: " + name);
    }
  }
  function withDirectives(vnode, directives) {
    const internalInstance = currentRenderingInstance;
    if (internalInstance === null) {
      warn2(`withDirectives can only be used inside render functions.`);
      return vnode;
    }
    const instance = getExposeProxy(internalInstance) || internalInstance.proxy;
    const bindings = vnode.dirs || (vnode.dirs = []);
    for (let i = 0; i < directives.length; i++) {
      let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
      if (isFunction(dir)) {
        dir = {
          mounted: dir,
          updated: dir
        };
      }
      if (dir.deep) {
        traverse(value);
      }
      bindings.push({
        dir,
        instance,
        value,
        oldValue: void 0,
        arg,
        modifiers
      });
    }
    return vnode;
  }
  function invokeDirectiveHook(vnode, prevVNode, instance, name) {
    const bindings = vnode.dirs;
    const oldBindings = prevVNode && prevVNode.dirs;
    for (let i = 0; i < bindings.length; i++) {
      const binding = bindings[i];
      if (oldBindings) {
        binding.oldValue = oldBindings[i].value;
      }
      let hook = binding.dir[name];
      if (hook) {
        pauseTracking();
        callWithAsyncErrorHandling(hook, instance, 8, [
          vnode.el,
          binding,
          vnode,
          prevVNode
        ]);
        resetTracking();
      }
    }
  }
  var COMPONENTS = "components";
  var DIRECTIVES = "directives";
  function resolveComponent(name, maybeSelfReference) {
    return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
  }
  var NULL_DYNAMIC_COMPONENT = Symbol();
  function resolveDynamicComponent(component) {
    if (isString(component)) {
      return resolveAsset(COMPONENTS, component, false) || component;
    } else {
      return component || NULL_DYNAMIC_COMPONENT;
    }
  }
  function resolveDirective(name) {
    return resolveAsset(DIRECTIVES, name);
  }
  function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
    const instance = currentRenderingInstance || currentInstance;
    if (instance) {
      const Component = instance.type;
      if (type === COMPONENTS) {
        const selfName = getComponentName(Component, false);
        if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
          return Component;
        }
      }
      const res = resolve(instance[type] || Component[type], name) || resolve(instance.appContext[type], name);
      if (!res && maybeSelfReference) {
        return Component;
      }
      if (warnMissing && !res) {
        const extra = type === COMPONENTS ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : ``;
        warn2(`Failed to resolve ${type.slice(0, -1)}: ${name}${extra}`);
      }
      return res;
    } else if (true) {
      warn2(`resolve${capitalize(type.slice(0, -1))} can only be used in render() or setup().`);
    }
  }
  function resolve(registry, name) {
    return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
  }
  function renderList(source, renderItem, cache, index) {
    let ret;
    const cached = cache && cache[index];
    if (isArray(source) || isString(source)) {
      ret = new Array(source.length);
      for (let i = 0, l = source.length; i < l; i++) {
        ret[i] = renderItem(source[i], i, void 0, cached && cached[i]);
      }
    } else if (typeof source === "number") {
      if (!Number.isInteger(source)) {
        warn2(`The v-for range expect an integer value but got ${source}.`);
      }
      ret = new Array(source);
      for (let i = 0; i < source; i++) {
        ret[i] = renderItem(i + 1, i, void 0, cached && cached[i]);
      }
    } else if (isObject(source)) {
      if (source[Symbol.iterator]) {
        ret = Array.from(source, (item, i) => renderItem(item, i, void 0, cached && cached[i]));
      } else {
        const keys2 = Object.keys(source);
        ret = new Array(keys2.length);
        for (let i = 0, l = keys2.length; i < l; i++) {
          const key = keys2[i];
          ret[i] = renderItem(source[key], key, i, cached && cached[i]);
        }
      }
    } else {
      ret = [];
    }
    if (cache) {
      cache[index] = ret;
    }
    return ret;
  }
  function toHandlers(obj) {
    const ret = {};
    if (!isObject(obj)) {
      warn2(`v-on with no argument expects an object value.`);
      return ret;
    }
    for (const key in obj) {
      ret[toHandlerKey(key)] = obj[key];
    }
    return ret;
  }
  var getPublicInstance = (i) => {
    if (!i)
      return null;
    if (isStatefulComponent(i))
      return getExposeProxy(i) || i.proxy;
    return getPublicInstance(i.parent);
  };
  var publicPropertiesMap = /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    $: (i) => i,
    $el: (i) => i.vnode.el,
    $data: (i) => i.data,
    $props: (i) => true ? shallowReadonly(i.props) : i.props,
    $attrs: (i) => true ? shallowReadonly(i.attrs) : i.attrs,
    $slots: (i) => true ? shallowReadonly(i.slots) : i.slots,
    $refs: (i) => true ? shallowReadonly(i.refs) : i.refs,
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $emit: (i) => i.emit,
    $options: (i) => __VUE_OPTIONS_API__ ? resolveMergedOptions(i) : i.type,
    $forceUpdate: (i) => i.f || (i.f = () => queueJob(i.update)),
    $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
    $watch: (i) => __VUE_OPTIONS_API__ ? instanceWatch.bind(i) : NOOP
  });
  var isReservedPrefix = (key) => key === "_" || key === "$";
  var PublicInstanceProxyHandlers = {
    get({ _: instance }, key) {
      const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
      if (key === "__isVue") {
        return true;
      }
      if (setupState !== EMPTY_OBJ && setupState.__isScriptSetup && hasOwn(setupState, key)) {
        return setupState[key];
      }
      let normalizedProps;
      if (key[0] !== "$") {
        const n = accessCache[key];
        if (n !== void 0) {
          switch (n) {
            case 1:
              return setupState[key];
            case 2:
              return data[key];
            case 4:
              return ctx[key];
            case 3:
              return props[key];
          }
        } else if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
          accessCache[key] = 1;
          return setupState[key];
        } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
          accessCache[key] = 2;
          return data[key];
        } else if ((normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)) {
          accessCache[key] = 3;
          return props[key];
        } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
          accessCache[key] = 4;
          return ctx[key];
        } else if (!__VUE_OPTIONS_API__ || shouldCacheAccess) {
          accessCache[key] = 0;
        }
      }
      const publicGetter = publicPropertiesMap[key];
      let cssModule, globalProperties;
      if (publicGetter) {
        if (key === "$attrs") {
          track(instance, "get", key);
          markAttrsAccessed();
        }
        return publicGetter(instance);
      } else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key])) {
        return cssModule;
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)) {
        {
          return globalProperties[key];
        }
      } else if (currentRenderingInstance && (!isString(key) || key.indexOf("__v") !== 0)) {
        if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn(data, key)) {
          warn2(`Property ${JSON.stringify(key)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`);
        } else if (instance === currentRenderingInstance) {
          warn2(`Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`);
        }
      }
    },
    set({ _: instance }, key, value) {
      const { data, setupState, ctx } = instance;
      if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
        setupState[key] = value;
        return true;
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        data[key] = value;
        return true;
      } else if (hasOwn(instance.props, key)) {
        warn2(`Attempting to mutate prop "${key}". Props are readonly.`, instance);
        return false;
      }
      if (key[0] === "$" && key.slice(1) in instance) {
        warn2(`Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`, instance);
        return false;
      } else {
        if (key in instance.appContext.config.globalProperties) {
          Object.defineProperty(ctx, key, {
            enumerable: true,
            configurable: true,
            value
          });
        } else {
          ctx[key] = value;
        }
      }
      return true;
    },
    has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
      let normalizedProps;
      return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || setupState !== EMPTY_OBJ && hasOwn(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
    },
    defineProperty(target, key, descriptor) {
      if (descriptor.get != null) {
        target._.accessCache[key] = 0;
      } else if (hasOwn(descriptor, "value")) {
        this.set(target, key, descriptor.value, null);
      }
      return Reflect.defineProperty(target, key, descriptor);
    }
  };
  if (true) {
    PublicInstanceProxyHandlers.ownKeys = (target) => {
      warn2(`Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`);
      return Reflect.ownKeys(target);
    };
  }
  function createDevRenderContext(instance) {
    const target = {};
    Object.defineProperty(target, `_`, {
      configurable: true,
      enumerable: false,
      get: () => instance
    });
    Object.keys(publicPropertiesMap).forEach((key) => {
      Object.defineProperty(target, key, {
        configurable: true,
        enumerable: false,
        get: () => publicPropertiesMap[key](instance),
        set: NOOP
      });
    });
    return target;
  }
  function exposePropsOnRenderContext(instance) {
    const { ctx, propsOptions: [propsOptions] } = instance;
    if (propsOptions) {
      Object.keys(propsOptions).forEach((key) => {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => instance.props[key],
          set: NOOP
        });
      });
    }
  }
  function exposeSetupStateOnRenderContext(instance) {
    const { ctx, setupState } = instance;
    Object.keys(toRaw(setupState)).forEach((key) => {
      if (!setupState.__isScriptSetup) {
        if (isReservedPrefix(key[0])) {
          warn2(`setup() return property ${JSON.stringify(key)} should not start with "$" or "_" which are reserved prefixes for Vue internals.`);
          return;
        }
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => setupState[key],
          set: NOOP
        });
      }
    });
  }
  function createDuplicateChecker() {
    const cache = /* @__PURE__ */ Object.create(null);
    return (type, key) => {
      if (cache[key]) {
        warn2(`${type} property "${key}" is already defined in ${cache[key]}.`);
      } else {
        cache[key] = type;
      }
    };
  }
  var shouldCacheAccess = true;
  function applyOptions(instance) {
    const options = resolveMergedOptions(instance);
    const publicThis = instance.proxy;
    const ctx = instance.ctx;
    shouldCacheAccess = false;
    if (options.beforeCreate) {
      callHook(options.beforeCreate, instance, "bc");
    }
    const {
      data: dataOptions,
      computed: computedOptions,
      methods,
      watch: watchOptions,
      provide: provideOptions,
      inject: injectOptions,
      created,
      beforeMount,
      mounted: mounted7,
      beforeUpdate,
      updated: updated3,
      activated,
      deactivated,
      beforeDestroy,
      beforeUnmount,
      destroyed,
      unmounted: unmounted7,
      render: render2,
      renderTracked,
      renderTriggered,
      errorCaptured,
      serverPrefetch,
      expose,
      inheritAttrs,
      components,
      directives,
      filters
    } = options;
    const checkDuplicateProperties = true ? createDuplicateChecker() : null;
    if (true) {
      const [propsOptions] = instance.propsOptions;
      if (propsOptions) {
        for (const key in propsOptions) {
          checkDuplicateProperties("Props", key);
        }
      }
    }
    if (injectOptions) {
      resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
    }
    if (methods) {
      for (const key in methods) {
        const methodHandler = methods[key];
        if (isFunction(methodHandler)) {
          if (true) {
            Object.defineProperty(ctx, key, {
              value: methodHandler.bind(publicThis),
              configurable: true,
              enumerable: true,
              writable: true
            });
          } else {
            ctx[key] = methodHandler.bind(publicThis);
          }
          if (true) {
            checkDuplicateProperties("Methods", key);
          }
        } else if (true) {
          warn2(`Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`);
        }
      }
    }
    if (dataOptions) {
      if (!isFunction(dataOptions)) {
        warn2(`The data option must be a function. Plain object usage is no longer supported.`);
      }
      const data = dataOptions.call(publicThis, publicThis);
      if (isPromise(data)) {
        warn2(`data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`);
      }
      if (!isObject(data)) {
        warn2(`data() should return an object.`);
      } else {
        instance.data = reactive(data);
        if (true) {
          for (const key in data) {
            checkDuplicateProperties("Data", key);
            if (!isReservedPrefix(key[0])) {
              Object.defineProperty(ctx, key, {
                configurable: true,
                enumerable: true,
                get: () => data[key],
                set: NOOP
              });
            }
          }
        }
      }
    }
    shouldCacheAccess = true;
    if (computedOptions) {
      for (const key in computedOptions) {
        const opt = computedOptions[key];
        const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
        if (get2 === NOOP) {
          warn2(`Computed property "${key}" has no getter.`);
        }
        const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : true ? () => {
          warn2(`Write operation failed: computed property "${key}" is readonly.`);
        } : NOOP;
        const c = computed2({
          get: get2,
          set: set2
        });
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => c.value,
          set: (v) => c.value = v
        });
        if (true) {
          checkDuplicateProperties("Computed", key);
        }
      }
    }
    if (watchOptions) {
      for (const key in watchOptions) {
        createWatcher(watchOptions[key], ctx, publicThis, key);
      }
    }
    if (provideOptions) {
      const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key) => {
        provide(key, provides[key]);
      });
    }
    if (created) {
      callHook(created, instance, "c");
    }
    function registerLifecycleHook(register, hook) {
      if (isArray(hook)) {
        hook.forEach((_hook) => register(_hook.bind(publicThis)));
      } else if (hook) {
        register(hook.bind(publicThis));
      }
    }
    registerLifecycleHook(onBeforeMount, beforeMount);
    registerLifecycleHook(onMounted, mounted7);
    registerLifecycleHook(onBeforeUpdate, beforeUpdate);
    registerLifecycleHook(onUpdated, updated3);
    registerLifecycleHook(onActivated, activated);
    registerLifecycleHook(onDeactivated, deactivated);
    registerLifecycleHook(onErrorCaptured, errorCaptured);
    registerLifecycleHook(onRenderTracked, renderTracked);
    registerLifecycleHook(onRenderTriggered, renderTriggered);
    registerLifecycleHook(onBeforeUnmount, beforeUnmount);
    registerLifecycleHook(onUnmounted, unmounted7);
    registerLifecycleHook(onServerPrefetch, serverPrefetch);
    if (isArray(expose)) {
      if (expose.length) {
        const exposed = instance.exposed || (instance.exposed = {});
        expose.forEach((key) => {
          Object.defineProperty(exposed, key, {
            get: () => publicThis[key],
            set: (val) => publicThis[key] = val
          });
        });
      } else if (!instance.exposed) {
        instance.exposed = {};
      }
    }
    if (render2 && instance.render === NOOP) {
      instance.render = render2;
    }
    if (inheritAttrs != null) {
      instance.inheritAttrs = inheritAttrs;
    }
    if (components)
      instance.components = components;
    if (directives)
      instance.directives = directives;
  }
  function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP, unwrapRef = false) {
    if (isArray(injectOptions)) {
      injectOptions = normalizeInject(injectOptions);
    }
    for (const key in injectOptions) {
      const opt = injectOptions[key];
      let injected;
      if (isObject(opt)) {
        if ("default" in opt) {
          injected = inject(opt.from || key, opt.default, true);
        } else {
          injected = inject(opt.from || key);
        }
      } else {
        injected = inject(opt);
      }
      if (isRef(injected)) {
        if (unwrapRef) {
          Object.defineProperty(ctx, key, {
            enumerable: true,
            configurable: true,
            get: () => injected.value,
            set: (v) => injected.value = v
          });
        } else {
          if (true) {
            warn2(`injected property "${key}" is a ref and will be auto-unwrapped and no longer needs \`.value\` in the next minor release. To opt-in to the new behavior now, set \`app.config.unwrapInjectedRef = true\` (this config is temporary and will not be needed in the future.)`);
          }
          ctx[key] = injected;
        }
      } else {
        ctx[key] = injected;
      }
      if (true) {
        checkDuplicateProperties("Inject", key);
      }
    }
  }
  function callHook(hook, instance, type) {
    callWithAsyncErrorHandling(isArray(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
  }
  function createWatcher(raw, ctx, publicThis, key) {
    const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
    if (isString(raw)) {
      const handler = ctx[raw];
      if (isFunction(handler)) {
        watch(getter, handler);
      } else if (true) {
        warn2(`Invalid watch handler specified by key "${raw}"`, handler);
      }
    } else if (isFunction(raw)) {
      watch(getter, raw.bind(publicThis));
    } else if (isObject(raw)) {
      if (isArray(raw)) {
        raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
      } else {
        const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
        if (isFunction(handler)) {
          watch(getter, handler, raw);
        } else if (true) {
          warn2(`Invalid watch handler specified by key "${raw.handler}"`, handler);
        }
      }
    } else if (true) {
      warn2(`Invalid watch option: "${key}"`, raw);
    }
  }
  function resolveMergedOptions(instance) {
    const base = instance.type;
    const { mixins, extends: extendsOptions } = base;
    const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
    const cached = cache.get(base);
    let resolved;
    if (cached) {
      resolved = cached;
    } else if (!globalMixins.length && !mixins && !extendsOptions) {
      {
        resolved = base;
      }
    } else {
      resolved = {};
      if (globalMixins.length) {
        globalMixins.forEach((m) => mergeOptions(resolved, m, optionMergeStrategies, true));
      }
      mergeOptions(resolved, base, optionMergeStrategies);
    }
    cache.set(base, resolved);
    return resolved;
  }
  function mergeOptions(to, from, strats, asMixin = false) {
    const { mixins, extends: extendsOptions } = from;
    if (extendsOptions) {
      mergeOptions(to, extendsOptions, strats, true);
    }
    if (mixins) {
      mixins.forEach((m) => mergeOptions(to, m, strats, true));
    }
    for (const key in from) {
      if (asMixin && key === "expose") {
        warn2(`"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`);
      } else {
        const strat = internalOptionMergeStrats[key] || strats && strats[key];
        to[key] = strat ? strat(to[key], from[key]) : from[key];
      }
    }
    return to;
  }
  var internalOptionMergeStrats = {
    data: mergeDataFn,
    props: mergeObjectOptions,
    emits: mergeObjectOptions,
    methods: mergeObjectOptions,
    computed: mergeObjectOptions,
    beforeCreate: mergeAsArray,
    created: mergeAsArray,
    beforeMount: mergeAsArray,
    mounted: mergeAsArray,
    beforeUpdate: mergeAsArray,
    updated: mergeAsArray,
    beforeDestroy: mergeAsArray,
    beforeUnmount: mergeAsArray,
    destroyed: mergeAsArray,
    unmounted: mergeAsArray,
    activated: mergeAsArray,
    deactivated: mergeAsArray,
    errorCaptured: mergeAsArray,
    serverPrefetch: mergeAsArray,
    components: mergeObjectOptions,
    directives: mergeObjectOptions,
    watch: mergeWatchOptions,
    provide: mergeDataFn,
    inject: mergeInject
  };
  function mergeDataFn(to, from) {
    if (!from) {
      return to;
    }
    if (!to) {
      return from;
    }
    return function mergedDataFn() {
      return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
    };
  }
  function mergeInject(to, from) {
    return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
  }
  function normalizeInject(raw) {
    if (isArray(raw)) {
      const res = {};
      for (let i = 0; i < raw.length; i++) {
        res[raw[i]] = raw[i];
      }
      return res;
    }
    return raw;
  }
  function mergeAsArray(to, from) {
    return to ? [...new Set([].concat(to, from))] : from;
  }
  function mergeObjectOptions(to, from) {
    return to ? extend(extend(/* @__PURE__ */ Object.create(null), to), from) : from;
  }
  function mergeWatchOptions(to, from) {
    if (!to)
      return from;
    if (!from)
      return to;
    const merged = extend(/* @__PURE__ */ Object.create(null), to);
    for (const key in from) {
      merged[key] = mergeAsArray(to[key], from[key]);
    }
    return merged;
  }
  function initProps(instance, rawProps, isStateful, isSSR = false) {
    const props = {};
    const attrs = {};
    def(attrs, InternalObjectKey, 1);
    instance.propsDefaults = /* @__PURE__ */ Object.create(null);
    setFullProps(instance, rawProps, props, attrs);
    for (const key in instance.propsOptions[0]) {
      if (!(key in props)) {
        props[key] = void 0;
      }
    }
    if (true) {
      validateProps(rawProps || {}, props, instance);
    }
    if (isStateful) {
      instance.props = isSSR ? props : shallowReactive(props);
    } else {
      if (!instance.type.props) {
        instance.props = attrs;
      } else {
        instance.props = props;
      }
    }
    instance.attrs = attrs;
  }
  function updateProps(instance, rawProps, rawPrevProps, optimized) {
    const { props, attrs, vnode: { patchFlag } } = instance;
    const rawCurrentProps = toRaw(props);
    const [options] = instance.propsOptions;
    let hasAttrsChanged = false;
    if (!(instance.type.__hmrId || instance.parent && instance.parent.type.__hmrId) && (optimized || patchFlag > 0) && !(patchFlag & 16)) {
      if (patchFlag & 8) {
        const propsToUpdate = instance.vnode.dynamicProps;
        for (let i = 0; i < propsToUpdate.length; i++) {
          let key = propsToUpdate[i];
          if (isEmitListener(instance.emitsOptions, key)) {
            continue;
          }
          const value = rawProps[key];
          if (options) {
            if (hasOwn(attrs, key)) {
              if (value !== attrs[key]) {
                attrs[key] = value;
                hasAttrsChanged = true;
              }
            } else {
              const camelizedKey = camelize(key);
              props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false);
            }
          } else {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          }
        }
      }
    } else {
      if (setFullProps(instance, rawProps, props, attrs)) {
        hasAttrsChanged = true;
      }
      let kebabKey;
      for (const key in rawCurrentProps) {
        if (!rawProps || !hasOwn(rawProps, key) && ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
          if (options) {
            if (rawPrevProps && (rawPrevProps[key] !== void 0 || rawPrevProps[kebabKey] !== void 0)) {
              props[key] = resolvePropValue(options, rawCurrentProps, key, void 0, instance, true);
            }
          } else {
            delete props[key];
          }
        }
      }
      if (attrs !== rawCurrentProps) {
        for (const key in attrs) {
          if (!rawProps || !hasOwn(rawProps, key) && true) {
            delete attrs[key];
            hasAttrsChanged = true;
          }
        }
      }
    }
    if (hasAttrsChanged) {
      trigger(instance, "set", "$attrs");
    }
    if (true) {
      validateProps(rawProps || {}, props, instance);
    }
  }
  function setFullProps(instance, rawProps, props, attrs) {
    const [options, needCastKeys] = instance.propsOptions;
    let hasAttrsChanged = false;
    let rawCastValues;
    if (rawProps) {
      for (let key in rawProps) {
        if (isReservedProp(key)) {
          continue;
        }
        const value = rawProps[key];
        let camelKey;
        if (options && hasOwn(options, camelKey = camelize(key))) {
          if (!needCastKeys || !needCastKeys.includes(camelKey)) {
            props[camelKey] = value;
          } else {
            (rawCastValues || (rawCastValues = {}))[camelKey] = value;
          }
        } else if (!isEmitListener(instance.emitsOptions, key)) {
          if (!(key in attrs) || value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
    if (needCastKeys) {
      const rawCurrentProps = toRaw(props);
      const castValues = rawCastValues || EMPTY_OBJ;
      for (let i = 0; i < needCastKeys.length; i++) {
        const key = needCastKeys[i];
        props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn(castValues, key));
      }
    }
    return hasAttrsChanged;
  }
  function resolvePropValue(options, props, key, value, instance, isAbsent) {
    const opt = options[key];
    if (opt != null) {
      const hasDefault = hasOwn(opt, "default");
      if (hasDefault && value === void 0) {
        const defaultValue = opt.default;
        if (opt.type !== Function && isFunction(defaultValue)) {
          const { propsDefaults } = instance;
          if (key in propsDefaults) {
            value = propsDefaults[key];
          } else {
            setCurrentInstance(instance);
            value = propsDefaults[key] = defaultValue.call(null, props);
            unsetCurrentInstance();
          }
        } else {
          value = defaultValue;
        }
      }
      if (opt[0]) {
        if (isAbsent && !hasDefault) {
          value = false;
        } else if (opt[1] && (value === "" || value === hyphenate(key))) {
          value = true;
        }
      }
    }
    return value;
  }
  function normalizePropsOptions(comp, appContext, asMixin = false) {
    const cache = appContext.propsCache;
    const cached = cache.get(comp);
    if (cached) {
      return cached;
    }
    const raw = comp.props;
    const normalized = {};
    const needCastKeys = [];
    let hasExtends = false;
    if (__VUE_OPTIONS_API__ && !isFunction(comp)) {
      const extendProps = (raw2) => {
        hasExtends = true;
        const [props, keys2] = normalizePropsOptions(raw2, appContext, true);
        extend(normalized, props);
        if (keys2)
          needCastKeys.push(...keys2);
      };
      if (!asMixin && appContext.mixins.length) {
        appContext.mixins.forEach(extendProps);
      }
      if (comp.extends) {
        extendProps(comp.extends);
      }
      if (comp.mixins) {
        comp.mixins.forEach(extendProps);
      }
    }
    if (!raw && !hasExtends) {
      cache.set(comp, EMPTY_ARR);
      return EMPTY_ARR;
    }
    if (isArray(raw)) {
      for (let i = 0; i < raw.length; i++) {
        if (!isString(raw[i])) {
          warn2(`props must be strings when using array syntax.`, raw[i]);
        }
        const normalizedKey = camelize(raw[i]);
        if (validatePropName(normalizedKey)) {
          normalized[normalizedKey] = EMPTY_OBJ;
        }
      }
    } else if (raw) {
      if (!isObject(raw)) {
        warn2(`invalid props options`, raw);
      }
      for (const key in raw) {
        const normalizedKey = camelize(key);
        if (validatePropName(normalizedKey)) {
          const opt = raw[key];
          const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : opt;
          if (prop) {
            const booleanIndex = getTypeIndex(Boolean, prop.type);
            const stringIndex = getTypeIndex(String, prop.type);
            prop[0] = booleanIndex > -1;
            prop[1] = stringIndex < 0 || booleanIndex < stringIndex;
            if (booleanIndex > -1 || hasOwn(prop, "default")) {
              needCastKeys.push(normalizedKey);
            }
          }
        }
      }
    }
    const res = [normalized, needCastKeys];
    cache.set(comp, res);
    return res;
  }
  function validatePropName(key) {
    if (key[0] !== "$") {
      return true;
    } else if (true) {
      warn2(`Invalid prop name: "${key}" is a reserved property.`);
    }
    return false;
  }
  function getType(ctor) {
    const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
    return match ? match[1] : ctor === null ? "null" : "";
  }
  function isSameType(a, b) {
    return getType(a) === getType(b);
  }
  function getTypeIndex(type, expectedTypes) {
    if (isArray(expectedTypes)) {
      return expectedTypes.findIndex((t) => isSameType(t, type));
    } else if (isFunction(expectedTypes)) {
      return isSameType(expectedTypes, type) ? 0 : -1;
    }
    return -1;
  }
  function validateProps(rawProps, props, instance) {
    const resolvedValues = toRaw(props);
    const options = instance.propsOptions[0];
    for (const key in options) {
      let opt = options[key];
      if (opt == null)
        continue;
      validateProp(key, resolvedValues[key], opt, !hasOwn(rawProps, key) && !hasOwn(rawProps, hyphenate(key)));
    }
  }
  function validateProp(name, value, prop, isAbsent) {
    const { type, required, validator } = prop;
    if (required && isAbsent) {
      warn2('Missing required prop: "' + name + '"');
      return;
    }
    if (value == null && !prop.required) {
      return;
    }
    if (type != null && type !== true) {
      let isValid = false;
      const types = isArray(type) ? type : [type];
      const expectedTypes = [];
      for (let i = 0; i < types.length && !isValid; i++) {
        const { valid, expectedType } = assertType(value, types[i]);
        expectedTypes.push(expectedType || "");
        isValid = valid;
      }
      if (!isValid) {
        warn2(getInvalidTypeMessage(name, value, expectedTypes));
        return;
      }
    }
    if (validator && !validator(value)) {
      warn2('Invalid prop: custom validator check failed for prop "' + name + '".');
    }
  }
  var isSimpleType = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol,BigInt");
  function assertType(value, type) {
    let valid;
    const expectedType = getType(type);
    if (isSimpleType(expectedType)) {
      const t = typeof value;
      valid = t === expectedType.toLowerCase();
      if (!valid && t === "object") {
        valid = value instanceof type;
      }
    } else if (expectedType === "Object") {
      valid = isObject(value);
    } else if (expectedType === "Array") {
      valid = isArray(value);
    } else if (expectedType === "null") {
      valid = value === null;
    } else {
      valid = value instanceof type;
    }
    return {
      valid,
      expectedType
    };
  }
  function getInvalidTypeMessage(name, value, expectedTypes) {
    let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
    const expectedType = expectedTypes[0];
    const receivedType = toRawType(value);
    const expectedValue = styleValue(value, expectedType);
    const receivedValue = styleValue(value, receivedType);
    if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
      message += ` with value ${expectedValue}`;
    }
    message += `, got ${receivedType} `;
    if (isExplicable(receivedType)) {
      message += `with value ${receivedValue}.`;
    }
    return message;
  }
  function styleValue(value, type) {
    if (type === "String") {
      return `"${value}"`;
    } else if (type === "Number") {
      return `${Number(value)}`;
    } else {
      return `${value}`;
    }
  }
  function isExplicable(type) {
    const explicitTypes = ["string", "number", "boolean"];
    return explicitTypes.some((elem) => type.toLowerCase() === elem);
  }
  function isBoolean(...args) {
    return args.some((elem) => elem.toLowerCase() === "boolean");
  }
  var isInternalKey = (key) => key[0] === "_" || key === "$stable";
  var normalizeSlotValue = (value) => isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
  var normalizeSlot = (key, rawSlot, ctx) => {
    if (rawSlot._n) {
      return rawSlot;
    }
    const normalized = withCtx((...args) => {
      if (currentInstance) {
        warn2(`Slot "${key}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`);
      }
      return normalizeSlotValue(rawSlot(...args));
    }, ctx);
    normalized._c = false;
    return normalized;
  };
  var normalizeObjectSlots = (rawSlots, slots, instance) => {
    const ctx = rawSlots._ctx;
    for (const key in rawSlots) {
      if (isInternalKey(key))
        continue;
      const value = rawSlots[key];
      if (isFunction(value)) {
        slots[key] = normalizeSlot(key, value, ctx);
      } else if (value != null) {
        if (true) {
          warn2(`Non-function value encountered for slot "${key}". Prefer function slots for better performance.`);
        }
        const normalized = normalizeSlotValue(value);
        slots[key] = () => normalized;
      }
    }
  };
  var normalizeVNodeSlots = (instance, children) => {
    if (!isKeepAlive(instance.vnode) && true) {
      warn2(`Non-function value encountered for default slot. Prefer function slots for better performance.`);
    }
    const normalized = normalizeSlotValue(children);
    instance.slots.default = () => normalized;
  };
  var initSlots = (instance, children) => {
    if (instance.vnode.shapeFlag & 32) {
      const type = children._;
      if (type) {
        instance.slots = toRaw(children);
        def(children, "_", type);
      } else {
        normalizeObjectSlots(children, instance.slots = {});
      }
    } else {
      instance.slots = {};
      if (children) {
        normalizeVNodeSlots(instance, children);
      }
    }
    def(instance.slots, InternalObjectKey, 1);
  };
  var updateSlots = (instance, children, optimized) => {
    const { vnode, slots } = instance;
    let needDeletionCheck = true;
    let deletionComparisonTarget = EMPTY_OBJ;
    if (vnode.shapeFlag & 32) {
      const type = children._;
      if (type) {
        if (isHmrUpdating) {
          extend(slots, children);
        } else if (optimized && type === 1) {
          needDeletionCheck = false;
        } else {
          extend(slots, children);
          if (!optimized && type === 1) {
            delete slots._;
          }
        }
      } else {
        needDeletionCheck = !children.$stable;
        normalizeObjectSlots(children, slots);
      }
      deletionComparisonTarget = children;
    } else if (children) {
      normalizeVNodeSlots(instance, children);
      deletionComparisonTarget = { default: 1 };
    }
    if (needDeletionCheck) {
      for (const key in slots) {
        if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
          delete slots[key];
        }
      }
    }
  };
  function createAppContext() {
    return {
      app: null,
      config: {
        isNativeTag: NO,
        performance: false,
        globalProperties: {},
        optionMergeStrategies: {},
        errorHandler: void 0,
        warnHandler: void 0,
        compilerOptions: {}
      },
      mixins: [],
      components: {},
      directives: {},
      provides: /* @__PURE__ */ Object.create(null),
      optionsCache: /* @__PURE__ */ new WeakMap(),
      propsCache: /* @__PURE__ */ new WeakMap(),
      emitsCache: /* @__PURE__ */ new WeakMap()
    };
  }
  var uid = 0;
  function createAppAPI(render2, hydrate) {
    return function createApp2(rootComponent, rootProps = null) {
      if (!isFunction(rootComponent)) {
        rootComponent = Object.assign({}, rootComponent);
      }
      if (rootProps != null && !isObject(rootProps)) {
        warn2(`root props passed to app.mount() must be an object.`);
        rootProps = null;
      }
      const context = createAppContext();
      const installedPlugins = /* @__PURE__ */ new Set();
      let isMounted = false;
      const app2 = context.app = {
        _uid: uid++,
        _component: rootComponent,
        _props: rootProps,
        _container: null,
        _context: context,
        _instance: null,
        version,
        get config() {
          return context.config;
        },
        set config(v) {
          if (true) {
            warn2(`app.config cannot be replaced. Modify individual options instead.`);
          }
        },
        use(plugin, ...options) {
          if (installedPlugins.has(plugin)) {
            warn2(`Plugin has already been applied to target app.`);
          } else if (plugin && isFunction(plugin.install)) {
            installedPlugins.add(plugin);
            plugin.install(app2, ...options);
          } else if (isFunction(plugin)) {
            installedPlugins.add(plugin);
            plugin(app2, ...options);
          } else if (true) {
            warn2(`A plugin must either be a function or an object with an "install" function.`);
          }
          return app2;
        },
        mixin(mixin) {
          if (__VUE_OPTIONS_API__) {
            if (!context.mixins.includes(mixin)) {
              context.mixins.push(mixin);
            } else if (true) {
              warn2("Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : ""));
            }
          } else if (true) {
            warn2("Mixins are only available in builds supporting Options API");
          }
          return app2;
        },
        component(name, component) {
          if (true) {
            validateComponentName(name, context.config);
          }
          if (!component) {
            return context.components[name];
          }
          if (context.components[name]) {
            warn2(`Component "${name}" has already been registered in target app.`);
          }
          context.components[name] = component;
          return app2;
        },
        directive(name, directive2) {
          if (true) {
            validateDirectiveName(name);
          }
          if (!directive2) {
            return context.directives[name];
          }
          if (context.directives[name]) {
            warn2(`Directive "${name}" has already been registered in target app.`);
          }
          context.directives[name] = directive2;
          return app2;
        },
        mount(rootContainer, isHydrate, isSVG) {
          if (!isMounted) {
            if (rootContainer.__vue_app__) {
              warn2(`There is already an app instance mounted on the host container.
 If you want to mount another app on the same host container, you need to unmount the previous app by calling \`app.unmount()\` first.`);
            }
            const vnode = createVNode(rootComponent, rootProps);
            vnode.appContext = context;
            if (true) {
              context.reload = () => {
                render2(cloneVNode(vnode), rootContainer, isSVG);
              };
            }
            if (isHydrate && hydrate) {
              hydrate(vnode, rootContainer);
            } else {
              render2(vnode, rootContainer, isSVG);
            }
            isMounted = true;
            app2._container = rootContainer;
            rootContainer.__vue_app__ = app2;
            if (true) {
              app2._instance = vnode.component;
              devtoolsInitApp(app2, version);
            }
            return getExposeProxy(vnode.component) || vnode.component.proxy;
          } else if (true) {
            warn2(`App has already been mounted.
If you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. \`const createMyApp = () => createApp(App)\``);
          }
        },
        unmount() {
          if (isMounted) {
            render2(null, app2._container);
            if (true) {
              app2._instance = null;
              devtoolsUnmountApp(app2);
            }
            delete app2._container.__vue_app__;
          } else if (true) {
            warn2(`Cannot unmount an app that is not mounted.`);
          }
        },
        provide(key, value) {
          if (key in context.provides) {
            warn2(`App already provides property with key "${String(key)}". It will be overwritten with the new value.`);
          }
          context.provides[key] = value;
          return app2;
        }
      };
      return app2;
    };
  }
  function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
    if (isArray(rawRef)) {
      rawRef.forEach((r, i) => setRef(r, oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount));
      return;
    }
    if (isAsyncWrapper(vnode) && !isUnmount) {
      return;
    }
    const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
    const value = isUnmount ? null : refValue;
    const { i: owner, r: ref2 } = rawRef;
    if (!owner) {
      warn2(`Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function.`);
      return;
    }
    const oldRef = oldRawRef && oldRawRef.r;
    const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
    const setupState = owner.setupState;
    if (oldRef != null && oldRef !== ref2) {
      if (isString(oldRef)) {
        refs[oldRef] = null;
        if (hasOwn(setupState, oldRef)) {
          setupState[oldRef] = null;
        }
      } else if (isRef(oldRef)) {
        oldRef.value = null;
      }
    }
    if (isFunction(ref2)) {
      callWithErrorHandling(ref2, owner, 12, [value, refs]);
    } else {
      const _isString = isString(ref2);
      const _isRef = isRef(ref2);
      if (_isString || _isRef) {
        const doSet = () => {
          if (rawRef.f) {
            const existing = _isString ? refs[ref2] : ref2.value;
            if (isUnmount) {
              isArray(existing) && remove(existing, refValue);
            } else {
              if (!isArray(existing)) {
                if (_isString) {
                  refs[ref2] = [refValue];
                  if (hasOwn(setupState, ref2)) {
                    setupState[ref2] = refs[ref2];
                  }
                } else {
                  ref2.value = [refValue];
                  if (rawRef.k)
                    refs[rawRef.k] = ref2.value;
                }
              } else if (!existing.includes(refValue)) {
                existing.push(refValue);
              }
            }
          } else if (_isString) {
            refs[ref2] = value;
            if (hasOwn(setupState, ref2)) {
              setupState[ref2] = value;
            }
          } else if (_isRef) {
            ref2.value = value;
            if (rawRef.k)
              refs[rawRef.k] = value;
          } else if (true) {
            warn2("Invalid template ref type:", ref2, `(${typeof ref2})`);
          }
        };
        if (value) {
          doSet.id = -1;
          queuePostRenderEffect(doSet, parentSuspense);
        } else {
          doSet();
        }
      } else if (true) {
        warn2("Invalid template ref type:", ref2, `(${typeof ref2})`);
      }
    }
  }
  var supported;
  var perf;
  function startMeasure(instance, type) {
    if (instance.appContext.config.performance && isSupported()) {
      perf.mark(`vue-${type}-${instance.uid}`);
    }
    if (true) {
      devtoolsPerfStart(instance, type, isSupported() ? perf.now() : Date.now());
    }
  }
  function endMeasure(instance, type) {
    if (instance.appContext.config.performance && isSupported()) {
      const startTag = `vue-${type}-${instance.uid}`;
      const endTag = startTag + `:end`;
      perf.mark(endTag);
      perf.measure(`<${formatComponentName(instance, instance.type)}> ${type}`, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
    }
    if (true) {
      devtoolsPerfEnd(instance, type, isSupported() ? perf.now() : Date.now());
    }
  }
  function isSupported() {
    if (supported !== void 0) {
      return supported;
    }
    if (typeof window !== "undefined" && window.performance) {
      supported = true;
      perf = window.performance;
    } else {
      supported = false;
    }
    return supported;
  }
  function initFeatureFlags() {
    const needWarn = [];
    if (typeof __VUE_OPTIONS_API__ !== "boolean") {
      needWarn.push(`__VUE_OPTIONS_API__`);
      getGlobalThis().__VUE_OPTIONS_API__ = true;
    }
    if (typeof __VUE_PROD_DEVTOOLS__ !== "boolean") {
      needWarn.push(`__VUE_PROD_DEVTOOLS__`);
      getGlobalThis().__VUE_PROD_DEVTOOLS__ = false;
    }
    if (needWarn.length) {
      const multi = needWarn.length > 1;
      console.warn(`Feature flag${multi ? `s` : ``} ${needWarn.join(", ")} ${multi ? `are` : `is`} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`);
    }
  }
  var queuePostRenderEffect = queueEffectWithSuspense;
  function createRenderer(options) {
    return baseCreateRenderer(options);
  }
  function baseCreateRenderer(options, createHydrationFns) {
    {
      initFeatureFlags();
    }
    const target = getGlobalThis();
    target.__VUE__ = true;
    if (true) {
      setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
    }
    const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = NOOP, cloneNode: hostCloneNode, insertStaticContent: hostInsertStaticContent } = options;
    const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = isHmrUpdating ? false : !!n2.dynamicChildren) => {
      if (n1 === n2) {
        return;
      }
      if (n1 && !isSameVNodeType(n1, n2)) {
        anchor = getNextHostNode(n1);
        unmount(n1, parentComponent, parentSuspense, true);
        n1 = null;
      }
      if (n2.patchFlag === -2) {
        optimized = false;
        n2.dynamicChildren = null;
      }
      const { type, ref: ref2, shapeFlag } = n2;
      switch (type) {
        case Text:
          processText(n1, n2, container, anchor);
          break;
        case Comment:
          processCommentNode(n1, n2, container, anchor);
          break;
        case Static:
          if (n1 == null) {
            mountStaticNode(n2, container, anchor, isSVG);
          } else if (true) {
            patchStaticNode(n1, n2, container, isSVG);
          }
          break;
        case Fragment:
          processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          break;
        default:
          if (shapeFlag & 1) {
            processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          } else if (shapeFlag & 6) {
            processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          } else if (shapeFlag & 64) {
            type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
          } else if (shapeFlag & 128) {
            type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
          } else if (true) {
            warn2("Invalid VNode type:", type, `(${typeof type})`);
          }
      }
      if (ref2 != null && parentComponent) {
        setRef(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
      }
    };
    const processText = (n1, n2, container, anchor) => {
      if (n1 == null) {
        hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
      } else {
        const el = n2.el = n1.el;
        if (n2.children !== n1.children) {
          hostSetText(el, n2.children);
        }
      }
    };
    const processCommentNode = (n1, n2, container, anchor) => {
      if (n1 == null) {
        hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
      } else {
        n2.el = n1.el;
      }
    };
    const mountStaticNode = (n2, container, anchor, isSVG) => {
      [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG, n2.el, n2.anchor);
    };
    const patchStaticNode = (n1, n2, container, isSVG) => {
      if (n2.children !== n1.children) {
        const anchor = hostNextSibling(n1.anchor);
        removeStaticNode(n1);
        [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG);
      } else {
        n2.el = n1.el;
        n2.anchor = n1.anchor;
      }
    };
    const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
      let next;
      while (el && el !== anchor) {
        next = hostNextSibling(el);
        hostInsert(el, container, nextSibling);
        el = next;
      }
      hostInsert(anchor, container, nextSibling);
    };
    const removeStaticNode = ({ el, anchor }) => {
      let next;
      while (el && el !== anchor) {
        next = hostNextSibling(el);
        hostRemove(el);
        el = next;
      }
      hostRemove(anchor);
    };
    const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      isSVG = isSVG || n2.type === "svg";
      if (n1 == null) {
        mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        patchElement(n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
    };
    const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      let el;
      let vnodeHook;
      const { type, props, shapeFlag, transition, patchFlag, dirs } = vnode;
      if (false) {
        el = vnode.el = hostCloneNode(vnode.el);
      } else {
        el = vnode.el = hostCreateElement(vnode.type, isSVG, props && props.is, props);
        if (shapeFlag & 8) {
          hostSetElementText(el, vnode.children);
        } else if (shapeFlag & 16) {
          mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== "foreignObject", slotScopeIds, optimized);
        }
        if (dirs) {
          invokeDirectiveHook(vnode, null, parentComponent, "created");
        }
        if (props) {
          for (const key in props) {
            if (key !== "value" && !isReservedProp(key)) {
              hostPatchProp(el, key, null, props[key], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
            }
          }
          if ("value" in props) {
            hostPatchProp(el, "value", null, props.value);
          }
          if (vnodeHook = props.onVnodeBeforeMount) {
            invokeVNodeHook(vnodeHook, parentComponent, vnode);
          }
        }
        setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
      }
      if (true) {
        Object.defineProperty(el, "__vnode", {
          value: vnode,
          enumerable: false
        });
        Object.defineProperty(el, "__vueParentComponent", {
          value: parentComponent,
          enumerable: false
        });
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
      }
      const needCallTransitionHooks = (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
      if (needCallTransitionHooks) {
        transition.beforeEnter(el);
      }
      hostInsert(el, container, anchor);
      if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
          needCallTransitionHooks && transition.enter(el);
          dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
        }, parentSuspense);
      }
    };
    const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
      if (scopeId) {
        hostSetScopeId(el, scopeId);
      }
      if (slotScopeIds) {
        for (let i = 0; i < slotScopeIds.length; i++) {
          hostSetScopeId(el, slotScopeIds[i]);
        }
      }
      if (parentComponent) {
        let subTree = parentComponent.subTree;
        if (subTree.patchFlag > 0 && subTree.patchFlag & 2048) {
          subTree = filterSingleRoot(subTree.children) || subTree;
        }
        if (vnode === subTree) {
          const parentVNode = parentComponent.vnode;
          setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
        }
      }
    };
    const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start = 0) => {
      for (let i = start; i < children.length; i++) {
        const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
        patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
    };
    const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      const el = n2.el = n1.el;
      let { patchFlag, dynamicChildren, dirs } = n2;
      patchFlag |= n1.patchFlag & 16;
      const oldProps = n1.props || EMPTY_OBJ;
      const newProps = n2.props || EMPTY_OBJ;
      let vnodeHook;
      parentComponent && toggleRecurse(parentComponent, false);
      if (vnodeHook = newProps.onVnodeBeforeUpdate) {
        invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
      }
      if (dirs) {
        invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
      }
      parentComponent && toggleRecurse(parentComponent, true);
      if (isHmrUpdating) {
        patchFlag = 0;
        optimized = false;
        dynamicChildren = null;
      }
      const areChildrenSVG = isSVG && n2.type !== "foreignObject";
      if (dynamicChildren) {
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds);
        if (parentComponent && parentComponent.type.__hmrId) {
          traverseStaticChildren(n1, n2);
        }
      } else if (!optimized) {
        patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds, false);
      }
      if (patchFlag > 0) {
        if (patchFlag & 16) {
          patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
        } else {
          if (patchFlag & 2) {
            if (oldProps.class !== newProps.class) {
              hostPatchProp(el, "class", null, newProps.class, isSVG);
            }
          }
          if (patchFlag & 4) {
            hostPatchProp(el, "style", oldProps.style, newProps.style, isSVG);
          }
          if (patchFlag & 8) {
            const propsToUpdate = n2.dynamicProps;
            for (let i = 0; i < propsToUpdate.length; i++) {
              const key = propsToUpdate[i];
              const prev = oldProps[key];
              const next = newProps[key];
              if (next !== prev || key === "value") {
                hostPatchProp(el, key, prev, next, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
              }
            }
          }
        }
        if (patchFlag & 1) {
          if (n1.children !== n2.children) {
            hostSetElementText(el, n2.children);
          }
        }
      } else if (!optimized && dynamicChildren == null) {
        patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
      }
      if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
          dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
        }, parentSuspense);
      }
    };
    const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
      for (let i = 0; i < newChildren.length; i++) {
        const oldVNode = oldChildren[i];
        const newVNode = newChildren[i];
        const container = oldVNode.el && (oldVNode.type === Fragment || !isSameVNodeType(oldVNode, newVNode) || oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : fallbackContainer;
        patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, true);
      }
    };
    const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
      if (oldProps !== newProps) {
        for (const key in newProps) {
          if (isReservedProp(key))
            continue;
          const next = newProps[key];
          const prev = oldProps[key];
          if (next !== prev && key !== "value") {
            hostPatchProp(el, key, prev, next, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
        if (oldProps !== EMPTY_OBJ) {
          for (const key in oldProps) {
            if (!isReservedProp(key) && !(key in newProps)) {
              hostPatchProp(el, key, oldProps[key], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
            }
          }
        }
        if ("value" in newProps) {
          hostPatchProp(el, "value", oldProps.value, newProps.value);
        }
      }
    };
    const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
      const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
      let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
      if (isHmrUpdating || patchFlag & 2048) {
        patchFlag = 0;
        optimized = false;
        dynamicChildren = null;
      }
      if (fragmentSlotScopeIds) {
        slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
      }
      if (n1 == null) {
        hostInsert(fragmentStartAnchor, container, anchor);
        hostInsert(fragmentEndAnchor, container, anchor);
        mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && n1.dynamicChildren) {
          patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG, slotScopeIds);
          if (parentComponent && parentComponent.type.__hmrId) {
            traverseStaticChildren(n1, n2);
          } else if (n2.key != null || parentComponent && n2 === parentComponent.subTree) {
            traverseStaticChildren(n1, n2, true);
          }
        } else {
          patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      }
    };
    const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      n2.slotScopeIds = slotScopeIds;
      if (n1 == null) {
        if (n2.shapeFlag & 512) {
          parentComponent.ctx.activate(n2, container, anchor, isSVG, optimized);
        } else {
          mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
        }
      } else {
        updateComponent(n1, n2, optimized);
      }
    };
    const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
      const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
      if (instance.type.__hmrId) {
        registerHMR(instance);
      }
      if (true) {
        pushWarningContext(initialVNode);
        startMeasure(instance, `mount`);
      }
      if (isKeepAlive(initialVNode)) {
        instance.ctx.renderer = internals;
      }
      {
        if (true) {
          startMeasure(instance, `init`);
        }
        setupComponent(instance);
        if (true) {
          endMeasure(instance, `init`);
        }
      }
      if (instance.asyncDep) {
        parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
        if (!initialVNode.el) {
          const placeholder = instance.subTree = createVNode(Comment);
          processCommentNode(null, placeholder, container, anchor);
        }
        return;
      }
      setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);
      if (true) {
        popWarningContext();
        endMeasure(instance, `mount`);
      }
    };
    const updateComponent = (n1, n2, optimized) => {
      const instance = n2.component = n1.component;
      if (shouldUpdateComponent(n1, n2, optimized)) {
        if (instance.asyncDep && !instance.asyncResolved) {
          if (true) {
            pushWarningContext(n2);
          }
          updateComponentPreRender(instance, n2, optimized);
          if (true) {
            popWarningContext();
          }
          return;
        } else {
          instance.next = n2;
          invalidateJob(instance.update);
          instance.update();
        }
      } else {
        n2.el = n1.el;
        instance.vnode = n2;
      }
    };
    const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
      const componentUpdateFn = () => {
        if (!instance.isMounted) {
          let vnodeHook;
          const { el, props } = initialVNode;
          const { bm, m, parent } = instance;
          const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
          toggleRecurse(instance, false);
          if (bm) {
            invokeArrayFns(bm);
          }
          if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
            invokeVNodeHook(vnodeHook, parent, initialVNode);
          }
          toggleRecurse(instance, true);
          if (el && hydrateNode) {
            const hydrateSubTree = () => {
              if (true) {
                startMeasure(instance, `render`);
              }
              instance.subTree = renderComponentRoot(instance);
              if (true) {
                endMeasure(instance, `render`);
              }
              if (true) {
                startMeasure(instance, `hydrate`);
              }
              hydrateNode(el, instance.subTree, instance, parentSuspense, null);
              if (true) {
                endMeasure(instance, `hydrate`);
              }
            };
            if (isAsyncWrapperVNode) {
              initialVNode.type.__asyncLoader().then(() => !instance.isUnmounted && hydrateSubTree());
            } else {
              hydrateSubTree();
            }
          } else {
            if (true) {
              startMeasure(instance, `render`);
            }
            const subTree = instance.subTree = renderComponentRoot(instance);
            if (true) {
              endMeasure(instance, `render`);
            }
            if (true) {
              startMeasure(instance, `patch`);
            }
            patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);
            if (true) {
              endMeasure(instance, `patch`);
            }
            initialVNode.el = subTree.el;
          }
          if (m) {
            queuePostRenderEffect(m, parentSuspense);
          }
          if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
            const scopedInitialVNode = initialVNode;
            queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
          }
          if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
            instance.a && queuePostRenderEffect(instance.a, parentSuspense);
          }
          instance.isMounted = true;
          if (true) {
            devtoolsComponentAdded(instance);
          }
          initialVNode = container = anchor = null;
        } else {
          let { next, bu, u, parent, vnode } = instance;
          let originNext = next;
          let vnodeHook;
          if (true) {
            pushWarningContext(next || instance.vnode);
          }
          toggleRecurse(instance, false);
          if (next) {
            next.el = vnode.el;
            updateComponentPreRender(instance, next, optimized);
          } else {
            next = vnode;
          }
          if (bu) {
            invokeArrayFns(bu);
          }
          if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
            invokeVNodeHook(vnodeHook, parent, next, vnode);
          }
          toggleRecurse(instance, true);
          if (true) {
            startMeasure(instance, `render`);
          }
          const nextTree = renderComponentRoot(instance);
          if (true) {
            endMeasure(instance, `render`);
          }
          const prevTree = instance.subTree;
          instance.subTree = nextTree;
          if (true) {
            startMeasure(instance, `patch`);
          }
          patch(prevTree, nextTree, hostParentNode(prevTree.el), getNextHostNode(prevTree), instance, parentSuspense, isSVG);
          if (true) {
            endMeasure(instance, `patch`);
          }
          next.el = nextTree.el;
          if (originNext === null) {
            updateHOCHostEl(instance, nextTree.el);
          }
          if (u) {
            queuePostRenderEffect(u, parentSuspense);
          }
          if (vnodeHook = next.props && next.props.onVnodeUpdated) {
            queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, next, vnode), parentSuspense);
          }
          if (true) {
            devtoolsComponentUpdated(instance);
          }
          if (true) {
            popWarningContext();
          }
        }
      };
      const effect2 = instance.effect = new ReactiveEffect(componentUpdateFn, () => queueJob(update), instance.scope);
      const update = instance.update = () => effect2.run();
      update.id = instance.uid;
      toggleRecurse(instance, true);
      if (true) {
        effect2.onTrack = instance.rtc ? (e) => invokeArrayFns(instance.rtc, e) : void 0;
        effect2.onTrigger = instance.rtg ? (e) => invokeArrayFns(instance.rtg, e) : void 0;
        update.ownerInstance = instance;
      }
      update();
    };
    const updateComponentPreRender = (instance, nextVNode, optimized) => {
      nextVNode.component = instance;
      const prevProps = instance.vnode.props;
      instance.vnode = nextVNode;
      instance.next = null;
      updateProps(instance, nextVNode.props, prevProps, optimized);
      updateSlots(instance, nextVNode.children, optimized);
      pauseTracking();
      flushPreFlushCbs(void 0, instance.update);
      resetTracking();
    };
    const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
      const c1 = n1 && n1.children;
      const prevShapeFlag = n1 ? n1.shapeFlag : 0;
      const c2 = n2.children;
      const { patchFlag, shapeFlag } = n2;
      if (patchFlag > 0) {
        if (patchFlag & 128) {
          patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          return;
        } else if (patchFlag & 256) {
          patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          return;
        }
      }
      if (shapeFlag & 8) {
        if (prevShapeFlag & 16) {
          unmountChildren(c1, parentComponent, parentSuspense);
        }
        if (c2 !== c1) {
          hostSetElementText(container, c2);
        }
      } else {
        if (prevShapeFlag & 16) {
          if (shapeFlag & 16) {
            patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          } else {
            unmountChildren(c1, parentComponent, parentSuspense, true);
          }
        } else {
          if (prevShapeFlag & 8) {
            hostSetElementText(container, "");
          }
          if (shapeFlag & 16) {
            mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          }
        }
      }
    };
    const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      c1 = c1 || EMPTY_ARR;
      c2 = c2 || EMPTY_ARR;
      const oldLength = c1.length;
      const newLength = c2.length;
      const commonLength = Math.min(oldLength, newLength);
      let i;
      for (i = 0; i < commonLength; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
      if (oldLength > newLength) {
        unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
      } else {
        mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, commonLength);
      }
    };
    const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      let i = 0;
      const l2 = c2.length;
      let e1 = c1.length - 1;
      let e2 = l2 - 1;
      while (i <= e1 && i <= e2) {
        const n1 = c1[i];
        const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (isSameVNodeType(n1, n2)) {
          patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          break;
        }
        i++;
      }
      while (i <= e1 && i <= e2) {
        const n1 = c1[e1];
        const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
        if (isSameVNodeType(n1, n2)) {
          patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          break;
        }
        e1--;
        e2--;
      }
      if (i > e1) {
        if (i <= e2) {
          const nextPos = e2 + 1;
          const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
          while (i <= e2) {
            patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            i++;
          }
        }
      } else if (i > e2) {
        while (i <= e1) {
          unmount(c1[i], parentComponent, parentSuspense, true);
          i++;
        }
      } else {
        const s1 = i;
        const s2 = i;
        const keyToNewIndexMap = /* @__PURE__ */ new Map();
        for (i = s2; i <= e2; i++) {
          const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
          if (nextChild.key != null) {
            if (keyToNewIndexMap.has(nextChild.key)) {
              warn2(`Duplicate keys found during update:`, JSON.stringify(nextChild.key), `Make sure keys are unique.`);
            }
            keyToNewIndexMap.set(nextChild.key, i);
          }
        }
        let j;
        let patched = 0;
        const toBePatched = e2 - s2 + 1;
        let moved = false;
        let maxNewIndexSoFar = 0;
        const newIndexToOldIndexMap = new Array(toBePatched);
        for (i = 0; i < toBePatched; i++)
          newIndexToOldIndexMap[i] = 0;
        for (i = s1; i <= e1; i++) {
          const prevChild = c1[i];
          if (patched >= toBePatched) {
            unmount(prevChild, parentComponent, parentSuspense, true);
            continue;
          }
          let newIndex;
          if (prevChild.key != null) {
            newIndex = keyToNewIndexMap.get(prevChild.key);
          } else {
            for (j = s2; j <= e2; j++) {
              if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
                newIndex = j;
                break;
              }
            }
          }
          if (newIndex === void 0) {
            unmount(prevChild, parentComponent, parentSuspense, true);
          } else {
            newIndexToOldIndexMap[newIndex - s2] = i + 1;
            if (newIndex >= maxNewIndexSoFar) {
              maxNewIndexSoFar = newIndex;
            } else {
              moved = true;
            }
            patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            patched++;
          }
        }
        const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
        j = increasingNewIndexSequence.length - 1;
        for (i = toBePatched - 1; i >= 0; i--) {
          const nextIndex = s2 + i;
          const nextChild = c2[nextIndex];
          const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
          if (newIndexToOldIndexMap[i] === 0) {
            patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          } else if (moved) {
            if (j < 0 || i !== increasingNewIndexSequence[j]) {
              move(nextChild, container, anchor, 2);
            } else {
              j--;
            }
          }
        }
      }
    };
    const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
      const { el, type, transition, children, shapeFlag } = vnode;
      if (shapeFlag & 6) {
        move(vnode.component.subTree, container, anchor, moveType);
        return;
      }
      if (shapeFlag & 128) {
        vnode.suspense.move(container, anchor, moveType);
        return;
      }
      if (shapeFlag & 64) {
        type.move(vnode, container, anchor, internals);
        return;
      }
      if (type === Fragment) {
        hostInsert(el, container, anchor);
        for (let i = 0; i < children.length; i++) {
          move(children[i], container, anchor, moveType);
        }
        hostInsert(vnode.anchor, container, anchor);
        return;
      }
      if (type === Static) {
        moveStaticNode(vnode, container, anchor);
        return;
      }
      const needTransition = moveType !== 2 && shapeFlag & 1 && transition;
      if (needTransition) {
        if (moveType === 0) {
          transition.beforeEnter(el);
          hostInsert(el, container, anchor);
          queuePostRenderEffect(() => transition.enter(el), parentSuspense);
        } else {
          const { leave, delayLeave, afterLeave } = transition;
          const remove3 = () => hostInsert(el, container, anchor);
          const performLeave = () => {
            leave(el, () => {
              remove3();
              afterLeave && afterLeave();
            });
          };
          if (delayLeave) {
            delayLeave(el, remove3, performLeave);
          } else {
            performLeave();
          }
        }
      } else {
        hostInsert(el, container, anchor);
      }
    };
    const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
      const { type, props, ref: ref2, children, dynamicChildren, shapeFlag, patchFlag, dirs } = vnode;
      if (ref2 != null) {
        setRef(ref2, null, parentSuspense, vnode, true);
      }
      if (shapeFlag & 256) {
        parentComponent.ctx.deactivate(vnode);
        return;
      }
      const shouldInvokeDirs = shapeFlag & 1 && dirs;
      const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
      let vnodeHook;
      if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
      if (shapeFlag & 6) {
        unmountComponent(vnode.component, parentSuspense, doRemove);
      } else {
        if (shapeFlag & 128) {
          vnode.suspense.unmount(parentSuspense, doRemove);
          return;
        }
        if (shouldInvokeDirs) {
          invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
        }
        if (shapeFlag & 64) {
          vnode.type.remove(vnode, parentComponent, parentSuspense, optimized, internals, doRemove);
        } else if (dynamicChildren && (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
          unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
        } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
          unmountChildren(children, parentComponent, parentSuspense);
        }
        if (doRemove) {
          remove2(vnode);
        }
      }
      if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
          shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
        }, parentSuspense);
      }
    };
    const remove2 = (vnode) => {
      const { type, el, anchor, transition } = vnode;
      if (type === Fragment) {
        if (vnode.patchFlag > 0 && vnode.patchFlag & 2048 && transition && !transition.persisted) {
          vnode.children.forEach((child) => {
            if (child.type === Comment) {
              hostRemove(child.el);
            } else {
              remove2(child);
            }
          });
        } else {
          removeFragment(el, anchor);
        }
        return;
      }
      if (type === Static) {
        removeStaticNode(vnode);
        return;
      }
      const performRemove = () => {
        hostRemove(el);
        if (transition && !transition.persisted && transition.afterLeave) {
          transition.afterLeave();
        }
      };
      if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
        const { leave, delayLeave } = transition;
        const performLeave = () => leave(el, performRemove);
        if (delayLeave) {
          delayLeave(vnode.el, performRemove, performLeave);
        } else {
          performLeave();
        }
      } else {
        performRemove();
      }
    };
    const removeFragment = (cur, end) => {
      let next;
      while (cur !== end) {
        next = hostNextSibling(cur);
        hostRemove(cur);
        cur = next;
      }
      hostRemove(end);
    };
    const unmountComponent = (instance, parentSuspense, doRemove) => {
      if (instance.type.__hmrId) {
        unregisterHMR(instance);
      }
      const { bum, scope, update, subTree, um } = instance;
      if (bum) {
        invokeArrayFns(bum);
      }
      scope.stop();
      if (update) {
        update.active = false;
        unmount(subTree, instance, parentSuspense, doRemove);
      }
      if (um) {
        queuePostRenderEffect(um, parentSuspense);
      }
      queuePostRenderEffect(() => {
        instance.isUnmounted = true;
      }, parentSuspense);
      if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
        parentSuspense.deps--;
        if (parentSuspense.deps === 0) {
          parentSuspense.resolve();
        }
      }
      if (true) {
        devtoolsComponentRemoved(instance);
      }
    };
    const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
      for (let i = start; i < children.length; i++) {
        unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
      }
    };
    const getNextHostNode = (vnode) => {
      if (vnode.shapeFlag & 6) {
        return getNextHostNode(vnode.component.subTree);
      }
      if (vnode.shapeFlag & 128) {
        return vnode.suspense.next();
      }
      return hostNextSibling(vnode.anchor || vnode.el);
    };
    const render2 = (vnode, container, isSVG) => {
      if (vnode == null) {
        if (container._vnode) {
          unmount(container._vnode, null, null, true);
        }
      } else {
        patch(container._vnode || null, vnode, container, null, null, null, isSVG);
      }
      flushPostFlushCbs();
      container._vnode = vnode;
    };
    const internals = {
      p: patch,
      um: unmount,
      m: move,
      r: remove2,
      mt: mountComponent,
      mc: mountChildren,
      pc: patchChildren,
      pbc: patchBlockChildren,
      n: getNextHostNode,
      o: options
    };
    let hydrate;
    let hydrateNode;
    if (createHydrationFns) {
      [hydrate, hydrateNode] = createHydrationFns(internals);
    }
    return {
      render: render2,
      hydrate,
      createApp: createAppAPI(render2, hydrate)
    };
  }
  function toggleRecurse({ effect: effect2, update }, allowed) {
    effect2.allowRecurse = update.allowRecurse = allowed;
  }
  function traverseStaticChildren(n1, n2, shallow = false) {
    const ch1 = n1.children;
    const ch2 = n2.children;
    if (isArray(ch1) && isArray(ch2)) {
      for (let i = 0; i < ch1.length; i++) {
        const c1 = ch1[i];
        let c2 = ch2[i];
        if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
          if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
            c2 = ch2[i] = cloneIfMounted(ch2[i]);
            c2.el = c1.el;
          }
          if (!shallow)
            traverseStaticChildren(c1, c2);
        }
        if (c2.type === Comment && !c2.el) {
          c2.el = c1.el;
        }
      }
    }
  }
  function getSequence(arr) {
    const p2 = arr.slice();
    const result = [0];
    let i, j, u, v, c;
    const len = arr.length;
    for (i = 0; i < len; i++) {
      const arrI = arr[i];
      if (arrI !== 0) {
        j = result[result.length - 1];
        if (arr[j] < arrI) {
          p2[i] = j;
          result.push(i);
          continue;
        }
        u = 0;
        v = result.length - 1;
        while (u < v) {
          c = u + v >> 1;
          if (arr[result[c]] < arrI) {
            u = c + 1;
          } else {
            v = c;
          }
        }
        if (arrI < arr[result[u]]) {
          if (u > 0) {
            p2[i] = result[u - 1];
          }
          result[u] = i;
        }
      }
    }
    u = result.length;
    v = result[u - 1];
    while (u-- > 0) {
      result[u] = v;
      v = p2[v];
    }
    return result;
  }
  var isTeleport = (type) => type.__isTeleport;
  var isTeleportDisabled = (props) => props && (props.disabled || props.disabled === "");
  var isTargetSVG = (target) => typeof SVGElement !== "undefined" && target instanceof SVGElement;
  var resolveTarget = (props, select) => {
    const targetSelector = props && props.to;
    if (isString(targetSelector)) {
      if (!select) {
        warn2(`Current renderer does not support string target for Teleports. (missing querySelector renderer option)`);
        return null;
      } else {
        const target = select(targetSelector);
        if (!target) {
          warn2(`Failed to locate Teleport target with selector "${targetSelector}". Note the target element must exist before the component is mounted - i.e. the target cannot be rendered by the component itself, and ideally should be outside of the entire Vue component tree.`);
        }
        return target;
      }
    } else {
      if (!targetSelector && !isTeleportDisabled(props)) {
        warn2(`Invalid Teleport target: ${targetSelector}`);
      }
      return targetSelector;
    }
  };
  var TeleportImpl = {
    __isTeleport: true,
    process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals) {
      const { mc: mountChildren, pc: patchChildren, pbc: patchBlockChildren, o: { insert, querySelector, createText, createComment } } = internals;
      const disabled = isTeleportDisabled(n2.props);
      let { shapeFlag, children, dynamicChildren } = n2;
      if (isHmrUpdating) {
        optimized = false;
        dynamicChildren = null;
      }
      if (n1 == null) {
        const placeholder = n2.el = true ? createComment("teleport start") : createText("");
        const mainAnchor = n2.anchor = true ? createComment("teleport end") : createText("");
        insert(placeholder, container, anchor);
        insert(mainAnchor, container, anchor);
        const target = n2.target = resolveTarget(n2.props, querySelector);
        const targetAnchor = n2.targetAnchor = createText("");
        if (target) {
          insert(targetAnchor, target);
          isSVG = isSVG || isTargetSVG(target);
        } else if (!disabled) {
          warn2("Invalid Teleport target on mount:", target, `(${typeof target})`);
        }
        const mount = (container2, anchor2) => {
          if (shapeFlag & 16) {
            mountChildren(children, container2, anchor2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          }
        };
        if (disabled) {
          mount(container, mainAnchor);
        } else if (target) {
          mount(target, targetAnchor);
        }
      } else {
        n2.el = n1.el;
        const mainAnchor = n2.anchor = n1.anchor;
        const target = n2.target = n1.target;
        const targetAnchor = n2.targetAnchor = n1.targetAnchor;
        const wasDisabled = isTeleportDisabled(n1.props);
        const currentContainer = wasDisabled ? container : target;
        const currentAnchor = wasDisabled ? mainAnchor : targetAnchor;
        isSVG = isSVG || isTargetSVG(target);
        if (dynamicChildren) {
          patchBlockChildren(n1.dynamicChildren, dynamicChildren, currentContainer, parentComponent, parentSuspense, isSVG, slotScopeIds);
          traverseStaticChildren(n1, n2, true);
        } else if (!optimized) {
          patchChildren(n1, n2, currentContainer, currentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, false);
        }
        if (disabled) {
          if (!wasDisabled) {
            moveTeleport(n2, container, mainAnchor, internals, 1);
          }
        } else {
          if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
            const nextTarget = n2.target = resolveTarget(n2.props, querySelector);
            if (nextTarget) {
              moveTeleport(n2, nextTarget, null, internals, 0);
            } else if (true) {
              warn2("Invalid Teleport target on update:", target, `(${typeof target})`);
            }
          } else if (wasDisabled) {
            moveTeleport(n2, target, targetAnchor, internals, 1);
          }
        }
      }
    },
    remove(vnode, parentComponent, parentSuspense, optimized, { um: unmount, o: { remove: hostRemove } }, doRemove) {
      const { shapeFlag, children, anchor, targetAnchor, target, props } = vnode;
      if (target) {
        hostRemove(targetAnchor);
      }
      if (doRemove || !isTeleportDisabled(props)) {
        hostRemove(anchor);
        if (shapeFlag & 16) {
          for (let i = 0; i < children.length; i++) {
            const child = children[i];
            unmount(child, parentComponent, parentSuspense, true, !!child.dynamicChildren);
          }
        }
      }
    },
    move: moveTeleport,
    hydrate: hydrateTeleport
  };
  function moveTeleport(vnode, container, parentAnchor, { o: { insert }, m: move }, moveType = 2) {
    if (moveType === 0) {
      insert(vnode.targetAnchor, container, parentAnchor);
    }
    const { el, anchor, shapeFlag, children, props } = vnode;
    const isReorder = moveType === 2;
    if (isReorder) {
      insert(el, container, parentAnchor);
    }
    if (!isReorder || isTeleportDisabled(props)) {
      if (shapeFlag & 16) {
        for (let i = 0; i < children.length; i++) {
          move(children[i], container, parentAnchor, 2);
        }
      }
    }
    if (isReorder) {
      insert(anchor, container, parentAnchor);
    }
  }
  function hydrateTeleport(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, { o: { nextSibling, parentNode, querySelector } }, hydrateChildren) {
    const target = vnode.target = resolveTarget(vnode.props, querySelector);
    if (target) {
      const targetNode = target._lpa || target.firstChild;
      if (vnode.shapeFlag & 16) {
        if (isTeleportDisabled(vnode.props)) {
          vnode.anchor = hydrateChildren(nextSibling(node), vnode, parentNode(node), parentComponent, parentSuspense, slotScopeIds, optimized);
          vnode.targetAnchor = targetNode;
        } else {
          vnode.anchor = nextSibling(node);
          let targetAnchor = targetNode;
          while (targetAnchor) {
            targetAnchor = nextSibling(targetAnchor);
            if (targetAnchor && targetAnchor.nodeType === 8 && targetAnchor.data === "teleport anchor") {
              vnode.targetAnchor = targetAnchor;
              target._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
              break;
            }
          }
          hydrateChildren(targetNode, vnode, target, parentComponent, parentSuspense, slotScopeIds, optimized);
        }
      }
    }
    return vnode.anchor && nextSibling(vnode.anchor);
  }
  var Teleport = TeleportImpl;
  var Fragment = Symbol(true ? "Fragment" : void 0);
  var Text = Symbol(true ? "Text" : void 0);
  var Comment = Symbol(true ? "Comment" : void 0);
  var Static = Symbol(true ? "Static" : void 0);
  var blockStack = [];
  var currentBlock = null;
  function openBlock(disableTracking = false) {
    blockStack.push(currentBlock = disableTracking ? null : []);
  }
  function closeBlock() {
    blockStack.pop();
    currentBlock = blockStack[blockStack.length - 1] || null;
  }
  var isBlockTreeEnabled = 1;
  function setBlockTracking(value) {
    isBlockTreeEnabled += value;
  }
  function setupBlock(vnode) {
    vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
    closeBlock();
    if (isBlockTreeEnabled > 0 && currentBlock) {
      currentBlock.push(vnode);
    }
    return vnode;
  }
  function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
    return setupBlock(createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, true));
  }
  function createBlock(type, props, children, patchFlag, dynamicProps) {
    return setupBlock(createVNode(type, props, children, patchFlag, dynamicProps, true));
  }
  function isVNode(value) {
    return value ? value.__v_isVNode === true : false;
  }
  function isSameVNodeType(n1, n2) {
    if (n2.shapeFlag & 6 && hmrDirtyComponents.has(n2.type)) {
      return false;
    }
    return n1.type === n2.type && n1.key === n2.key;
  }
  var vnodeArgsTransformer;
  var createVNodeWithArgsTransform = (...args) => {
    return _createVNode(...vnodeArgsTransformer ? vnodeArgsTransformer(args, currentRenderingInstance) : args);
  };
  var InternalObjectKey = `__vInternal`;
  var normalizeKey = ({ key }) => key != null ? key : null;
  var normalizeRef = ({ ref: ref2, ref_key, ref_for }) => {
    return ref2 != null ? isString(ref2) || isRef(ref2) || isFunction(ref2) ? { i: currentRenderingInstance, r: ref2, k: ref_key, f: !!ref_for } : ref2 : null;
  };
  function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
    const vnode = {
      __v_isVNode: true,
      __v_skip: true,
      type,
      props,
      key: props && normalizeKey(props),
      ref: props && normalizeRef(props),
      scopeId: currentScopeId,
      slotScopeIds: null,
      children,
      component: null,
      suspense: null,
      ssContent: null,
      ssFallback: null,
      dirs: null,
      transition: null,
      el: null,
      anchor: null,
      target: null,
      targetAnchor: null,
      staticCount: 0,
      shapeFlag,
      patchFlag,
      dynamicProps,
      dynamicChildren: null,
      appContext: null
    };
    if (needFullChildrenNormalization) {
      normalizeChildren(vnode, children);
      if (shapeFlag & 128) {
        type.normalize(vnode);
      }
    } else if (children) {
      vnode.shapeFlag |= isString(children) ? 8 : 16;
    }
    if (vnode.key !== vnode.key) {
      warn2(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock && (vnode.patchFlag > 0 || shapeFlag & 6) && vnode.patchFlag !== 32) {
      currentBlock.push(vnode);
    }
    return vnode;
  }
  var createVNode = true ? createVNodeWithArgsTransform : _createVNode;
  function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
    if (!type || type === NULL_DYNAMIC_COMPONENT) {
      if (!type) {
        warn2(`Invalid vnode type when creating vnode: ${type}.`);
      }
      type = Comment;
    }
    if (isVNode(type)) {
      const cloned = cloneVNode(type, props, true);
      if (children) {
        normalizeChildren(cloned, children);
      }
      if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
        if (cloned.shapeFlag & 6) {
          currentBlock[currentBlock.indexOf(type)] = cloned;
        } else {
          currentBlock.push(cloned);
        }
      }
      cloned.patchFlag |= -2;
      return cloned;
    }
    if (isClassComponent(type)) {
      type = type.__vccOpts;
    }
    if (props) {
      props = guardReactiveProps(props);
      let { class: klass, style } = props;
      if (klass && !isString(klass)) {
        props.class = normalizeClass(klass);
      }
      if (isObject(style)) {
        if (isProxy(style) && !isArray(style)) {
          style = extend({}, style);
        }
        props.style = normalizeStyle(style);
      }
    }
    const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
    if (shapeFlag & 4 && isProxy(type)) {
      type = toRaw(type);
      warn2(`Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with \`markRaw\` or using \`shallowRef\` instead of \`ref\`.`, `
Component that was made reactive: `, type);
    }
    return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
  }
  function guardReactiveProps(props) {
    if (!props)
      return null;
    return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
  }
  function cloneVNode(vnode, extraProps, mergeRef = false) {
    const { props, ref: ref2, patchFlag, children } = vnode;
    const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
    const cloned = {
      __v_isVNode: true,
      __v_skip: true,
      type: vnode.type,
      props: mergedProps,
      key: mergedProps && normalizeKey(mergedProps),
      ref: extraProps && extraProps.ref ? mergeRef && ref2 ? isArray(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref2,
      scopeId: vnode.scopeId,
      slotScopeIds: vnode.slotScopeIds,
      children: patchFlag === -1 && isArray(children) ? children.map(deepCloneVNode) : children,
      target: vnode.target,
      targetAnchor: vnode.targetAnchor,
      staticCount: vnode.staticCount,
      shapeFlag: vnode.shapeFlag,
      patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
      dynamicProps: vnode.dynamicProps,
      dynamicChildren: vnode.dynamicChildren,
      appContext: vnode.appContext,
      dirs: vnode.dirs,
      transition: vnode.transition,
      component: vnode.component,
      suspense: vnode.suspense,
      ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
      ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
      el: vnode.el,
      anchor: vnode.anchor
    };
    return cloned;
  }
  function deepCloneVNode(vnode) {
    const cloned = cloneVNode(vnode);
    if (isArray(vnode.children)) {
      cloned.children = vnode.children.map(deepCloneVNode);
    }
    return cloned;
  }
  function createTextVNode(text = " ", flag = 0) {
    return createVNode(Text, null, text, flag);
  }
  function createCommentVNode(text = "", asBlock = false) {
    return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
  }
  function normalizeVNode(child) {
    if (child == null || typeof child === "boolean") {
      return createVNode(Comment);
    } else if (isArray(child)) {
      return createVNode(Fragment, null, child.slice());
    } else if (typeof child === "object") {
      return cloneIfMounted(child);
    } else {
      return createVNode(Text, null, String(child));
    }
  }
  function cloneIfMounted(child) {
    return child.el === null || child.memo ? child : cloneVNode(child);
  }
  function normalizeChildren(vnode, children) {
    let type = 0;
    const { shapeFlag } = vnode;
    if (children == null) {
      children = null;
    } else if (isArray(children)) {
      type = 16;
    } else if (typeof children === "object") {
      if (shapeFlag & (1 | 64)) {
        const slot = children.default;
        if (slot) {
          slot._c && (slot._d = false);
          normalizeChildren(vnode, slot());
          slot._c && (slot._d = true);
        }
        return;
      } else {
        type = 32;
        const slotFlag = children._;
        if (!slotFlag && !(InternalObjectKey in children)) {
          children._ctx = currentRenderingInstance;
        } else if (slotFlag === 3 && currentRenderingInstance) {
          if (currentRenderingInstance.slots._ === 1) {
            children._ = 1;
          } else {
            children._ = 2;
            vnode.patchFlag |= 1024;
          }
        }
      }
    } else if (isFunction(children)) {
      children = { default: children, _ctx: currentRenderingInstance };
      type = 32;
    } else {
      children = String(children);
      if (shapeFlag & 64) {
        type = 16;
        children = [createTextVNode(children)];
      } else {
        type = 8;
      }
    }
    vnode.children = children;
    vnode.shapeFlag |= type;
  }
  function mergeProps(...args) {
    const ret = {};
    for (let i = 0; i < args.length; i++) {
      const toMerge = args[i];
      for (const key in toMerge) {
        if (key === "class") {
          if (ret.class !== toMerge.class) {
            ret.class = normalizeClass([ret.class, toMerge.class]);
          }
        } else if (key === "style") {
          ret.style = normalizeStyle([ret.style, toMerge.style]);
        } else if (isOn(key)) {
          const existing = ret[key];
          const incoming = toMerge[key];
          if (incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming))) {
            ret[key] = existing ? [].concat(existing, incoming) : incoming;
          }
        } else if (key !== "") {
          ret[key] = toMerge[key];
        }
      }
    }
    return ret;
  }
  function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
    callWithAsyncErrorHandling(hook, instance, 7, [
      vnode,
      prevVNode
    ]);
  }
  var emptyAppContext = createAppContext();
  var uid$1 = 0;
  function createComponentInstance(vnode, parent, suspense) {
    const type = vnode.type;
    const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
    const instance = {
      uid: uid$1++,
      vnode,
      type,
      parent,
      appContext,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new EffectScope(true),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: parent ? parent.provides : Object.create(appContext.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: normalizePropsOptions(type, appContext),
      emitsOptions: normalizeEmitsOptions(type, appContext),
      emit: null,
      emitted: null,
      propsDefaults: EMPTY_OBJ,
      inheritAttrs: type.inheritAttrs,
      ctx: EMPTY_OBJ,
      data: EMPTY_OBJ,
      props: EMPTY_OBJ,
      attrs: EMPTY_OBJ,
      slots: EMPTY_OBJ,
      refs: EMPTY_OBJ,
      setupState: EMPTY_OBJ,
      setupContext: null,
      suspense,
      suspenseId: suspense ? suspense.pendingId : 0,
      asyncDep: null,
      asyncResolved: false,
      isMounted: false,
      isUnmounted: false,
      isDeactivated: false,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null
    };
    if (true) {
      instance.ctx = createDevRenderContext(instance);
    } else {
      instance.ctx = { _: instance };
    }
    instance.root = parent ? parent.root : instance;
    instance.emit = emit$1.bind(null, instance);
    if (vnode.ce) {
      vnode.ce(instance);
    }
    return instance;
  }
  var currentInstance = null;
  var getCurrentInstance = () => currentInstance || currentRenderingInstance;
  var setCurrentInstance = (instance) => {
    currentInstance = instance;
    instance.scope.on();
  };
  var unsetCurrentInstance = () => {
    currentInstance && currentInstance.scope.off();
    currentInstance = null;
  };
  var isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
  function validateComponentName(name, config) {
    const appIsNativeTag = config.isNativeTag || NO;
    if (isBuiltInTag(name) || appIsNativeTag(name)) {
      warn2("Do not use built-in or reserved HTML elements as component id: " + name);
    }
  }
  function isStatefulComponent(instance) {
    return instance.vnode.shapeFlag & 4;
  }
  var isInSSRComponentSetup = false;
  function setupComponent(instance, isSSR = false) {
    isInSSRComponentSetup = isSSR;
    const { props, children } = instance.vnode;
    const isStateful = isStatefulComponent(instance);
    initProps(instance, props, isStateful, isSSR);
    initSlots(instance, children);
    const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
    isInSSRComponentSetup = false;
    return setupResult;
  }
  function setupStatefulComponent(instance, isSSR) {
    var _a2;
    const Component = instance.type;
    if (true) {
      if (Component.name) {
        validateComponentName(Component.name, instance.appContext.config);
      }
      if (Component.components) {
        const names = Object.keys(Component.components);
        for (let i = 0; i < names.length; i++) {
          validateComponentName(names[i], instance.appContext.config);
        }
      }
      if (Component.directives) {
        const names = Object.keys(Component.directives);
        for (let i = 0; i < names.length; i++) {
          validateDirectiveName(names[i]);
        }
      }
      if (Component.compilerOptions && isRuntimeOnly()) {
        warn2(`"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`);
      }
    }
    instance.accessCache = /* @__PURE__ */ Object.create(null);
    instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
    if (true) {
      exposePropsOnRenderContext(instance);
    }
    const { setup } = Component;
    if (setup) {
      const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
      setCurrentInstance(instance);
      pauseTracking();
      const setupResult = callWithErrorHandling(setup, instance, 0, [true ? shallowReadonly(instance.props) : instance.props, setupContext]);
      resetTracking();
      unsetCurrentInstance();
      if (isPromise(setupResult)) {
        setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
        if (isSSR) {
          return setupResult.then((resolvedResult) => {
            handleSetupResult(instance, resolvedResult, isSSR);
          }).catch((e) => {
            handleError(e, instance, 0);
          });
        } else {
          instance.asyncDep = setupResult;
          if (!instance.suspense) {
            const name = (_a2 = Component.name) !== null && _a2 !== void 0 ? _a2 : "Anonymous";
            warn2(`Component <${name}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`);
          }
        }
      } else {
        handleSetupResult(instance, setupResult, isSSR);
      }
    } else {
      finishComponentSetup(instance, isSSR);
    }
  }
  function handleSetupResult(instance, setupResult, isSSR) {
    if (isFunction(setupResult)) {
      if (instance.type.__ssrInlineRender) {
        instance.ssrRender = setupResult;
      } else {
        instance.render = setupResult;
      }
    } else if (isObject(setupResult)) {
      if (isVNode(setupResult)) {
        warn2(`setup() should not return VNodes directly - return a render function instead.`);
      }
      if (true) {
        instance.devtoolsRawSetupState = setupResult;
      }
      instance.setupState = proxyRefs(setupResult);
      if (true) {
        exposeSetupStateOnRenderContext(instance);
      }
    } else if (setupResult !== void 0) {
      warn2(`setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`);
    }
    finishComponentSetup(instance, isSSR);
  }
  var compile;
  var installWithProxy;
  var isRuntimeOnly = () => !compile;
  function finishComponentSetup(instance, isSSR, skipOptions) {
    const Component = instance.type;
    if (!instance.render) {
      if (!isSSR && compile && !Component.render) {
        const template = Component.template;
        if (template) {
          if (true) {
            startMeasure(instance, `compile`);
          }
          const { isCustomElement, compilerOptions } = instance.appContext.config;
          const { delimiters, compilerOptions: componentCompilerOptions } = Component;
          const finalCompilerOptions = extend(extend({
            isCustomElement,
            delimiters
          }, compilerOptions), componentCompilerOptions);
          Component.render = compile(template, finalCompilerOptions);
          if (true) {
            endMeasure(instance, `compile`);
          }
        }
      }
      instance.render = Component.render || NOOP;
      if (installWithProxy) {
        installWithProxy(instance);
      }
    }
    if (__VUE_OPTIONS_API__ && true) {
      setCurrentInstance(instance);
      pauseTracking();
      applyOptions(instance);
      resetTracking();
      unsetCurrentInstance();
    }
    if (!Component.render && instance.render === NOOP && !isSSR) {
      if (!compile && Component.template) {
        warn2(`Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`);
      } else {
        warn2(`Component is missing template or render function.`);
      }
    }
  }
  function createAttrsProxy(instance) {
    return new Proxy(instance.attrs, true ? {
      get(target, key) {
        markAttrsAccessed();
        track(instance, "get", "$attrs");
        return target[key];
      },
      set() {
        warn2(`setupContext.attrs is readonly.`);
        return false;
      },
      deleteProperty() {
        warn2(`setupContext.attrs is readonly.`);
        return false;
      }
    } : {
      get(target, key) {
        track(instance, "get", "$attrs");
        return target[key];
      }
    });
  }
  function createSetupContext(instance) {
    const expose = (exposed) => {
      if (instance.exposed) {
        warn2(`expose() should be called only once per setup().`);
      }
      instance.exposed = exposed || {};
    };
    let attrs;
    if (true) {
      return Object.freeze({
        get attrs() {
          return attrs || (attrs = createAttrsProxy(instance));
        },
        get slots() {
          return shallowReadonly(instance.slots);
        },
        get emit() {
          return (event, ...args) => instance.emit(event, ...args);
        },
        expose
      });
    } else {
      return {
        get attrs() {
          return attrs || (attrs = createAttrsProxy(instance));
        },
        slots: instance.slots,
        emit: instance.emit,
        expose
      };
    }
  }
  function getExposeProxy(instance) {
    if (instance.exposed) {
      return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
        get(target, key) {
          if (key in target) {
            return target[key];
          } else if (key in publicPropertiesMap) {
            return publicPropertiesMap[key](instance);
          }
        }
      }));
    }
  }
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
  function getComponentName(Component, includeInferred = true) {
    return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
  }
  function formatComponentName(instance, Component, isRoot = false) {
    let name = getComponentName(Component);
    if (!name && Component.__file) {
      const match = Component.__file.match(/([^/\\]+)\.\w+$/);
      if (match) {
        name = match[1];
      }
    }
    if (!name && instance && instance.parent) {
      const inferFromRegistry = (registry) => {
        for (const key in registry) {
          if (registry[key] === Component) {
            return key;
          }
        }
      };
      name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
    }
    return name ? classify(name) : isRoot ? `App` : `Anonymous`;
  }
  function isClassComponent(value) {
    return isFunction(value) && "__vccOpts" in value;
  }
  var computed2 = (getterOrOptions, debugOptions) => {
    return computed(getterOrOptions, debugOptions, isInSSRComponentSetup);
  };
  function h(type, propsOrChildren, children) {
    const l = arguments.length;
    if (l === 2) {
      if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
        if (isVNode(propsOrChildren)) {
          return createVNode(type, null, [propsOrChildren]);
        }
        return createVNode(type, propsOrChildren);
      } else {
        return createVNode(type, null, propsOrChildren);
      }
    } else {
      if (l > 3) {
        children = Array.prototype.slice.call(arguments, 2);
      } else if (l === 3 && isVNode(children)) {
        children = [children];
      }
      return createVNode(type, propsOrChildren, children);
    }
  }
  var ssrContextKey = Symbol(true ? `ssrContext` : ``);
  function isShallow2(value) {
    return !!(value && value["__v_isShallow"]);
  }
  function initCustomFormatter() {
    if (typeof window === "undefined") {
      return;
    }
    const vueStyle = { style: "color:#3ba776" };
    const numberStyle = { style: "color:#0b1bc9" };
    const stringStyle = { style: "color:#b62e24" };
    const keywordStyle = { style: "color:#9d288c" };
    const formatter = {
      header(obj) {
        if (!isObject(obj)) {
          return null;
        }
        if (obj.__isVue) {
          return ["div", vueStyle, `VueInstance`];
        } else if (isRef(obj)) {
          return [
            "div",
            {},
            ["span", vueStyle, genRefFlag(obj)],
            "<",
            formatValue(obj.value),
            `>`
          ];
        } else if (isReactive(obj)) {
          return [
            "div",
            {},
            ["span", vueStyle, isShallow2(obj) ? "ShallowReactive" : "Reactive"],
            "<",
            formatValue(obj),
            `>${isReadonly(obj) ? ` (readonly)` : ``}`
          ];
        } else if (isReadonly(obj)) {
          return [
            "div",
            {},
            ["span", vueStyle, isShallow2(obj) ? "ShallowReadonly" : "Readonly"],
            "<",
            formatValue(obj),
            ">"
          ];
        }
        return null;
      },
      hasBody(obj) {
        return obj && obj.__isVue;
      },
      body(obj) {
        if (obj && obj.__isVue) {
          return [
            "div",
            {},
            ...formatInstance(obj.$)
          ];
        }
      }
    };
    function formatInstance(instance) {
      const blocks = [];
      if (instance.type.props && instance.props) {
        blocks.push(createInstanceBlock("props", toRaw(instance.props)));
      }
      if (instance.setupState !== EMPTY_OBJ) {
        blocks.push(createInstanceBlock("setup", instance.setupState));
      }
      if (instance.data !== EMPTY_OBJ) {
        blocks.push(createInstanceBlock("data", toRaw(instance.data)));
      }
      const computed3 = extractKeys(instance, "computed");
      if (computed3) {
        blocks.push(createInstanceBlock("computed", computed3));
      }
      const injected = extractKeys(instance, "inject");
      if (injected) {
        blocks.push(createInstanceBlock("injected", injected));
      }
      blocks.push([
        "div",
        {},
        [
          "span",
          {
            style: keywordStyle.style + ";opacity:0.66"
          },
          "$ (internal): "
        ],
        ["object", { object: instance }]
      ]);
      return blocks;
    }
    function createInstanceBlock(type, target) {
      target = extend({}, target);
      if (!Object.keys(target).length) {
        return ["span", {}];
      }
      return [
        "div",
        { style: "line-height:1.25em;margin-bottom:0.6em" },
        [
          "div",
          {
            style: "color:#476582"
          },
          type
        ],
        [
          "div",
          {
            style: "padding-left:1.25em"
          },
          ...Object.keys(target).map((key) => {
            return [
              "div",
              {},
              ["span", keywordStyle, key + ": "],
              formatValue(target[key], false)
            ];
          })
        ]
      ];
    }
    function formatValue(v, asRaw = true) {
      if (typeof v === "number") {
        return ["span", numberStyle, v];
      } else if (typeof v === "string") {
        return ["span", stringStyle, JSON.stringify(v)];
      } else if (typeof v === "boolean") {
        return ["span", keywordStyle, v];
      } else if (isObject(v)) {
        return ["object", { object: asRaw ? toRaw(v) : v }];
      } else {
        return ["span", stringStyle, String(v)];
      }
    }
    function extractKeys(instance, type) {
      const Comp = instance.type;
      if (isFunction(Comp)) {
        return;
      }
      const extracted = {};
      for (const key in instance.ctx) {
        if (isKeyOfType(Comp, key, type)) {
          extracted[key] = instance.ctx[key];
        }
      }
      return extracted;
    }
    function isKeyOfType(Comp, key, type) {
      const opts = Comp[type];
      if (isArray(opts) && opts.includes(key) || isObject(opts) && key in opts) {
        return true;
      }
      if (Comp.extends && isKeyOfType(Comp.extends, key, type)) {
        return true;
      }
      if (Comp.mixins && Comp.mixins.some((m) => isKeyOfType(m, key, type))) {
        return true;
      }
    }
    function genRefFlag(v) {
      if (isShallow2(v)) {
        return `ShallowRef`;
      }
      if (v.effect) {
        return `ComputedRef`;
      }
      return `Ref`;
    }
    if (window.devtoolsFormatters) {
      window.devtoolsFormatters.push(formatter);
    } else {
      window.devtoolsFormatters = [formatter];
    }
  }
  var version = "3.2.37";

  // node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js
  var svgNS = "http://www.w3.org/2000/svg";
  var doc = typeof document !== "undefined" ? document : null;
  var templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
  var nodeOps = {
    insert: (child, parent, anchor) => {
      parent.insertBefore(child, anchor || null);
    },
    remove: (child) => {
      const parent = child.parentNode;
      if (parent) {
        parent.removeChild(child);
      }
    },
    createElement: (tag, isSVG, is, props) => {
      const el = isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is ? { is } : void 0);
      if (tag === "select" && props && props.multiple != null) {
        el.setAttribute("multiple", props.multiple);
      }
      return el;
    },
    createText: (text) => doc.createTextNode(text),
    createComment: (text) => doc.createComment(text),
    setText: (node, text) => {
      node.nodeValue = text;
    },
    setElementText: (el, text) => {
      el.textContent = text;
    },
    parentNode: (node) => node.parentNode,
    nextSibling: (node) => node.nextSibling,
    querySelector: (selector) => doc.querySelector(selector),
    setScopeId(el, id) {
      el.setAttribute(id, "");
    },
    cloneNode(el) {
      const cloned = el.cloneNode(true);
      if (`_value` in el) {
        cloned._value = el._value;
      }
      return cloned;
    },
    insertStaticContent(content, parent, anchor, isSVG, start, end) {
      const before = anchor ? anchor.previousSibling : parent.lastChild;
      if (start && (start === end || start.nextSibling)) {
        while (true) {
          parent.insertBefore(start.cloneNode(true), anchor);
          if (start === end || !(start = start.nextSibling))
            break;
        }
      } else {
        templateContainer.innerHTML = isSVG ? `<svg>${content}</svg>` : content;
        const template = templateContainer.content;
        if (isSVG) {
          const wrapper = template.firstChild;
          while (wrapper.firstChild) {
            template.appendChild(wrapper.firstChild);
          }
          template.removeChild(wrapper);
        }
        parent.insertBefore(template, anchor);
      }
      return [
        before ? before.nextSibling : parent.firstChild,
        anchor ? anchor.previousSibling : parent.lastChild
      ];
    }
  };
  function patchClass(el, value, isSVG) {
    const transitionClasses = el._vtc;
    if (transitionClasses) {
      value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
    }
    if (value == null) {
      el.removeAttribute("class");
    } else if (isSVG) {
      el.setAttribute("class", value);
    } else {
      el.className = value;
    }
  }
  function patchStyle(el, prev, next) {
    const style = el.style;
    const isCssString = isString(next);
    if (next && !isCssString) {
      for (const key in next) {
        setStyle(style, key, next[key]);
      }
      if (prev && !isString(prev)) {
        for (const key in prev) {
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      }
    } else {
      const currentDisplay = style.display;
      if (isCssString) {
        if (prev !== next) {
          style.cssText = next;
        }
      } else if (prev) {
        el.removeAttribute("style");
      }
      if ("_vod" in el) {
        style.display = currentDisplay;
      }
    }
  }
  var importantRE = /\s*!important$/;
  function setStyle(style, name, val) {
    if (isArray(val)) {
      val.forEach((v) => setStyle(style, name, v));
    } else {
      if (val == null)
        val = "";
      if (name.startsWith("--")) {
        style.setProperty(name, val);
      } else {
        const prefixed = autoPrefix(style, name);
        if (importantRE.test(val)) {
          style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
        } else {
          style[prefixed] = val;
        }
      }
    }
  }
  var prefixes = ["Webkit", "Moz", "ms"];
  var prefixCache = {};
  function autoPrefix(style, rawName) {
    const cached = prefixCache[rawName];
    if (cached) {
      return cached;
    }
    let name = camelize(rawName);
    if (name !== "filter" && name in style) {
      return prefixCache[rawName] = name;
    }
    name = capitalize(name);
    for (let i = 0; i < prefixes.length; i++) {
      const prefixed = prefixes[i] + name;
      if (prefixed in style) {
        return prefixCache[rawName] = prefixed;
      }
    }
    return rawName;
  }
  var xlinkNS = "http://www.w3.org/1999/xlink";
  function patchAttr(el, key, value, isSVG, instance) {
    if (isSVG && key.startsWith("xlink:")) {
      if (value == null) {
        el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
      } else {
        el.setAttributeNS(xlinkNS, key, value);
      }
    } else {
      const isBoolean2 = isSpecialBooleanAttr(key);
      if (value == null || isBoolean2 && !includeBooleanAttr(value)) {
        el.removeAttribute(key);
      } else {
        el.setAttribute(key, isBoolean2 ? "" : value);
      }
    }
  }
  function patchDOMProp(el, key, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
    if (key === "innerHTML" || key === "textContent") {
      if (prevChildren) {
        unmountChildren(prevChildren, parentComponent, parentSuspense);
      }
      el[key] = value == null ? "" : value;
      return;
    }
    if (key === "value" && el.tagName !== "PROGRESS" && !el.tagName.includes("-")) {
      el._value = value;
      const newValue = value == null ? "" : value;
      if (el.value !== newValue || el.tagName === "OPTION") {
        el.value = newValue;
      }
      if (value == null) {
        el.removeAttribute(key);
      }
      return;
    }
    let needRemove = false;
    if (value === "" || value == null) {
      const type = typeof el[key];
      if (type === "boolean") {
        value = includeBooleanAttr(value);
      } else if (value == null && type === "string") {
        value = "";
        needRemove = true;
      } else if (type === "number") {
        value = 0;
        needRemove = true;
      }
    }
    try {
      el[key] = value;
    } catch (e) {
      if (true) {
        warn2(`Failed setting prop "${key}" on <${el.tagName.toLowerCase()}>: value ${value} is invalid.`, e);
      }
    }
    needRemove && el.removeAttribute(key);
  }
  var [_getNow, skipTimestampCheck] = /* @__PURE__ */ (() => {
    let _getNow2 = Date.now;
    let skipTimestampCheck2 = false;
    if (typeof window !== "undefined") {
      if (Date.now() > document.createEvent("Event").timeStamp) {
        _getNow2 = performance.now.bind(performance);
      }
      const ffMatch = navigator.userAgent.match(/firefox\/(\d+)/i);
      skipTimestampCheck2 = !!(ffMatch && Number(ffMatch[1]) <= 53);
    }
    return [_getNow2, skipTimestampCheck2];
  })();
  var cachedNow = 0;
  var p = /* @__PURE__ */ Promise.resolve();
  var reset = () => {
    cachedNow = 0;
  };
  var getNow = () => cachedNow || (p.then(reset), cachedNow = _getNow());
  function addEventListener(el, event, handler, options) {
    el.addEventListener(event, handler, options);
  }
  function removeEventListener(el, event, handler, options) {
    el.removeEventListener(event, handler, options);
  }
  function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
    const invokers = el._vei || (el._vei = {});
    const existingInvoker = invokers[rawName];
    if (nextValue && existingInvoker) {
      existingInvoker.value = nextValue;
    } else {
      const [name, options] = parseName(rawName);
      if (nextValue) {
        const invoker = invokers[rawName] = createInvoker(nextValue, instance);
        addEventListener(el, name, invoker, options);
      } else if (existingInvoker) {
        removeEventListener(el, name, existingInvoker, options);
        invokers[rawName] = void 0;
      }
    }
  }
  var optionsModifierRE = /(?:Once|Passive|Capture)$/;
  function parseName(name) {
    let options;
    if (optionsModifierRE.test(name)) {
      options = {};
      let m;
      while (m = name.match(optionsModifierRE)) {
        name = name.slice(0, name.length - m[0].length);
        options[m[0].toLowerCase()] = true;
      }
    }
    return [hyphenate(name.slice(2)), options];
  }
  function createInvoker(initialValue, instance) {
    const invoker = (e) => {
      const timeStamp = e.timeStamp || _getNow();
      if (skipTimestampCheck || timeStamp >= invoker.attached - 1) {
        callWithAsyncErrorHandling(patchStopImmediatePropagation(e, invoker.value), instance, 5, [e]);
      }
    };
    invoker.value = initialValue;
    invoker.attached = getNow();
    return invoker;
  }
  function patchStopImmediatePropagation(e, value) {
    if (isArray(value)) {
      const originalStop = e.stopImmediatePropagation;
      e.stopImmediatePropagation = () => {
        originalStop.call(e);
        e._stopped = true;
      };
      return value.map((fn) => (e2) => !e2._stopped && fn && fn(e2));
    } else {
      return value;
    }
  }
  var nativeOnRE = /^on[a-z]/;
  var patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
    if (key === "class") {
      patchClass(el, nextValue, isSVG);
    } else if (key === "style") {
      patchStyle(el, prevValue, nextValue);
    } else if (isOn(key)) {
      if (!isModelListener(key)) {
        patchEvent(el, key, prevValue, nextValue, parentComponent);
      }
    } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
      patchDOMProp(el, key, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
    } else {
      if (key === "true-value") {
        el._trueValue = nextValue;
      } else if (key === "false-value") {
        el._falseValue = nextValue;
      }
      patchAttr(el, key, nextValue, isSVG);
    }
  };
  function shouldSetAsProp(el, key, value, isSVG) {
    if (isSVG) {
      if (key === "innerHTML" || key === "textContent") {
        return true;
      }
      if (key in el && nativeOnRE.test(key) && isFunction(value)) {
        return true;
      }
      return false;
    }
    if (key === "spellcheck" || key === "draggable" || key === "translate") {
      return false;
    }
    if (key === "form") {
      return false;
    }
    if (key === "list" && el.tagName === "INPUT") {
      return false;
    }
    if (key === "type" && el.tagName === "TEXTAREA") {
      return false;
    }
    if (nativeOnRE.test(key) && isString(value)) {
      return false;
    }
    return key in el;
  }
  var TRANSITION = "transition";
  var ANIMATION = "animation";
  var Transition = (props, { slots }) => h(BaseTransition, resolveTransitionProps(props), slots);
  Transition.displayName = "Transition";
  var DOMTransitionPropsValidators = {
    name: String,
    type: String,
    css: {
      type: Boolean,
      default: true
    },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String
  };
  var TransitionPropsValidators = Transition.props = /* @__PURE__ */ extend({}, BaseTransition.props, DOMTransitionPropsValidators);
  var callHook2 = (hook, args = []) => {
    if (isArray(hook)) {
      hook.forEach((h2) => h2(...args));
    } else if (hook) {
      hook(...args);
    }
  };
  var hasExplicitCallback = (hook) => {
    return hook ? isArray(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
  };
  function resolveTransitionProps(rawProps) {
    const baseProps = {};
    for (const key in rawProps) {
      if (!(key in DOMTransitionPropsValidators)) {
        baseProps[key] = rawProps[key];
      }
    }
    if (rawProps.css === false) {
      return baseProps;
    }
    const { name = "v", type, duration, enterFromClass = `${name}-enter-from`, enterActiveClass = `${name}-enter-active`, enterToClass = `${name}-enter-to`, appearFromClass = enterFromClass, appearActiveClass = enterActiveClass, appearToClass = enterToClass, leaveFromClass = `${name}-leave-from`, leaveActiveClass = `${name}-leave-active`, leaveToClass = `${name}-leave-to` } = rawProps;
    const durations = normalizeDuration(duration);
    const enterDuration = durations && durations[0];
    const leaveDuration = durations && durations[1];
    const { onBeforeEnter, onEnter, onEnterCancelled, onLeave, onLeaveCancelled, onBeforeAppear = onBeforeEnter, onAppear = onEnter, onAppearCancelled = onEnterCancelled } = baseProps;
    const finishEnter = (el, isAppear, done) => {
      removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
      removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
      done && done();
    };
    const finishLeave = (el, done) => {
      el._isLeaving = false;
      removeTransitionClass(el, leaveFromClass);
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
      done && done();
    };
    const makeEnterHook = (isAppear) => {
      return (el, done) => {
        const hook = isAppear ? onAppear : onEnter;
        const resolve2 = () => finishEnter(el, isAppear, done);
        callHook2(hook, [el, resolve2]);
        nextFrame(() => {
          removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
          addTransitionClass(el, isAppear ? appearToClass : enterToClass);
          if (!hasExplicitCallback(hook)) {
            whenTransitionEnds(el, type, enterDuration, resolve2);
          }
        });
      };
    };
    return extend(baseProps, {
      onBeforeEnter(el) {
        callHook2(onBeforeEnter, [el]);
        addTransitionClass(el, enterFromClass);
        addTransitionClass(el, enterActiveClass);
      },
      onBeforeAppear(el) {
        callHook2(onBeforeAppear, [el]);
        addTransitionClass(el, appearFromClass);
        addTransitionClass(el, appearActiveClass);
      },
      onEnter: makeEnterHook(false),
      onAppear: makeEnterHook(true),
      onLeave(el, done) {
        el._isLeaving = true;
        const resolve2 = () => finishLeave(el, done);
        addTransitionClass(el, leaveFromClass);
        forceReflow();
        addTransitionClass(el, leaveActiveClass);
        nextFrame(() => {
          if (!el._isLeaving) {
            return;
          }
          removeTransitionClass(el, leaveFromClass);
          addTransitionClass(el, leaveToClass);
          if (!hasExplicitCallback(onLeave)) {
            whenTransitionEnds(el, type, leaveDuration, resolve2);
          }
        });
        callHook2(onLeave, [el, resolve2]);
      },
      onEnterCancelled(el) {
        finishEnter(el, false);
        callHook2(onEnterCancelled, [el]);
      },
      onAppearCancelled(el) {
        finishEnter(el, true);
        callHook2(onAppearCancelled, [el]);
      },
      onLeaveCancelled(el) {
        finishLeave(el);
        callHook2(onLeaveCancelled, [el]);
      }
    });
  }
  function normalizeDuration(duration) {
    if (duration == null) {
      return null;
    } else if (isObject(duration)) {
      return [NumberOf(duration.enter), NumberOf(duration.leave)];
    } else {
      const n = NumberOf(duration);
      return [n, n];
    }
  }
  function NumberOf(val) {
    const res = toNumber(val);
    if (true)
      validateDuration(res);
    return res;
  }
  function validateDuration(val) {
    if (typeof val !== "number") {
      warn2(`<transition> explicit duration is not a valid number - got ${JSON.stringify(val)}.`);
    } else if (isNaN(val)) {
      warn2(`<transition> explicit duration is NaN - the duration expression might be incorrect.`);
    }
  }
  function addTransitionClass(el, cls) {
    cls.split(/\s+/).forEach((c) => c && el.classList.add(c));
    (el._vtc || (el._vtc = /* @__PURE__ */ new Set())).add(cls);
  }
  function removeTransitionClass(el, cls) {
    cls.split(/\s+/).forEach((c) => c && el.classList.remove(c));
    const { _vtc } = el;
    if (_vtc) {
      _vtc.delete(cls);
      if (!_vtc.size) {
        el._vtc = void 0;
      }
    }
  }
  function nextFrame(cb) {
    requestAnimationFrame(() => {
      requestAnimationFrame(cb);
    });
  }
  var endId = 0;
  function whenTransitionEnds(el, expectedType, explicitTimeout, resolve2) {
    const id = el._endId = ++endId;
    const resolveIfNotStale = () => {
      if (id === el._endId) {
        resolve2();
      }
    };
    if (explicitTimeout) {
      return setTimeout(resolveIfNotStale, explicitTimeout);
    }
    const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
    if (!type) {
      return resolve2();
    }
    const endEvent = type + "end";
    let ended = 0;
    const end = () => {
      el.removeEventListener(endEvent, onEnd);
      resolveIfNotStale();
    };
    const onEnd = (e) => {
      if (e.target === el && ++ended >= propCount) {
        end();
      }
    };
    setTimeout(() => {
      if (ended < propCount) {
        end();
      }
    }, timeout + 1);
    el.addEventListener(endEvent, onEnd);
  }
  function getTransitionInfo(el, expectedType) {
    const styles = window.getComputedStyle(el);
    const getStyleProperties = (key) => (styles[key] || "").split(", ");
    const transitionDelays = getStyleProperties(TRANSITION + "Delay");
    const transitionDurations = getStyleProperties(TRANSITION + "Duration");
    const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
    const animationDelays = getStyleProperties(ANIMATION + "Delay");
    const animationDurations = getStyleProperties(ANIMATION + "Duration");
    const animationTimeout = getTimeout(animationDelays, animationDurations);
    let type = null;
    let timeout = 0;
    let propCount = 0;
    if (expectedType === TRANSITION) {
      if (transitionTimeout > 0) {
        type = TRANSITION;
        timeout = transitionTimeout;
        propCount = transitionDurations.length;
      }
    } else if (expectedType === ANIMATION) {
      if (animationTimeout > 0) {
        type = ANIMATION;
        timeout = animationTimeout;
        propCount = animationDurations.length;
      }
    } else {
      timeout = Math.max(transitionTimeout, animationTimeout);
      type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
      propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
    }
    const hasTransform = type === TRANSITION && /\b(transform|all)(,|$)/.test(styles[TRANSITION + "Property"]);
    return {
      type,
      timeout,
      propCount,
      hasTransform
    };
  }
  function getTimeout(delays, durations) {
    while (delays.length < durations.length) {
      delays = delays.concat(delays);
    }
    return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
  }
  function toMs(s) {
    return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
  }
  function forceReflow() {
    return document.body.offsetHeight;
  }
  var positionMap = /* @__PURE__ */ new WeakMap();
  var newPositionMap = /* @__PURE__ */ new WeakMap();
  var TransitionGroupImpl = {
    name: "TransitionGroup",
    props: /* @__PURE__ */ extend({}, TransitionPropsValidators, {
      tag: String,
      moveClass: String
    }),
    setup(props, { slots }) {
      const instance = getCurrentInstance();
      const state = useTransitionState();
      let prevChildren;
      let children;
      onUpdated(() => {
        if (!prevChildren.length) {
          return;
        }
        const moveClass = props.moveClass || `${props.name || "v"}-move`;
        if (!hasCSSTransform(prevChildren[0].el, instance.vnode.el, moveClass)) {
          return;
        }
        prevChildren.forEach(callPendingCbs);
        prevChildren.forEach(recordPosition);
        const movedChildren = prevChildren.filter(applyTranslation);
        forceReflow();
        movedChildren.forEach((c) => {
          const el = c.el;
          const style = el.style;
          addTransitionClass(el, moveClass);
          style.transform = style.webkitTransform = style.transitionDuration = "";
          const cb = el._moveCb = (e) => {
            if (e && e.target !== el) {
              return;
            }
            if (!e || /transform$/.test(e.propertyName)) {
              el.removeEventListener("transitionend", cb);
              el._moveCb = null;
              removeTransitionClass(el, moveClass);
            }
          };
          el.addEventListener("transitionend", cb);
        });
      });
      return () => {
        const rawProps = toRaw(props);
        const cssTransitionProps = resolveTransitionProps(rawProps);
        let tag = rawProps.tag || Fragment;
        prevChildren = children;
        children = slots.default ? getTransitionRawChildren(slots.default()) : [];
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          if (child.key != null) {
            setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
          } else if (true) {
            warn2(`<TransitionGroup> children must be keyed.`);
          }
        }
        if (prevChildren) {
          for (let i = 0; i < prevChildren.length; i++) {
            const child = prevChildren[i];
            setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
            positionMap.set(child, child.el.getBoundingClientRect());
          }
        }
        return createVNode(tag, null, children);
      };
    }
  };
  var TransitionGroup = TransitionGroupImpl;
  function callPendingCbs(c) {
    const el = c.el;
    if (el._moveCb) {
      el._moveCb();
    }
    if (el._enterCb) {
      el._enterCb();
    }
  }
  function recordPosition(c) {
    newPositionMap.set(c, c.el.getBoundingClientRect());
  }
  function applyTranslation(c) {
    const oldPos = positionMap.get(c);
    const newPos = newPositionMap.get(c);
    const dx = oldPos.left - newPos.left;
    const dy = oldPos.top - newPos.top;
    if (dx || dy) {
      const s = c.el.style;
      s.transform = s.webkitTransform = `translate(${dx}px,${dy}px)`;
      s.transitionDuration = "0s";
      return c;
    }
  }
  function hasCSSTransform(el, root, moveClass) {
    const clone = el.cloneNode();
    if (el._vtc) {
      el._vtc.forEach((cls) => {
        cls.split(/\s+/).forEach((c) => c && clone.classList.remove(c));
      });
    }
    moveClass.split(/\s+/).forEach((c) => c && clone.classList.add(c));
    clone.style.display = "none";
    const container = root.nodeType === 1 ? root : root.parentNode;
    container.appendChild(clone);
    const { hasTransform } = getTransitionInfo(clone);
    container.removeChild(clone);
    return hasTransform;
  }
  var getModelAssigner = (vnode) => {
    const fn = vnode.props["onUpdate:modelValue"] || false;
    return isArray(fn) ? (value) => invokeArrayFns(fn, value) : fn;
  };
  function onCompositionStart(e) {
    e.target.composing = true;
  }
  function onCompositionEnd(e) {
    const target = e.target;
    if (target.composing) {
      target.composing = false;
      target.dispatchEvent(new Event("input"));
    }
  }
  var vModelText = {
    created(el, { modifiers: { lazy, trim, number } }, vnode) {
      el._assign = getModelAssigner(vnode);
      const castToNumber = number || vnode.props && vnode.props.type === "number";
      addEventListener(el, lazy ? "change" : "input", (e) => {
        if (e.target.composing)
          return;
        let domValue = el.value;
        if (trim) {
          domValue = domValue.trim();
        }
        if (castToNumber) {
          domValue = toNumber(domValue);
        }
        el._assign(domValue);
      });
      if (trim) {
        addEventListener(el, "change", () => {
          el.value = el.value.trim();
        });
      }
      if (!lazy) {
        addEventListener(el, "compositionstart", onCompositionStart);
        addEventListener(el, "compositionend", onCompositionEnd);
        addEventListener(el, "change", onCompositionEnd);
      }
    },
    mounted(el, { value }) {
      el.value = value == null ? "" : value;
    },
    beforeUpdate(el, { value, modifiers: { lazy, trim, number } }, vnode) {
      el._assign = getModelAssigner(vnode);
      if (el.composing)
        return;
      if (document.activeElement === el && el.type !== "range") {
        if (lazy) {
          return;
        }
        if (trim && el.value.trim() === value) {
          return;
        }
        if ((number || el.type === "number") && toNumber(el.value) === value) {
          return;
        }
      }
      const newValue = value == null ? "" : value;
      if (el.value !== newValue) {
        el.value = newValue;
      }
    }
  };
  var vModelCheckbox = {
    deep: true,
    created(el, _, vnode) {
      el._assign = getModelAssigner(vnode);
      addEventListener(el, "change", () => {
        const modelValue = el._modelValue;
        const elementValue = getValue(el);
        const checked = el.checked;
        const assign = el._assign;
        if (isArray(modelValue)) {
          const index = looseIndexOf(modelValue, elementValue);
          const found = index !== -1;
          if (checked && !found) {
            assign(modelValue.concat(elementValue));
          } else if (!checked && found) {
            const filtered = [...modelValue];
            filtered.splice(index, 1);
            assign(filtered);
          }
        } else if (isSet(modelValue)) {
          const cloned = new Set(modelValue);
          if (checked) {
            cloned.add(elementValue);
          } else {
            cloned.delete(elementValue);
          }
          assign(cloned);
        } else {
          assign(getCheckboxValue(el, checked));
        }
      });
    },
    mounted: setChecked,
    beforeUpdate(el, binding, vnode) {
      el._assign = getModelAssigner(vnode);
      setChecked(el, binding, vnode);
    }
  };
  function setChecked(el, { value, oldValue }, vnode) {
    el._modelValue = value;
    if (isArray(value)) {
      el.checked = looseIndexOf(value, vnode.props.value) > -1;
    } else if (isSet(value)) {
      el.checked = value.has(vnode.props.value);
    } else if (value !== oldValue) {
      el.checked = looseEqual(value, getCheckboxValue(el, true));
    }
  }
  var vModelRadio = {
    created(el, { value }, vnode) {
      el.checked = looseEqual(value, vnode.props.value);
      el._assign = getModelAssigner(vnode);
      addEventListener(el, "change", () => {
        el._assign(getValue(el));
      });
    },
    beforeUpdate(el, { value, oldValue }, vnode) {
      el._assign = getModelAssigner(vnode);
      if (value !== oldValue) {
        el.checked = looseEqual(value, vnode.props.value);
      }
    }
  };
  var vModelSelect = {
    deep: true,
    created(el, { value, modifiers: { number } }, vnode) {
      const isSetModel = isSet(value);
      addEventListener(el, "change", () => {
        const selectedVal = Array.prototype.filter.call(el.options, (o) => o.selected).map((o) => number ? toNumber(getValue(o)) : getValue(o));
        el._assign(el.multiple ? isSetModel ? new Set(selectedVal) : selectedVal : selectedVal[0]);
      });
      el._assign = getModelAssigner(vnode);
    },
    mounted(el, { value }) {
      setSelected(el, value);
    },
    beforeUpdate(el, _binding, vnode) {
      el._assign = getModelAssigner(vnode);
    },
    updated(el, { value }) {
      setSelected(el, value);
    }
  };
  function setSelected(el, value) {
    const isMultiple = el.multiple;
    if (isMultiple && !isArray(value) && !isSet(value)) {
      warn2(`<select multiple v-model> expects an Array or Set value for its binding, but got ${Object.prototype.toString.call(value).slice(8, -1)}.`);
      return;
    }
    for (let i = 0, l = el.options.length; i < l; i++) {
      const option = el.options[i];
      const optionValue = getValue(option);
      if (isMultiple) {
        if (isArray(value)) {
          option.selected = looseIndexOf(value, optionValue) > -1;
        } else {
          option.selected = value.has(optionValue);
        }
      } else {
        if (looseEqual(getValue(option), value)) {
          if (el.selectedIndex !== i)
            el.selectedIndex = i;
          return;
        }
      }
    }
    if (!isMultiple && el.selectedIndex !== -1) {
      el.selectedIndex = -1;
    }
  }
  function getValue(el) {
    return "_value" in el ? el._value : el.value;
  }
  function getCheckboxValue(el, checked) {
    const key = checked ? "_trueValue" : "_falseValue";
    return key in el ? el[key] : checked;
  }
  var vModelDynamic = {
    created(el, binding, vnode) {
      callModelHook(el, binding, vnode, null, "created");
    },
    mounted(el, binding, vnode) {
      callModelHook(el, binding, vnode, null, "mounted");
    },
    beforeUpdate(el, binding, vnode, prevVNode) {
      callModelHook(el, binding, vnode, prevVNode, "beforeUpdate");
    },
    updated(el, binding, vnode, prevVNode) {
      callModelHook(el, binding, vnode, prevVNode, "updated");
    }
  };
  function resolveDynamicModel(tagName, type) {
    switch (tagName) {
      case "SELECT":
        return vModelSelect;
      case "TEXTAREA":
        return vModelText;
      default:
        switch (type) {
          case "checkbox":
            return vModelCheckbox;
          case "radio":
            return vModelRadio;
          default:
            return vModelText;
        }
    }
  }
  function callModelHook(el, binding, vnode, prevVNode, hook) {
    const modelToUse = resolveDynamicModel(el.tagName, vnode.props && vnode.props.type);
    const fn = modelToUse[hook];
    fn && fn(el, binding, vnode, prevVNode);
  }
  var vShow = {
    beforeMount(el, { value }, { transition }) {
      el._vod = el.style.display === "none" ? "" : el.style.display;
      if (transition && value) {
        transition.beforeEnter(el);
      } else {
        setDisplay(el, value);
      }
    },
    mounted(el, { value }, { transition }) {
      if (transition && value) {
        transition.enter(el);
      }
    },
    updated(el, { value, oldValue }, { transition }) {
      if (!value === !oldValue)
        return;
      if (transition) {
        if (value) {
          transition.beforeEnter(el);
          setDisplay(el, true);
          transition.enter(el);
        } else {
          transition.leave(el, () => {
            setDisplay(el, false);
          });
        }
      } else {
        setDisplay(el, value);
      }
    },
    beforeUnmount(el, { value }) {
      setDisplay(el, value);
    }
  };
  function setDisplay(el, value) {
    el.style.display = value ? el._vod : "none";
  }
  var rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
  var renderer;
  function ensureRenderer() {
    return renderer || (renderer = createRenderer(rendererOptions));
  }
  var createApp = (...args) => {
    const app2 = ensureRenderer().createApp(...args);
    if (true) {
      injectNativeTagCheck(app2);
      injectCompilerOptionsCheck(app2);
    }
    const { mount } = app2;
    app2.mount = (containerOrSelector) => {
      const container = normalizeContainer(containerOrSelector);
      if (!container)
        return;
      const component = app2._component;
      if (!isFunction(component) && !component.render && !component.template) {
        component.template = container.innerHTML;
      }
      container.innerHTML = "";
      const proxy = mount(container, false, container instanceof SVGElement);
      if (container instanceof Element) {
        container.removeAttribute("v-cloak");
        container.setAttribute("data-v-app", "");
      }
      return proxy;
    };
    return app2;
  };
  function injectNativeTagCheck(app2) {
    Object.defineProperty(app2.config, "isNativeTag", {
      value: (tag) => isHTMLTag(tag) || isSVGTag(tag),
      writable: false
    });
  }
  function injectCompilerOptionsCheck(app2) {
    if (isRuntimeOnly()) {
      const isCustomElement = app2.config.isCustomElement;
      Object.defineProperty(app2.config, "isCustomElement", {
        get() {
          return isCustomElement;
        },
        set() {
          warn2(`The \`isCustomElement\` config option is deprecated. Use \`compilerOptions.isCustomElement\` instead.`);
        }
      });
      const compilerOptions = app2.config.compilerOptions;
      const msg = `The \`compilerOptions\` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, \`compilerOptions\` must be passed to \`@vue/compiler-dom\` in the build setup instead.
- For vue-loader: pass it via vue-loader's \`compilerOptions\` loader option.
- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader
- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-dom`;
      Object.defineProperty(app2.config, "compilerOptions", {
        get() {
          warn2(msg);
          return compilerOptions;
        },
        set() {
          warn2(msg);
        }
      });
    }
  }
  function normalizeContainer(container) {
    if (isString(container)) {
      const res = document.querySelector(container);
      if (!res) {
        warn2(`Failed to mount app: mount target selector "${container}" returned null.`);
      }
      return res;
    }
    if (window.ShadowRoot && container instanceof window.ShadowRoot && container.mode === "closed") {
      warn2(`mounting on a ShadowRoot with \`{mode: "closed"}\` may lead to unpredictable bugs`);
    }
    return container;
  }

  // node_modules/vue/dist/vue.runtime.esm-bundler.js
  function initDev() {
    {
      initCustomFormatter();
    }
  }
  if (true) {
    initDev();
  }

  // node_modules/vuetify/lib/util/helpers.mjs
  function _classPrivateFieldInitSpec(obj, privateMap, value) {
    _checkPrivateRedeclaration(obj, privateMap);
    privateMap.set(obj, value);
  }
  function _checkPrivateRedeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
      throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
  }
  function _classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");
    _classApplyDescriptorSet(receiver, descriptor, value);
    return value;
  }
  function _classApplyDescriptorSet(receiver, descriptor, value) {
    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        throw new TypeError("attempted to set read only private field");
      }
      descriptor.value = value;
    }
  }
  function _classPrivateFieldGet(receiver, privateMap) {
    var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");
    return _classApplyDescriptorGet(receiver, descriptor);
  }
  function _classExtractFieldDescriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to " + action + " private field on non-instance");
    }
    return privateMap.get(receiver);
  }
  function _classApplyDescriptorGet(receiver, descriptor) {
    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }
    return descriptor.value;
  }
  function getNestedValue(obj, path, fallback) {
    const last = path.length - 1;
    if (last < 0)
      return obj === void 0 ? fallback : obj;
    for (let i = 0; i < last; i++) {
      if (obj == null) {
        return fallback;
      }
      obj = obj[path[i]];
    }
    if (obj == null)
      return fallback;
    return obj[path[last]] === void 0 ? fallback : obj[path[last]];
  }
  function deepEqual(a, b) {
    if (a === b)
      return true;
    if (a instanceof Date && b instanceof Date && a.getTime() !== b.getTime()) {
      return false;
    }
    if (a !== Object(a) || b !== Object(b)) {
      return false;
    }
    const props = Object.keys(a);
    if (props.length !== Object.keys(b).length) {
      return false;
    }
    return props.every((p2) => deepEqual(a[p2], b[p2]));
  }
  function getObjectValueByPath(obj, path, fallback) {
    if (obj == null || !path || typeof path !== "string")
      return fallback;
    if (obj[path] !== void 0)
      return obj[path];
    path = path.replace(/\[(\w+)\]/g, ".$1");
    path = path.replace(/^\./, "");
    return getNestedValue(obj, path.split("."), fallback);
  }
  function getPropertyFromItem(item, property, fallback) {
    if (property == null)
      return item === void 0 ? fallback : item;
    if (item !== Object(item))
      return fallback;
    if (typeof property === "string")
      return getObjectValueByPath(item, property, fallback);
    if (Array.isArray(property))
      return getNestedValue(item, property, fallback);
    if (typeof property !== "function")
      return fallback;
    const value = property(item, fallback);
    return typeof value === "undefined" ? fallback : value;
  }
  function createRange(length) {
    let start = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    return Array.from({
      length
    }, (v, k) => start + k);
  }
  function convertToUnit(str) {
    let unit = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "px";
    if (str == null || str === "") {
      return void 0;
    } else if (isNaN(+str)) {
      return String(str);
    } else if (!isFinite(+str)) {
      return void 0;
    } else {
      return `${Number(str)}${unit}`;
    }
  }
  function isObject2(obj) {
    return obj !== null && typeof obj === "object" && !Array.isArray(obj);
  }
  function isComponentInstance(obj) {
    return obj == null ? void 0 : obj.$el;
  }
  var keyCodes = Object.freeze({
    enter: 13,
    tab: 9,
    delete: 46,
    esc: 27,
    space: 32,
    up: 38,
    down: 40,
    left: 37,
    right: 39,
    end: 35,
    home: 36,
    del: 46,
    backspace: 8,
    insert: 45,
    pageup: 33,
    pagedown: 34,
    shift: 16
  });
  var keyValues = Object.freeze({
    enter: "Enter",
    tab: "Tab",
    delete: "Delete",
    esc: "Escape",
    space: "Space",
    up: "ArrowUp",
    down: "ArrowDown",
    left: "ArrowLeft",
    right: "ArrowRight",
    end: "End",
    home: "Home",
    del: "Delete",
    backspace: "Backspace",
    insert: "Insert",
    pageup: "PageUp",
    pagedown: "PageDown",
    shift: "Shift"
  });
  function keys(o) {
    return Object.keys(o);
  }
  function pick(obj, paths) {
    const found = /* @__PURE__ */ Object.create(null);
    const rest = /* @__PURE__ */ Object.create(null);
    for (const key in obj) {
      if (paths.some((path) => path instanceof RegExp ? path.test(key) : path === key)) {
        found[key] = obj[key];
      } else {
        rest[key] = obj[key];
      }
    }
    return [found, rest];
  }
  function filterInputAttrs(attrs) {
    return pick(attrs, ["class", "style", "id", /^data-/]);
  }
  function wrapInArray(v) {
    return v == null ? [] : Array.isArray(v) ? v : [v];
  }
  function clamp(value) {
    let min = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    let max = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
    return Math.max(min, Math.min(max, value));
  }
  function padEnd(str, length) {
    let char = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0";
    return str + char.repeat(Math.max(0, length - str.length));
  }
  function chunk(str) {
    let size2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
    const chunked = [];
    let index = 0;
    while (index < str.length) {
      chunked.push(str.substr(index, size2));
      index += size2;
    }
    return chunked;
  }
  function humanReadableFileSize(bytes) {
    let base = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e3;
    if (bytes < base) {
      return `${bytes} B`;
    }
    const prefix = base === 1024 ? ["Ki", "Mi", "Gi"] : ["k", "M", "G"];
    let unit = -1;
    while (Math.abs(bytes) >= base && unit < prefix.length - 1) {
      bytes /= base;
      ++unit;
    }
    return `${bytes.toFixed(1)} ${prefix[unit]}B`;
  }
  function mergeDeep() {
    let source = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    let target = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    let arrayFn = arguments.length > 2 ? arguments[2] : void 0;
    const out = {};
    for (const key in source) {
      out[key] = source[key];
    }
    for (const key in target) {
      const sourceProperty = source[key];
      const targetProperty = target[key];
      if (isObject2(sourceProperty) && isObject2(targetProperty)) {
        out[key] = mergeDeep(sourceProperty, targetProperty, arrayFn);
        continue;
      }
      if (Array.isArray(sourceProperty) && Array.isArray(targetProperty) && arrayFn) {
        out[key] = arrayFn(sourceProperty, targetProperty);
        continue;
      }
      out[key] = targetProperty;
    }
    return out;
  }
  function flattenFragments(nodes) {
    return nodes.map((node) => {
      if (node.type === Fragment) {
        return flattenFragments(node.children);
      } else {
        return node;
      }
    }).flat();
  }
  function toKebabCase() {
    let str = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    return str.replace(/[^a-z]/gi, "-").replace(/\B([A-Z])/g, "-$1").toLowerCase();
  }
  function findChildrenWithProvide(key, vnode) {
    if (!vnode || typeof vnode !== "object")
      return [];
    if (Array.isArray(vnode)) {
      return vnode.map((child) => findChildrenWithProvide(key, child)).flat(1);
    } else if (Array.isArray(vnode.children)) {
      return vnode.children.map((child) => findChildrenWithProvide(key, child)).flat(1);
    } else if (vnode.component) {
      if (Object.getOwnPropertySymbols(vnode.component.provides).includes(key)) {
        return [vnode.component];
      } else if (vnode.component.subTree) {
        return findChildrenWithProvide(key, vnode.component.subTree).flat(1);
      }
    }
    return [];
  }
  var _arr = /* @__PURE__ */ new WeakMap();
  var _pointer = /* @__PURE__ */ new WeakMap();
  var CircularBuffer = class {
    constructor(size2) {
      _classPrivateFieldInitSpec(this, _arr, {
        writable: true,
        value: []
      });
      _classPrivateFieldInitSpec(this, _pointer, {
        writable: true,
        value: 0
      });
      this.size = size2;
    }
    push(val) {
      _classPrivateFieldGet(this, _arr)[_classPrivateFieldGet(this, _pointer)] = val;
      _classPrivateFieldSet(this, _pointer, (_classPrivateFieldGet(this, _pointer) + 1) % this.size);
    }
    values() {
      return _classPrivateFieldGet(this, _arr).slice(_classPrivateFieldGet(this, _pointer)).concat(_classPrivateFieldGet(this, _arr).slice(0, _classPrivateFieldGet(this, _pointer)));
    }
  };
  function getEventCoordinates(e) {
    if ("touches" in e) {
      return {
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY
      };
    }
    return {
      clientX: e.clientX,
      clientY: e.clientY
    };
  }
  function destructComputed(getter) {
    const refs = reactive({});
    const base = computed2(getter);
    watchEffect(() => {
      for (const key in base.value) {
        refs[key] = base.value[key];
      }
    }, {
      flush: "sync"
    });
    return toRefs(refs);
  }
  function includes(arr, val) {
    return arr.includes(val);
  }
  var onRE2 = /^on[^a-z]/;
  var isOn2 = (key) => onRE2.test(key);
  var EventProp = [Function, Array];
  function callEvent(handler) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    if (Array.isArray(handler)) {
      for (const h2 of handler) {
        h2(...args);
      }
    } else if (typeof handler === "function") {
      handler(...args);
    }
  }

  // node_modules/vuetify/lib/util/anchor.mjs
  var block = ["top", "bottom"];
  var inline = ["start", "end", "left", "right"];
  function parseAnchor(anchor, isRtl) {
    let [side, align] = anchor.split(" ");
    if (!align) {
      align = includes(block, side) ? "start" : includes(inline, side) ? "top" : "center";
    }
    return {
      side: toPhysical(side, isRtl),
      align: toPhysical(align, isRtl)
    };
  }
  function toPhysical(str, isRtl) {
    if (str === "start")
      return isRtl ? "right" : "left";
    if (str === "end")
      return isRtl ? "left" : "right";
    return str;
  }
  function flipSide(anchor) {
    return {
      side: {
        center: "center",
        top: "bottom",
        bottom: "top",
        left: "right",
        right: "left"
      }[anchor.side],
      align: anchor.align
    };
  }
  function flipAlign(anchor) {
    return {
      side: anchor.side,
      align: {
        center: "center",
        top: "bottom",
        bottom: "top",
        left: "right",
        right: "left"
      }[anchor.align]
    };
  }
  function flipCorner(anchor) {
    return {
      side: anchor.align,
      align: anchor.side
    };
  }
  function getAxis(anchor) {
    return includes(block, anchor.side) ? "y" : "x";
  }

  // node_modules/vuetify/lib/util/box.mjs
  var Box = class {
    constructor(_ref) {
      let {
        x,
        y,
        width,
        height
      } = _ref;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }
    get top() {
      return this.y;
    }
    get bottom() {
      return this.y + this.height;
    }
    get left() {
      return this.x;
    }
    get right() {
      return this.x + this.width;
    }
  };
  function getOverflow(a, b) {
    return {
      x: {
        before: Math.max(0, b.left - a.left),
        after: Math.max(0, a.right - b.right)
      },
      y: {
        before: Math.max(0, b.top - a.top),
        after: Math.max(0, a.bottom - b.bottom)
      }
    };
  }

  // node_modules/vuetify/lib/util/animation.mjs
  function nullifyTransforms(el) {
    const rect = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    const tx = style.transform;
    if (tx) {
      let ta, sx, sy, dx, dy;
      if (tx.startsWith("matrix3d(")) {
        ta = tx.slice(9, -1).split(/, /);
        sx = +ta[0];
        sy = +ta[5];
        dx = +ta[12];
        dy = +ta[13];
      } else if (tx.startsWith("matrix(")) {
        ta = tx.slice(7, -1).split(/, /);
        sx = +ta[0];
        sy = +ta[3];
        dx = +ta[4];
        dy = +ta[5];
      } else {
        return new Box(rect);
      }
      const to = style.transformOrigin;
      const x = rect.x - dx - (1 - sx) * parseFloat(to);
      const y = rect.y - dy - (1 - sy) * parseFloat(to.slice(to.indexOf(" ") + 1));
      const w = sx ? rect.width / sx : el.offsetWidth + 1;
      const h2 = sy ? rect.height / sy : el.offsetHeight + 1;
      return new Box({
        x,
        y,
        width: w,
        height: h2
      });
    } else {
      return new Box(rect);
    }
  }
  function animate(el, keyframes, options) {
    if (typeof el.animate === "undefined")
      return {
        finished: Promise.resolve()
      };
    const animation = el.animate(keyframes, options);
    if (typeof animation.finished === "undefined") {
      animation.finished = new Promise((resolve2) => {
        animation.onfinish = () => {
          resolve2(animation);
        };
      });
    }
    return animation;
  }

  // node_modules/vuetify/lib/util/console.mjs
  function createMessage(message, vm, parent) {
    if (parent) {
      vm = {
        _isVue: true,
        $parent: parent,
        $options: vm
      };
    }
    if (vm) {
      vm.$_alreadyWarned = vm.$_alreadyWarned || [];
      if (vm.$_alreadyWarned.includes(message))
        return;
      vm.$_alreadyWarned.push(message);
    }
    return `[Vuetify] ${message}` + (vm ? generateComponentTrace(vm) : "");
  }
  function consoleWarn(message, vm, parent) {
    const newMessage = createMessage(message, vm, parent);
    newMessage != null && console.warn(newMessage);
  }
  function consoleError(message, vm, parent) {
    const newMessage = createMessage(message, vm, parent);
    newMessage != null && console.error(newMessage);
  }
  var classifyRE2 = /(?:^|[-_])(\w)/g;
  var classify2 = (str) => str.replace(classifyRE2, (c) => c.toUpperCase()).replace(/[-_]/g, "");
  function formatComponentName2(vm, includeFile) {
    if (vm.$root === vm) {
      return "<Root>";
    }
    const options = typeof vm === "function" && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm || {};
    let name = options.name || options._componentTag;
    const file = options.__file;
    if (!name && file) {
      const match = file.match(/([^/\\]+)\.vue$/);
      name = match == null ? void 0 : match[1];
    }
    return (name ? `<${classify2(name)}>` : `<Anonymous>`) + (file && includeFile !== false ? ` at ${file}` : "");
  }
  function generateComponentTrace(vm) {
    if (vm._isVue && vm.$parent) {
      const tree = [];
      let currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          const last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue;
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return "\n\nfound in\n\n" + tree.map((vm2, i) => `${i === 0 ? "---> " : " ".repeat(5 + i * 2)}${Array.isArray(vm2) ? `${formatComponentName2(vm2[0])}... (${vm2[1]} recursive calls)` : formatComponentName2(vm2)}`).join("\n");
    } else {
      return `

(found in ${formatComponentName2(vm)})`;
    }
  }

  // node_modules/vuetify/lib/util/color/transformSRGB.mjs
  var srgbForwardMatrix = [[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.204, 1.057]];
  var srgbForwardTransform = (C) => C <= 31308e-7 ? C * 12.92 : 1.055 * C ** (1 / 2.4) - 0.055;
  var srgbReverseMatrix = [[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]];
  var srgbReverseTransform = (C) => C <= 0.04045 ? C / 12.92 : ((C + 0.055) / 1.055) ** 2.4;
  function fromXYZ(xyz) {
    const rgb2 = Array(3);
    const transform2 = srgbForwardTransform;
    const matrix = srgbForwardMatrix;
    for (let i = 0; i < 3; ++i) {
      rgb2[i] = Math.round(clamp(transform2(matrix[i][0] * xyz[0] + matrix[i][1] * xyz[1] + matrix[i][2] * xyz[2])) * 255);
    }
    return (rgb2[0] << 16) + (rgb2[1] << 8) + (rgb2[2] << 0);
  }
  function toXYZ(rgb2) {
    const xyz = [0, 0, 0];
    const transform2 = srgbReverseTransform;
    const matrix = srgbReverseMatrix;
    const r = transform2((rgb2 >> 16 & 255) / 255);
    const g = transform2((rgb2 >> 8 & 255) / 255);
    const b = transform2((rgb2 >> 0 & 255) / 255);
    for (let i = 0; i < 3; ++i) {
      xyz[i] = matrix[i][0] * r + matrix[i][1] * g + matrix[i][2] * b;
    }
    return xyz;
  }

  // node_modules/vuetify/lib/util/color/transformCIELAB.mjs
  var delta = 0.20689655172413793;
  var cielabForwardTransform = (t) => t > delta ** 3 ? Math.cbrt(t) : t / (3 * delta ** 2) + 4 / 29;
  var cielabReverseTransform = (t) => t > delta ? t ** 3 : 3 * delta ** 2 * (t - 4 / 29);
  function fromXYZ2(xyz) {
    const transform2 = cielabForwardTransform;
    const transformedY = transform2(xyz[1]);
    return [116 * transformedY - 16, 500 * (transform2(xyz[0] / 0.95047) - transformedY), 200 * (transformedY - transform2(xyz[2] / 1.08883))];
  }
  function toXYZ2(lab) {
    const transform2 = cielabReverseTransform;
    const Ln = (lab[0] + 16) / 116;
    return [transform2(Ln + lab[1] / 500) * 0.95047, transform2(Ln), transform2(Ln - lab[2] / 200) * 1.08883];
  }

  // node_modules/vuetify/lib/util/colorUtils.mjs
  function isCssColor(color) {
    return !!color && /^(#|var\(--|(rgb|hsl)a?\()/.test(color);
  }
  function colorToInt(color) {
    let rgb2;
    if (typeof color === "number") {
      rgb2 = color;
    } else if (typeof color === "string") {
      let c = color.startsWith("#") ? color.substring(1) : color;
      if (c.length === 3) {
        c = c.split("").map((char) => char + char).join("");
      }
      if (c.length !== 6 && c.length !== 8) {
        consoleWarn(`'${color}' is not a valid rgb color`);
      }
      rgb2 = parseInt(c, 16);
    } else {
      throw new TypeError(`Colors can only be numbers or strings, recieved ${color == null ? color : color.constructor.name} instead`);
    }
    if (rgb2 < 0) {
      consoleWarn(`Colors cannot be negative: '${color}'`);
      rgb2 = 0;
    } else if (rgb2 > 4294967295 || isNaN(rgb2)) {
      consoleWarn(`'${color}' is not a valid rgb color`);
      rgb2 = 16777215;
    }
    return rgb2;
  }
  function intToHex(color) {
    let hexColor = color.toString(16);
    if (hexColor.length < 6)
      hexColor = "0".repeat(6 - hexColor.length) + hexColor;
    return "#" + hexColor;
  }
  function HSVAtoRGBA(hsva) {
    const {
      h: h2,
      s,
      v,
      a
    } = hsva;
    const f = (n) => {
      const k = (n + h2 / 60) % 6;
      return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
    };
    const rgb2 = [f(5), f(3), f(1)].map((v2) => Math.round(v2 * 255));
    return {
      r: rgb2[0],
      g: rgb2[1],
      b: rgb2[2],
      a
    };
  }
  function RGBAtoHSVA(rgba2) {
    if (!rgba2)
      return {
        h: 0,
        s: 1,
        v: 1,
        a: 1
      };
    const r = rgba2.r / 255;
    const g = rgba2.g / 255;
    const b = rgba2.b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h2 = 0;
    if (max !== min) {
      if (max === r) {
        h2 = 60 * (0 + (g - b) / (max - min));
      } else if (max === g) {
        h2 = 60 * (2 + (b - r) / (max - min));
      } else if (max === b) {
        h2 = 60 * (4 + (r - g) / (max - min));
      }
    }
    if (h2 < 0)
      h2 = h2 + 360;
    const s = max === 0 ? 0 : (max - min) / max;
    const hsv = [h2, s, max];
    return {
      h: hsv[0],
      s: hsv[1],
      v: hsv[2],
      a: rgba2.a
    };
  }
  function HSVAtoHSLA(hsva) {
    const {
      h: h2,
      s,
      v,
      a
    } = hsva;
    const l = v - v * s / 2;
    const sprime = l === 1 || l === 0 ? 0 : (v - l) / Math.min(l, 1 - l);
    return {
      h: h2,
      s: sprime,
      l,
      a
    };
  }
  function HSLAtoHSVA(hsl2) {
    const {
      h: h2,
      s,
      l,
      a
    } = hsl2;
    const v = l + s * Math.min(l, 1 - l);
    const sprime = v === 0 ? 0 : 2 - 2 * l / v;
    return {
      h: h2,
      s: sprime,
      v,
      a
    };
  }
  function RGBAtoCSS(rgba2) {
    return `rgba(${rgba2.r}, ${rgba2.g}, ${rgba2.b}, ${rgba2.a})`;
  }
  function HSVAtoCSS(hsva) {
    return RGBAtoCSS(HSVAtoRGBA(hsva));
  }
  function RGBAtoHex(rgba2) {
    const toHex = (v) => {
      const h2 = Math.round(v).toString(16);
      return ("00".substr(0, 2 - h2.length) + h2).toUpperCase();
    };
    return `#${[toHex(rgba2.r), toHex(rgba2.g), toHex(rgba2.b), toHex(Math.round(rgba2.a * 255))].join("")}`;
  }
  function HexToRGBA(hex2) {
    const rgba2 = chunk(hex2.slice(1), 2).map((c) => parseInt(c, 16));
    return {
      r: rgba2[0],
      g: rgba2[1],
      b: rgba2[2],
      a: Math.round(rgba2[3] / 255 * 100) / 100
    };
  }
  function HexToHSVA(hex2) {
    const rgb2 = HexToRGBA(hex2);
    return RGBAtoHSVA(rgb2);
  }
  function HSVAtoHex(hsva) {
    return RGBAtoHex(HSVAtoRGBA(hsva));
  }
  function parseHex(hex2) {
    if (hex2.startsWith("#")) {
      hex2 = hex2.slice(1);
    }
    hex2 = hex2.replace(/([^0-9a-f])/gi, "F");
    if (hex2.length === 3 || hex2.length === 4) {
      hex2 = hex2.split("").map((x) => x + x).join("");
    }
    if (hex2.length === 6) {
      hex2 = padEnd(hex2, 8, "F");
    } else {
      hex2 = padEnd(padEnd(hex2, 6), 8, "F");
    }
    return `#${hex2}`.toUpperCase().substr(0, 9);
  }
  function colorToRGB(color) {
    const int = colorToInt(color);
    return {
      r: (int & 16711680) >> 16,
      g: (int & 65280) >> 8,
      b: int & 255
    };
  }
  function lighten(value, amount) {
    const lab = fromXYZ2(toXYZ(value));
    lab[0] = lab[0] + amount * 10;
    return fromXYZ(toXYZ2(lab));
  }
  function darken(value, amount) {
    const lab = fromXYZ2(toXYZ(value));
    lab[0] = lab[0] - amount * 10;
    return fromXYZ(toXYZ2(lab));
  }
  function getLuma(color) {
    const rgb2 = colorToInt(color);
    return toXYZ(rgb2)[1];
  }
  function getContrast(first, second) {
    const l1 = getLuma(first);
    const l2 = getLuma(second);
    const light = Math.max(l1, l2);
    const dark = Math.min(l1, l2);
    return (light + 0.05) / (dark + 0.05);
  }

  // node_modules/vuetify/lib/util/getCurrentInstance.mjs
  function getCurrentInstance2(name, message) {
    const vm = getCurrentInstance();
    if (!vm) {
      throw new Error(`[Vuetify] ${name} ${message || "must be called from inside a setup function"}`);
    }
    return vm;
  }
  function getCurrentInstanceName() {
    let name = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "composables";
    const vm = getCurrentInstance2(name).type;
    return toKebabCase((vm == null ? void 0 : vm.aliasName) || (vm == null ? void 0 : vm.name));
  }
  var _uid = 0;
  var _map = /* @__PURE__ */ new WeakMap();
  function getUid() {
    const vm = getCurrentInstance2("getUid");
    if (_map.has(vm))
      return _map.get(vm);
    else {
      const uid2 = _uid++;
      _map.set(vm, uid2);
      return uid2;
    }
  }
  getUid.reset = () => {
    _uid = 0;
    _map = /* @__PURE__ */ new WeakMap();
  };

  // node_modules/vuetify/lib/util/injectSelf.mjs
  function injectSelf(key) {
    const {
      provides
    } = getCurrentInstance2("injectSelf");
    if (provides && key in provides) {
      return provides[key];
    }
  }

  // node_modules/vuetify/lib/util/defineComponent.mjs
  function propIsDefined(vnode, prop) {
    var _vnode$props, _vnode$props2;
    return ((_vnode$props = vnode.props) == null ? void 0 : _vnode$props.hasOwnProperty(prop)) || ((_vnode$props2 = vnode.props) == null ? void 0 : _vnode$props2.hasOwnProperty(toKebabCase(prop)));
  }
  var defineComponent2 = function defineComponent3(options) {
    options._setup = options._setup ?? options.setup;
    if (!options.name) {
      consoleWarn("The component is missing an explicit name, unable to generate default prop value");
      return options;
    }
    if (options._setup) {
      options.props = options.props ?? {};
      options.props._as = String;
      options.setup = function setup(props, ctx) {
        const vm = getCurrentInstance();
        const defaults = useDefaults();
        const _subcomponentDefaults = shallowRef();
        const _props = shallowReactive({
          ...toRaw(props)
        });
        watchEffect(() => {
          const globalDefaults = defaults.value.global;
          const componentDefaults = defaults.value[props._as ?? options.name];
          if (componentDefaults) {
            const subComponents = Object.entries(componentDefaults).filter((_ref) => {
              let [key] = _ref;
              return key.startsWith("V");
            });
            if (subComponents.length)
              _subcomponentDefaults.value = Object.fromEntries(subComponents);
          }
          for (const prop of Object.keys(props)) {
            let newVal;
            if (propIsDefined(vm.vnode, prop)) {
              newVal = props[prop];
            } else {
              newVal = (componentDefaults == null ? void 0 : componentDefaults[prop]) ?? (globalDefaults == null ? void 0 : globalDefaults[prop]) ?? props[prop];
            }
            if (_props[prop] !== newVal) {
              _props[prop] = newVal;
            }
          }
        });
        const setupBindings = options._setup(_props, ctx);
        let scope;
        watch(_subcomponentDefaults, (val, oldVal) => {
          if (!val && scope)
            scope.stop();
          else if (val && !oldVal) {
            scope = effectScope();
            scope.run(() => {
              var _injectSelf;
              provideDefaults(mergeDeep(((_injectSelf = injectSelf(DefaultsSymbol)) == null ? void 0 : _injectSelf.value) ?? {}, val));
            });
          }
        }, {
          immediate: true
        });
        return setupBindings;
      };
    }
    return options;
  };
  function genericComponent() {
    let exposeDefaults = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
    return (options) => (exposeDefaults ? defineComponent2 : defineComponent)(options);
  }

  // node_modules/vuetify/lib/util/createSimpleFunctional.mjs
  function createSimpleFunctional(klass) {
    let tag = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "div";
    let name = arguments.length > 2 ? arguments[2] : void 0;
    return defineComponent2({
      name: name ?? capitalize(camelize(klass.replace(/__/g, "-"))),
      props: {
        tag: {
          type: String,
          default: tag
        }
      },
      setup(props, _ref) {
        let {
          slots
        } = _ref;
        return () => {
          var _slots$default;
          return h(props.tag, {
            class: klass
          }, (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots));
        };
      }
    });
  }

  // node_modules/vuetify/lib/util/dom.mjs
  function attachedRoot(node) {
    if (typeof node.getRootNode !== "function") {
      while (node.parentNode)
        node = node.parentNode;
      if (node !== document)
        return null;
      return document;
    }
    const root = node.getRootNode();
    if (root !== document && root.getRootNode({
      composed: true
    }) !== document)
      return null;
    return root;
  }

  // node_modules/vuetify/lib/util/easing.mjs
  var standardEasing = "cubic-bezier(0.4, 0, 0.2, 1)";
  var deceleratedEasing = "cubic-bezier(0.0, 0, 0.2, 1)";
  var acceleratedEasing = "cubic-bezier(0.4, 0, 1, 1)";

  // node_modules/vuetify/lib/util/getScrollParent.mjs
  function getScrollParent(el) {
    while (el) {
      if (hasScrollbar(el))
        return el;
      el = el.parentElement;
    }
    return document.scrollingElement;
  }
  function getScrollParents(el, stopAt) {
    const elements = [];
    if (stopAt && el && !stopAt.contains(el))
      return elements;
    while (el) {
      if (hasScrollbar(el))
        elements.push(el);
      if (el === stopAt)
        break;
      el = el.parentElement;
    }
    return elements;
  }
  function hasScrollbar(el) {
    if (!el || el.nodeType !== Node.ELEMENT_NODE)
      return false;
    const style = window.getComputedStyle(el);
    return style.overflowY === "scroll" || style.overflowY === "auto" && el.scrollHeight > el.clientHeight;
  }

  // node_modules/vuetify/lib/util/globals.mjs
  var IN_BROWSER = typeof window !== "undefined";
  var SUPPORTS_INTERSECTION = IN_BROWSER && "IntersectionObserver" in window;
  var SUPPORTS_TOUCH = IN_BROWSER && ("ontouchstart" in window || window.navigator.maxTouchPoints > 0);
  var SUPPORTS_FOCUS_VISIBLE = IN_BROWSER && typeof CSS !== "undefined" && CSS.supports("selector(:focus-visible)");

  // node_modules/vuetify/lib/util/isFixedPosition.mjs
  function isFixedPosition(el) {
    while (el) {
      if (window.getComputedStyle(el).position === "fixed") {
        return true;
      }
      el = el.offsetParent;
    }
    return false;
  }

  // node_modules/vuetify/lib/util/propsFactory.mjs
  function propsFactory(props, source) {
    return (defaults) => {
      return Object.keys(props).reduce((obj, prop) => {
        const isObjectDefinition = typeof props[prop] === "object" && props[prop] != null && !Array.isArray(props[prop]);
        const definition = isObjectDefinition ? props[prop] : {
          type: props[prop]
        };
        if (defaults && prop in defaults) {
          obj[prop] = {
            ...definition,
            default: defaults[prop]
          };
        } else {
          obj[prop] = definition;
        }
        if (source) {
          obj[prop].source = source;
        }
        return obj;
      }, {});
    };
  }

  // node_modules/vuetify/lib/util/useRender.mjs
  function useRender(render2) {
    const vm = getCurrentInstance2("useRender");
    vm.render = render2;
  }

  // node_modules/vuetify/lib/composables/defaults.mjs
  var DefaultsSymbol = Symbol.for("vuetify:defaults");
  function createDefaults(options) {
    return ref(options ?? {});
  }
  function useDefaults() {
    const defaults = inject(DefaultsSymbol);
    if (!defaults)
      throw new Error("[Vuetify] Could not find defaults instance");
    return defaults;
  }
  function provideDefaults(defaults, options) {
    const injectedDefaults = useDefaults();
    const providedDefaults = ref(defaults);
    const newDefaults = computed2(() => {
      const scoped = unref(options == null ? void 0 : options.scoped);
      const reset2 = unref(options == null ? void 0 : options.reset);
      const root = unref(options == null ? void 0 : options.root);
      let properties = mergeDeep(providedDefaults.value, {
        prev: injectedDefaults.value
      });
      if (scoped)
        return properties;
      if (reset2 || root) {
        const len = Number(reset2 || Infinity);
        for (let i = 0; i <= len; i++) {
          if (!properties.prev)
            break;
          properties = properties.prev;
        }
        return properties;
      }
      return mergeDeep(properties.prev, properties);
    });
    provide(DefaultsSymbol, newDefaults);
    return newDefaults;
  }

  // node_modules/vuetify/lib/composables/display.mjs
  var DisplaySymbol = Symbol.for("vuetify:display");
  var defaultDisplayOptions = {
    mobileBreakpoint: "lg",
    thresholds: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
      xxl: 2560
    }
  };
  var parseDisplayOptions = function() {
    let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : defaultDisplayOptions;
    return mergeDeep(defaultDisplayOptions, options);
  };
  function getClientWidth(isHydrate) {
    return IN_BROWSER && !isHydrate ? window.innerWidth : 0;
  }
  function getClientHeight(isHydrate) {
    return IN_BROWSER && !isHydrate ? window.innerHeight : 0;
  }
  function getPlatform() {
    const userAgent = IN_BROWSER ? window.navigator.userAgent : "ssr";
    function match(regexp) {
      return Boolean(userAgent.match(regexp));
    }
    const android = match(/android/i);
    const ios = match(/iphone|ipad|ipod/i);
    const cordova = match(/cordova/i);
    const electron = match(/electron/i);
    const chrome = match(/chrome/i);
    const edge = match(/edge/i);
    const firefox = match(/firefox/i);
    const opera = match(/opera/i);
    const win = match(/win/i);
    const mac = match(/mac/i);
    const linux = match(/linux/i);
    const ssr = match(/ssr/i);
    return {
      android,
      ios,
      cordova,
      electron,
      chrome,
      edge,
      firefox,
      opera,
      win,
      mac,
      linux,
      touch: SUPPORTS_TOUCH,
      ssr
    };
  }
  function createDisplay(options, isHydrate) {
    const {
      thresholds,
      mobileBreakpoint
    } = parseDisplayOptions(options);
    const height = ref(getClientHeight(isHydrate));
    const platform = getPlatform();
    const state = reactive({});
    const width = ref(getClientWidth(isHydrate));
    function onResize() {
      height.value = getClientHeight();
      width.value = getClientWidth();
    }
    if (isHydrate && IN_BROWSER) {
      requestAnimationFrame(() => onResize());
    }
    watchEffect(() => {
      const xs = width.value < thresholds.sm;
      const sm = width.value < thresholds.md && !xs;
      const md = width.value < thresholds.lg && !(sm || xs);
      const lg = width.value < thresholds.xl && !(md || sm || xs);
      const xl = width.value < thresholds.xxl && !(lg || md || sm || xs);
      const xxl = width.value >= thresholds.xxl;
      const name = xs ? "xs" : sm ? "sm" : md ? "md" : lg ? "lg" : xl ? "xl" : "xxl";
      const breakpointValue = typeof mobileBreakpoint === "number" ? mobileBreakpoint : thresholds[mobileBreakpoint];
      const mobile = !platform.ssr ? width.value < breakpointValue : platform.android || platform.ios || platform.opera;
      state.xs = xs;
      state.sm = sm;
      state.md = md;
      state.lg = lg;
      state.xl = xl;
      state.xxl = xxl;
      state.smAndUp = !xs;
      state.mdAndUp = !(xs || sm);
      state.lgAndUp = !(xs || sm || md);
      state.xlAndUp = !(xs || sm || md || lg);
      state.smAndDown = !(md || lg || xl || xxl);
      state.mdAndDown = !(lg || xl || xxl);
      state.lgAndDown = !(xl || xxl);
      state.xlAndDown = !xxl;
      state.name = name;
      state.height = height.value;
      state.width = width.value;
      state.mobile = mobile;
      state.mobileBreakpoint = mobileBreakpoint;
      state.platform = platform;
      state.thresholds = thresholds;
    });
    if (IN_BROWSER) {
      window.addEventListener("resize", onResize, {
        passive: true
      });
    }
    return toRefs(state);
  }
  function useDisplay() {
    const display = inject(DisplaySymbol);
    if (!display)
      throw new Error("Could not find Vuetify display injection");
    return display;
  }

  // node_modules/vuetify/lib/iconsets/mdi.mjs
  var aliases = {
    collapse: "mdi-chevron-up",
    complete: "mdi-check",
    cancel: "mdi-close-circle",
    close: "mdi-close",
    delete: "mdi-close-circle",
    clear: "mdi-close-circle",
    success: "mdi-check-circle",
    info: "mdi-information",
    warning: "mdi-alert-circle",
    error: "mdi-close-circle",
    prev: "mdi-chevron-left",
    next: "mdi-chevron-right",
    checkboxOn: "mdi-checkbox-marked",
    checkboxOff: "mdi-checkbox-blank-outline",
    checkboxIndeterminate: "mdi-minus-box",
    delimiter: "mdi-circle",
    sort: "mdi-arrow-up",
    expand: "mdi-chevron-down",
    menu: "mdi-menu",
    subgroup: "mdi-menu-down",
    dropdown: "mdi-menu-down",
    radioOn: "mdi-radiobox-marked",
    radioOff: "mdi-radiobox-blank",
    edit: "mdi-pencil",
    ratingEmpty: "mdi-star-outline",
    ratingFull: "mdi-star",
    ratingHalf: "mdi-star-half-full",
    loading: "mdi-cached",
    first: "mdi-page-first",
    last: "mdi-page-last",
    unfold: "mdi-unfold-more-horizontal",
    file: "mdi-paperclip",
    plus: "mdi-plus",
    minus: "mdi-minus"
  };
  var mdi = {
    component: (props) => h(VClassIcon, {
      ...props,
      class: "mdi"
    })
  };

  // node_modules/vuetify/lib/composables/icons.mjs
  var IconValue = [String, Function, Object];
  var IconSymbol = Symbol.for("vuetify:icons");
  var makeIconProps = propsFactory({
    icon: {
      type: IconValue,
      required: true
    },
    tag: {
      type: String,
      required: true
    }
  }, "icon");
  var VComponentIcon = defineComponent2({
    name: "VComponentIcon",
    props: makeIconProps(),
    setup(props) {
      return () => {
        return createVNode(props.tag, null, {
          default: () => [createVNode(props.icon, null, null)]
        });
      };
    }
  });
  var VSvgIcon = defineComponent2({
    name: "VSvgIcon",
    inheritAttrs: false,
    props: makeIconProps(),
    setup(props, _ref) {
      let {
        attrs
      } = _ref;
      return () => {
        return createVNode(props.tag, mergeProps(attrs, {
          "style": null
        }), {
          default: () => [createVNode("svg", {
            "class": "v-icon__svg",
            "xmlns": "http://www.w3.org/2000/svg",
            "viewBox": "0 0 24 24",
            "role": "img",
            "aria-hidden": "true"
          }, [createVNode("path", {
            "d": props.icon
          }, null)])]
        });
      };
    }
  });
  var VLigatureIcon = defineComponent2({
    name: "VLigatureIcon",
    props: makeIconProps(),
    setup(props) {
      return () => {
        return createVNode(props.tag, null, {
          default: () => [props.icon]
        });
      };
    }
  });
  var VClassIcon = defineComponent2({
    name: "VClassIcon",
    props: makeIconProps(),
    setup(props) {
      return () => {
        return createVNode(props.tag, {
          "class": props.icon
        }, null);
      };
    }
  });
  var defaultSets = {
    svg: {
      component: VSvgIcon
    },
    class: {
      component: VClassIcon
    }
  };
  function createIcons(options) {
    return mergeDeep({
      defaultSet: "mdi",
      sets: {
        ...defaultSets,
        mdi
      },
      aliases
    }, options);
  }
  var useIcon = (props) => {
    const icons = inject(IconSymbol);
    if (!icons)
      throw new Error("Missing Vuetify Icons provide!");
    const iconData = computed2(() => {
      const iconAlias = isRef(props) ? props.value : props.icon;
      if (!iconAlias)
        throw new Error("Icon value is undefined or null");
      let icon = iconAlias;
      if (typeof iconAlias === "string" && iconAlias.includes("$")) {
        var _icons$aliases;
        icon = (_icons$aliases = icons.aliases) == null ? void 0 : _icons$aliases[iconAlias.slice(iconAlias.indexOf("$") + 1)];
      }
      if (!icon)
        throw new Error(`Could not find aliased icon "${iconAlias}"`);
      if (typeof icon !== "string") {
        return {
          component: VComponentIcon,
          icon
        };
      }
      const iconSetName = Object.keys(icons.sets).find((setName) => typeof icon === "string" && icon.startsWith(`${setName}:`));
      const iconName = iconSetName ? icon.slice(iconSetName.length + 1) : icon;
      const iconSet = icons.sets[iconSetName ?? icons.defaultSet];
      return {
        component: iconSet.component,
        icon: iconName
      };
    });
    return {
      iconData
    };
  };

  // node_modules/vuetify/lib/locale/en.mjs
  var en_default = {
    badge: "Badge",
    close: "Close",
    dataIterator: {
      noResultsText: "No matching records found",
      loadingText: "Loading items..."
    },
    dataTable: {
      itemsPerPageText: "Rows per page:",
      ariaLabel: {
        sortDescending: "Sorted descending.",
        sortAscending: "Sorted ascending.",
        sortNone: "Not sorted.",
        activateNone: "Activate to remove sorting.",
        activateDescending: "Activate to sort descending.",
        activateAscending: "Activate to sort ascending."
      },
      sortBy: "Sort by"
    },
    dataFooter: {
      itemsPerPageText: "Items per page:",
      itemsPerPageAll: "All",
      nextPage: "Next page",
      prevPage: "Previous page",
      firstPage: "First page",
      lastPage: "Last page",
      pageText: "{0}-{1} of {2}"
    },
    datePicker: {
      itemsSelected: "{0} selected",
      nextMonthAriaLabel: "Next month",
      nextYearAriaLabel: "Next year",
      prevMonthAriaLabel: "Previous month",
      prevYearAriaLabel: "Previous year"
    },
    noDataText: "No data available",
    carousel: {
      prev: "Previous visual",
      next: "Next visual",
      ariaLabel: {
        delimiter: "Carousel slide {0} of {1}"
      }
    },
    calendar: {
      moreEvents: "{0} more"
    },
    input: {
      clear: "Clear {0}",
      prependAction: "{0} prepended action",
      appendAction: "{0} appended action"
    },
    fileInput: {
      counter: "{0} files",
      counterSize: "{0} files ({1} in total)"
    },
    timePicker: {
      am: "AM",
      pm: "PM"
    },
    pagination: {
      ariaLabel: {
        root: "Pagination Navigation",
        next: "Next page",
        previous: "Previous page",
        page: "Goto Page {0}",
        currentPage: "Page {0}, Current Page",
        first: "First page",
        last: "Last page"
      }
    },
    rating: {
      ariaLabel: {
        item: "Rating {0} of {1}"
      }
    }
  };

  // node_modules/vuetify/lib/locale/index.mjs
  var rtl = {
    af: false,
    ar: true,
    bg: false,
    ca: false,
    ckb: false,
    cs: false,
    de: false,
    el: false,
    en: false,
    es: false,
    et: false,
    fa: false,
    fi: false,
    fr: false,
    hr: false,
    hu: false,
    he: true,
    id: false,
    it: false,
    ja: false,
    ko: false,
    lv: false,
    lt: false,
    nl: false,
    no: false,
    pl: false,
    pt: false,
    ro: false,
    ru: false,
    sk: false,
    sl: false,
    srCyrl: false,
    srLatn: false,
    sv: false,
    th: false,
    tr: false,
    az: false,
    uk: false,
    vi: false,
    zhHans: false,
    zhHant: false
  };

  // node_modules/vuetify/lib/composables/rtl.mjs
  var RtlSymbol = Symbol.for("vuetify:rtl");
  function createRtl(localeScope, options) {
    return createRtlScope({
      rtl: {
        ...rtl,
        ...(options == null ? void 0 : options.rtl) ?? {}
      },
      isRtl: ref(false),
      rtlClasses: ref("")
    }, localeScope);
  }
  function createRtlScope(currentScope, localeScope, options) {
    const isRtl = computed2(() => {
      if (typeof (options == null ? void 0 : options.rtl) === "boolean")
        return options.rtl;
      if (localeScope.current.value && currentScope.rtl.hasOwnProperty(localeScope.current.value)) {
        return currentScope.rtl[localeScope.current.value];
      }
      return currentScope.isRtl.value;
    });
    return {
      isRtl,
      rtl: currentScope.rtl,
      rtlClasses: computed2(() => `v-locale--is-${isRtl.value ? "rtl" : "ltr"}`)
    };
  }
  function provideRtl(props, localeScope) {
    const currentScope = inject(RtlSymbol);
    if (!currentScope)
      throw new Error("[Vuetify] Could not find injected rtl instance");
    const newScope = createRtlScope(currentScope, localeScope, props);
    provide(RtlSymbol, newScope);
    return newScope;
  }
  function useRtl() {
    const currentScope = inject(RtlSymbol);
    if (!currentScope)
      throw new Error("[Vuetify] Could not find injected rtl instance");
    return currentScope;
  }

  // node_modules/vuetify/lib/composables/locale.mjs
  var LocaleAdapterSymbol = Symbol.for("vuetify:locale-adapter");
  var VuetifyLocaleSymbol = Symbol.for("vuetify:locale");
  function provideLocale(props) {
    const adapter = inject(LocaleAdapterSymbol);
    if (!adapter)
      throw new Error("[Vuetify] Could not find injected locale adapter");
    return adapter.createScope(props);
  }
  function useLocale() {
    const adapter = inject(LocaleAdapterSymbol);
    if (!adapter)
      throw new Error("[Vuetify] Could not find injected locale adapter");
    return adapter.getScope();
  }
  function isLocaleAdapter(x) {
    return !!x && x.hasOwnProperty("getScope") && x.hasOwnProperty("createScope") && x.hasOwnProperty("createRoot");
  }
  function createLocale(app2, options) {
    const adapter = isLocaleAdapter(options) ? options : createDefaultLocaleAdapter(options);
    function install(app3) {
      const instance = adapter.createRoot(app3);
      app3.provide(RtlSymbol, createRtl(instance, options));
    }
    return {
      adapter,
      install
    };
  }
  var LANG_PREFIX = "$vuetify.";
  var replace = (str, params) => {
    return str.replace(/\{(\d+)\}/g, (match, index) => {
      return String(params[+index]);
    });
  };
  var createTranslateFunction = (current, fallback, messages) => {
    return function(key) {
      for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }
      if (!key.startsWith(LANG_PREFIX)) {
        return replace(key, params);
      }
      const shortKey = key.replace(LANG_PREFIX, "");
      const currentLocale = current.value && messages.value[current.value];
      const fallbackLocale = fallback.value && messages.value[fallback.value];
      let str = getObjectValueByPath(currentLocale, shortKey, null);
      if (!str) {
        consoleWarn(`Translation key "${key}" not found in "${current.value}", trying fallback locale`);
        str = getObjectValueByPath(fallbackLocale, shortKey, null);
      }
      if (!str) {
        consoleError(`Translation key "${key}" not found in fallback`);
        str = key;
      }
      if (typeof str !== "string") {
        consoleError(`Translation key "${key}" has a non-string value`);
        str = key;
      }
      return replace(str, params);
    };
  };
  function createNumberFunction(current, fallback) {
    return (value, options) => {
      const numberFormat = new Intl.NumberFormat([current.value, fallback.value], options);
      return numberFormat.format(value);
    };
  }
  function createDefaultLocaleAdapter(options) {
    const createScope = (options2) => {
      const current = ref(options2.current);
      const fallback = ref(options2.fallback);
      const messages = ref(options2.messages);
      return {
        current,
        fallback,
        messages,
        t: createTranslateFunction(current, fallback, messages),
        n: createNumberFunction(current, fallback)
      };
    };
    return {
      createRoot: (app2) => {
        const rootScope = createScope({
          current: (options == null ? void 0 : options.defaultLocale) ?? "en",
          fallback: (options == null ? void 0 : options.fallbackLocale) ?? "en",
          messages: (options == null ? void 0 : options.messages) ?? {
            en: en_default
          }
        });
        if (!app2)
          throw new Error("[Vuetify] Could not find default app instance");
        app2.provide(VuetifyLocaleSymbol, rootScope);
        return rootScope;
      },
      getScope: () => {
        const currentScope = inject(VuetifyLocaleSymbol);
        if (!currentScope)
          throw new Error("[Vuetify] Could not find injected locale instance");
        return currentScope;
      },
      createScope: (options2) => {
        const currentScope = inject(VuetifyLocaleSymbol);
        if (!currentScope)
          throw new Error("[Vuetify] Could not find injected locale instance");
        const newScope = createScope({
          current: computed2(() => (options2 == null ? void 0 : options2.locale) ?? currentScope.current.value),
          fallback: computed2(() => (options2 == null ? void 0 : options2.locale) ?? currentScope.fallback.value),
          messages: computed2(() => (options2 == null ? void 0 : options2.messages) ?? currentScope.messages.value)
        });
        provide(VuetifyLocaleSymbol, newScope);
        return newScope;
      }
    };
  }

  // node_modules/vuetify/lib/util/color/APCA.mjs
  var mainTRC = 2.4;
  var Rco = 0.2126729;
  var Gco = 0.7151522;
  var Bco = 0.072175;
  var normBG = 0.55;
  var normTXT = 0.58;
  var revTXT = 0.57;
  var revBG = 0.62;
  var blkThrs = 0.03;
  var blkClmp = 1.45;
  var deltaYmin = 5e-4;
  var scaleBoW = 1.25;
  var scaleWoB = 1.25;
  var loConThresh = 0.078;
  var loConFactor = 12.82051282051282;
  var loConOffset = 0.06;
  var loClip = 1e-3;
  function APCAcontrast(text, background) {
    const Rtxt = ((text >> 16 & 255) / 255) ** mainTRC;
    const Gtxt = ((text >> 8 & 255) / 255) ** mainTRC;
    const Btxt = ((text >> 0 & 255) / 255) ** mainTRC;
    const Rbg = ((background >> 16 & 255) / 255) ** mainTRC;
    const Gbg = ((background >> 8 & 255) / 255) ** mainTRC;
    const Bbg = ((background >> 0 & 255) / 255) ** mainTRC;
    let Ytxt = Rtxt * Rco + Gtxt * Gco + Btxt * Bco;
    let Ybg = Rbg * Rco + Gbg * Gco + Bbg * Bco;
    if (Ytxt <= blkThrs)
      Ytxt += (blkThrs - Ytxt) ** blkClmp;
    if (Ybg <= blkThrs)
      Ybg += (blkThrs - Ybg) ** blkClmp;
    if (Math.abs(Ybg - Ytxt) < deltaYmin)
      return 0;
    let outputContrast;
    if (Ybg > Ytxt) {
      const SAPC = (Ybg ** normBG - Ytxt ** normTXT) * scaleBoW;
      outputContrast = SAPC < loClip ? 0 : SAPC < loConThresh ? SAPC - SAPC * loConFactor * loConOffset : SAPC - loConOffset;
    } else {
      const SAPC = (Ybg ** revBG - Ytxt ** revTXT) * scaleWoB;
      outputContrast = SAPC > -loClip ? 0 : SAPC > -loConThresh ? SAPC - SAPC * loConFactor * loConOffset : SAPC + loConOffset;
    }
    return outputContrast * 100;
  }

  // node_modules/vuetify/lib/composables/theme.mjs
  var ThemeSymbol = Symbol.for("vuetify:theme");
  var makeThemeProps = propsFactory({
    theme: String
  }, "theme");
  var defaultThemeOptions = {
    defaultTheme: "light",
    variations: {
      colors: [],
      lighten: 0,
      darken: 0
    },
    themes: {
      light: {
        dark: false,
        colors: {
          background: "#FFFFFF",
          surface: "#FFFFFF",
          "surface-variant": "#424242",
          "on-surface-variant": "#EEEEEE",
          primary: "#6200EE",
          "primary-darken-1": "#3700B3",
          secondary: "#03DAC6",
          "secondary-darken-1": "#018786",
          error: "#B00020",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FB8C00"
        },
        variables: {
          "border-color": "#000000",
          "border-opacity": 0.12,
          "high-emphasis-opacity": 0.87,
          "medium-emphasis-opacity": 0.6,
          "disabled-opacity": 0.38,
          "idle-opacity": 0.04,
          "hover-opacity": 0.04,
          "focus-opacity": 0.12,
          "selected-opacity": 0.08,
          "activated-opacity": 0.12,
          "pressed-opacity": 0.12,
          "dragged-opacity": 0.08,
          "kbd-background-color": "#212529",
          "kbd-color": "#FFFFFF",
          "code-background-color": "#C2C2C2"
        }
      },
      dark: {
        dark: true,
        colors: {
          background: "#121212",
          surface: "#212121",
          "surface-variant": "#BDBDBD",
          "on-surface-variant": "#424242",
          primary: "#BB86FC",
          "primary-darken-1": "#3700B3",
          secondary: "#03DAC5",
          "secondary-darken-1": "#03DAC5",
          error: "#CF6679",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FB8C00"
        },
        variables: {
          "border-color": "#FFFFFF",
          "border-opacity": 0.12,
          "high-emphasis-opacity": 0.87,
          "medium-emphasis-opacity": 0.6,
          "disabled-opacity": 0.38,
          "idle-opacity": 0.1,
          "hover-opacity": 0.04,
          "focus-opacity": 0.12,
          "selected-opacity": 0.08,
          "activated-opacity": 0.12,
          "pressed-opacity": 0.16,
          "dragged-opacity": 0.08,
          "kbd-background-color": "#212529",
          "kbd-color": "#FFFFFF",
          "code-background-color": "#B7B7B7"
        }
      }
    }
  };
  function parseThemeOptions() {
    let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : defaultThemeOptions;
    if (!options)
      return {
        ...defaultThemeOptions,
        isDisabled: true
      };
    const themes = {};
    for (const [key, theme] of Object.entries(options.themes ?? {})) {
      var _defaultThemeOptions$, _defaultThemeOptions$2;
      const defaultTheme = theme.dark ? (_defaultThemeOptions$ = defaultThemeOptions.themes) == null ? void 0 : _defaultThemeOptions$.dark : (_defaultThemeOptions$2 = defaultThemeOptions.themes) == null ? void 0 : _defaultThemeOptions$2.light;
      themes[key] = mergeDeep(defaultTheme, theme);
    }
    return mergeDeep(defaultThemeOptions, {
      ...options,
      themes
    });
  }
  function createTheme(options) {
    const parsedOptions = reactive(parseThemeOptions(options));
    const name = ref(parsedOptions.defaultTheme);
    const themes = ref(parsedOptions.themes);
    const computedThemes = computed2(() => {
      const acc = {};
      for (const [name2, original] of Object.entries(themes.value)) {
        const theme = acc[name2] = {
          ...original,
          colors: {
            ...original.colors
          }
        };
        if (parsedOptions.variations) {
          for (const name3 of parsedOptions.variations.colors) {
            const color = theme.colors[name3];
            for (const variation of ["lighten", "darken"]) {
              const fn = variation === "lighten" ? lighten : darken;
              for (const amount of createRange(parsedOptions.variations[variation], 1)) {
                theme.colors[`${name3}-${variation}-${amount}`] = intToHex(fn(colorToInt(color), amount));
              }
            }
          }
        }
        for (const color of Object.keys(theme.colors)) {
          if (/^on-[a-z]/.test(color) || theme.colors[`on-${color}`])
            continue;
          const onColor = `on-${color}`;
          const colorVal = colorToInt(theme.colors[color]);
          const blackContrast = Math.abs(APCAcontrast(0, colorVal));
          const whiteContrast = Math.abs(APCAcontrast(16777215, colorVal));
          theme.colors[onColor] = whiteContrast > Math.min(blackContrast, 50) ? "#fff" : "#000";
        }
      }
      return acc;
    });
    const current = computed2(() => computedThemes.value[name.value]);
    const styles = computed2(() => {
      const lines = [];
      if (current.value.dark) {
        createCssClass(lines, ":root", ["color-scheme: dark"]);
      }
      for (const [themeName, theme] of Object.entries(computedThemes.value)) {
        const {
          variables,
          dark
        } = theme;
        createCssClass(lines, `.v-theme--${themeName}`, [`color-scheme: ${dark ? "dark" : "normal"}`, ...genCssVariables(theme), ...Object.keys(variables).map((key) => {
          const value = variables[key];
          const color = typeof value === "string" && value.startsWith("#") ? colorToRGB(value) : void 0;
          const rgb2 = color ? `${color.r}, ${color.g}, ${color.b}` : void 0;
          return `--v-${key}: ${rgb2 ?? value}`;
        })]);
      }
      const bgLines = [];
      const fgLines = [];
      const colors = new Set(Object.values(computedThemes.value).flatMap((theme) => Object.keys(theme.colors)));
      for (const key of colors) {
        if (/^on-[a-z]/.test(key)) {
          createCssClass(fgLines, `.${key}`, [`color: rgb(var(--v-theme-${key})) !important`]);
        } else {
          createCssClass(bgLines, `.bg-${key}`, [`--v-theme-overlay-multiplier: var(--v-theme-${key}-overlay-multiplier)`, `background: rgb(var(--v-theme-${key})) !important`, `color: rgb(var(--v-theme-on-${key})) !important`]);
          createCssClass(fgLines, `.text-${key}`, [`color: rgb(var(--v-theme-${key})) !important`]);
          createCssClass(fgLines, `.border-${key}`, [`--v-border-color: var(--v-theme-${key})`]);
        }
      }
      lines.push(...bgLines, ...fgLines);
      return lines.map((str, i) => i === 0 ? str : `    ${str}`).join("");
    });
    function install(app2) {
      const head = app2._context.provides.usehead;
      if (head) {
        head.addHeadObjs(computed2(() => {
          const style = {
            children: styles.value,
            type: "text/css",
            id: "vuetify-theme-stylesheet"
          };
          if (parsedOptions.cspNonce)
            style.nonce = parsedOptions.cspNonce;
          return {
            style: [style]
          };
        }));
        if (IN_BROWSER) {
          watchEffect(() => head.updateDOM());
        }
      } else {
        let updateStyles = function() {
          if (parsedOptions.isDisabled)
            return;
          if (typeof document !== "undefined" && !styleEl) {
            const el = document.createElement("style");
            el.type = "text/css";
            el.id = "vuetify-theme-stylesheet";
            if (parsedOptions.cspNonce)
              el.setAttribute("nonce", parsedOptions.cspNonce);
            styleEl = el;
            document.head.appendChild(styleEl);
          }
          if (styleEl)
            styleEl.innerHTML = styles.value;
        };
        let styleEl = IN_BROWSER ? document.getElementById("vuetify-theme-stylesheet") : null;
        watch(styles, updateStyles, {
          immediate: true
        });
      }
    }
    const themeClasses = computed2(() => parsedOptions.isDisabled ? void 0 : `v-theme--${name.value}`);
    return {
      install,
      isDisabled: parsedOptions.isDisabled,
      name,
      themes,
      current,
      computedThemes,
      themeClasses,
      styles,
      global: {
        name,
        current
      }
    };
  }
  function provideTheme(props) {
    getCurrentInstance2("provideTheme");
    const theme = inject(ThemeSymbol, null);
    if (!theme)
      throw new Error("Could not find Vuetify theme injection");
    const name = computed2(() => {
      return props.theme ?? (theme == null ? void 0 : theme.name.value);
    });
    const themeClasses = computed2(() => theme.isDisabled ? void 0 : `v-theme--${name.value}`);
    const newTheme = {
      ...theme,
      name,
      themeClasses
    };
    provide(ThemeSymbol, newTheme);
    return newTheme;
  }
  function useTheme() {
    getCurrentInstance2("useTheme");
    const theme = inject(ThemeSymbol, null);
    if (!theme)
      throw new Error("Could not find Vuetify theme injection");
    return theme;
  }
  function createCssClass(lines, selector, content) {
    lines.push(`${selector} {
`, ...content.map((line) => `  ${line};
`), "}\n");
  }
  function genCssVariables(theme) {
    const lightOverlay = theme.dark ? 2 : 1;
    const darkOverlay = theme.dark ? 1 : 2;
    const variables = [];
    for (const [key, value] of Object.entries(theme.colors)) {
      const rgb2 = colorToRGB(value);
      variables.push(`--v-theme-${key}: ${rgb2.r},${rgb2.g},${rgb2.b}`);
      if (!key.startsWith("on-")) {
        variables.push(`--v-theme-${key}-overlay-multiplier: ${getLuma(value) > 0.18 ? lightOverlay : darkOverlay}`);
      }
    }
    return variables;
  }

  // node_modules/vuetify/lib/composables/resizeObserver.mjs
  function useResizeObserver(callback) {
    const resizeRef = ref();
    const contentRect = ref();
    if (IN_BROWSER) {
      const observer = new ResizeObserver((entries) => {
        callback == null ? void 0 : callback(entries, observer);
        if (!entries.length)
          return;
        contentRect.value = entries[0].contentRect;
      });
      onBeforeUnmount(() => {
        observer.disconnect();
      });
      watch(resizeRef, (newValue, oldValue) => {
        if (oldValue) {
          observer.unobserve(oldValue);
          contentRect.value = void 0;
        }
        if (newValue)
          observer.observe(newValue);
      }, {
        flush: "post"
      });
    }
    return {
      resizeRef,
      contentRect: readonly(contentRect)
    };
  }

  // node_modules/vuetify/lib/composables/layout.mjs
  var VuetifyLayoutKey = Symbol.for("vuetify:layout");
  var VuetifyLayoutItemKey = Symbol.for("vuetify:layout-item");
  var ROOT_ZINDEX = 1e3;
  var makeLayoutProps = propsFactory({
    overlaps: {
      type: Array,
      default: () => []
    },
    fullHeight: Boolean
  }, "layout");
  var makeLayoutItemProps = propsFactory({
    name: {
      type: String
    },
    order: {
      type: [Number, String],
      default: 0
    },
    absolute: Boolean
  }, "layout-item");
  function useLayout() {
    const layout = inject(VuetifyLayoutKey);
    if (!layout)
      throw new Error("Could not find injected Vuetify layout");
    return layout;
  }
  function useLayoutItem(options) {
    const layout = inject(VuetifyLayoutKey);
    if (!layout)
      throw new Error("Could not find injected Vuetify layout");
    const id = options.id ?? `layout-item-${getUid()}`;
    const vm = getCurrentInstance2("useLayoutItem");
    provide(VuetifyLayoutItemKey, {
      id
    });
    const isKeptAlive = ref(false);
    onDeactivated(() => isKeptAlive.value = true);
    onActivated(() => isKeptAlive.value = false);
    const {
      layoutItemStyles,
      layoutItemScrimStyles
    } = layout.register(vm, {
      ...options,
      active: computed2(() => isKeptAlive.value ? false : options.active.value),
      id
    });
    onBeforeUnmount(() => layout.unregister(id));
    return {
      layoutItemStyles,
      layoutRect: layout.layoutRect,
      layoutItemScrimStyles
    };
  }
  var generateLayers = (layout, positions, layoutSizes, activeItems) => {
    let previousLayer = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    };
    const layers = [{
      id: "",
      layer: {
        ...previousLayer
      }
    }];
    for (const id of layout) {
      const position = positions.get(id);
      const amount = layoutSizes.get(id);
      const active = activeItems.get(id);
      if (!position || !amount || !active)
        continue;
      const layer = {
        ...previousLayer,
        [position.value]: parseInt(previousLayer[position.value], 10) + (active.value ? parseInt(amount.value, 10) : 0)
      };
      layers.push({
        id,
        layer
      });
      previousLayer = layer;
    }
    return layers;
  };
  function createLayout(props) {
    const parentLayout = inject(VuetifyLayoutKey, null);
    const rootZIndex = computed2(() => parentLayout ? parentLayout.rootZIndex.value - 100 : ROOT_ZINDEX);
    const registered = ref([]);
    const positions = reactive(/* @__PURE__ */ new Map());
    const layoutSizes = reactive(/* @__PURE__ */ new Map());
    const priorities = reactive(/* @__PURE__ */ new Map());
    const activeItems = reactive(/* @__PURE__ */ new Map());
    const disabledTransitions = reactive(/* @__PURE__ */ new Map());
    const {
      resizeRef,
      contentRect: layoutRect
    } = useResizeObserver();
    const computedOverlaps = computed2(() => {
      const map2 = /* @__PURE__ */ new Map();
      const overlaps = props.overlaps ?? [];
      for (const overlap of overlaps.filter((item) => item.includes(":"))) {
        const [top, bottom] = overlap.split(":");
        if (!registered.value.includes(top) || !registered.value.includes(bottom))
          continue;
        const topPosition = positions.get(top);
        const bottomPosition = positions.get(bottom);
        const topAmount = layoutSizes.get(top);
        const bottomAmount = layoutSizes.get(bottom);
        if (!topPosition || !bottomPosition || !topAmount || !bottomAmount)
          continue;
        map2.set(bottom, {
          position: topPosition.value,
          amount: parseInt(topAmount.value, 10)
        });
        map2.set(top, {
          position: bottomPosition.value,
          amount: -parseInt(bottomAmount.value, 10)
        });
      }
      return map2;
    });
    const layers = computed2(() => {
      const uniquePriorities = [...new Set([...priorities.values()].map((p2) => p2.value))].sort((a, b) => a - b);
      const layout = [];
      for (const p2 of uniquePriorities) {
        const items2 = registered.value.filter((id) => {
          var _priorities$get;
          return ((_priorities$get = priorities.get(id)) == null ? void 0 : _priorities$get.value) === p2;
        });
        layout.push(...items2);
      }
      return generateLayers(layout, positions, layoutSizes, activeItems);
    });
    const transitionsEnabled = computed2(() => {
      return !Array.from(disabledTransitions.values()).some((ref2) => ref2.value);
    });
    const mainStyles = computed2(() => {
      const layer = layers.value[layers.value.length - 1].layer;
      return {
        "--v-layout-left": convertToUnit(layer.left),
        "--v-layout-right": convertToUnit(layer.right),
        "--v-layout-top": convertToUnit(layer.top),
        "--v-layout-bottom": convertToUnit(layer.bottom),
        ...transitionsEnabled.value ? void 0 : {
          transition: "none"
        }
      };
    });
    const items = computed2(() => {
      return layers.value.slice(1).map((_ref, index) => {
        let {
          id
        } = _ref;
        const {
          layer
        } = layers.value[index];
        const size2 = layoutSizes.get(id);
        return {
          id,
          ...layer,
          size: Number(size2.value)
        };
      });
    });
    const getLayoutItem = (id) => {
      return items.value.find((item) => item.id === id);
    };
    const rootVm = getCurrentInstance2("createLayout");
    const isMounted = ref(false);
    onMounted(() => {
      isMounted.value = true;
    });
    provide(VuetifyLayoutKey, {
      register: (vm, _ref2) => {
        let {
          id,
          order,
          position,
          layoutSize,
          elementSize,
          active,
          disableTransitions,
          absolute
        } = _ref2;
        priorities.set(id, order);
        positions.set(id, position);
        layoutSizes.set(id, layoutSize);
        activeItems.set(id, active);
        disableTransitions && disabledTransitions.set(id, disableTransitions);
        const instances = findChildrenWithProvide(VuetifyLayoutItemKey, rootVm == null ? void 0 : rootVm.vnode);
        const instanceIndex = instances.indexOf(vm);
        if (instanceIndex > -1)
          registered.value.splice(instanceIndex, 0, id);
        else
          registered.value.push(id);
        const index = computed2(() => items.value.findIndex((i) => i.id === id));
        const zIndex = computed2(() => rootZIndex.value + layers.value.length * 2 - index.value * 2);
        const layoutItemStyles = computed2(() => {
          const isHorizontal = position.value === "left" || position.value === "right";
          const isOppositeHorizontal = position.value === "right";
          const isOppositeVertical = position.value === "bottom";
          const styles = {
            [position.value]: 0,
            zIndex: zIndex.value,
            transform: `translate${isHorizontal ? "X" : "Y"}(${(active.value ? 0 : -110) * (isOppositeHorizontal || isOppositeVertical ? -1 : 1)}%)`,
            position: absolute.value || rootZIndex.value !== ROOT_ZINDEX ? "absolute" : "fixed",
            ...transitionsEnabled.value ? void 0 : {
              transition: "none"
            }
          };
          if (!isMounted.value)
            return styles;
          if (index.value < 0)
            throw new Error(`Layout item "${id}" is missing`);
          const item = items.value[index.value];
          if (!item)
            throw new Error(`Could not find layout item "${id}`);
          const overlap = computedOverlaps.value.get(id);
          if (overlap) {
            item[overlap.position] += overlap.amount;
          }
          return {
            ...styles,
            height: isHorizontal ? `calc(100% - ${item.top}px - ${item.bottom}px)` : elementSize.value ? `${elementSize.value}px` : void 0,
            left: isOppositeHorizontal ? void 0 : `${item.left}px`,
            right: isOppositeHorizontal ? `${item.right}px` : void 0,
            top: position.value !== "bottom" ? `${item.top}px` : void 0,
            bottom: position.value !== "top" ? `${item.bottom}px` : void 0,
            width: !isHorizontal ? `calc(100% - ${item.left}px - ${item.right}px)` : elementSize.value ? `${elementSize.value}px` : void 0
          };
        });
        const layoutItemScrimStyles = computed2(() => ({
          zIndex: zIndex.value - 1
        }));
        return {
          layoutItemStyles,
          layoutItemScrimStyles,
          zIndex
        };
      },
      unregister: (id) => {
        priorities.delete(id);
        positions.delete(id);
        layoutSizes.delete(id);
        activeItems.delete(id);
        disabledTransitions.delete(id);
        registered.value = registered.value.filter((v) => v !== id);
      },
      mainStyles,
      getLayoutItem,
      items,
      layoutRect,
      rootZIndex
    });
    const layoutClasses = computed2(() => ["v-layout", {
      "v-layout--full-height": props.fullHeight
    }]);
    const layoutStyles = computed2(() => ({
      zIndex: rootZIndex.value,
      position: parentLayout ? "relative" : void 0,
      overflow: parentLayout ? "hidden" : void 0
    }));
    return {
      layoutClasses,
      layoutStyles,
      getLayoutItem,
      items,
      layoutRect,
      layoutRef: resizeRef
    };
  }

  // node_modules/vuetify/lib/framework.mjs
  function createVuetify() {
    let vuetify2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const {
      blueprint,
      ...rest
    } = vuetify2;
    const options = mergeDeep(blueprint, rest);
    const {
      aliases: aliases2 = {},
      components = {},
      directives = {}
    } = options;
    const defaults = createDefaults(options.defaults);
    const display = createDisplay(options.display, options.ssr);
    const theme = createTheme(options.theme);
    const icons = createIcons(options.icons);
    const locale = createLocale(options.locale);
    const install = (app2) => {
      for (const key in directives) {
        app2.directive(key, directives[key]);
      }
      for (const key in components) {
        app2.component(key, components[key]);
      }
      for (const key in aliases2) {
        app2.component(key, defineComponent2({
          ...aliases2[key],
          name: key,
          aliasName: aliases2[key].name
        }));
      }
      theme.install(app2);
      locale.install(app2);
      app2.provide(DefaultsSymbol, defaults);
      app2.provide(DisplaySymbol, display);
      app2.provide(ThemeSymbol, theme);
      app2.provide(IconSymbol, icons);
      app2.provide(LocaleAdapterSymbol, locale.adapter);
      getUid.reset();
      app2.mixin({
        computed: {
          $vuetify() {
            return reactive({
              defaults: inject2.call(this, DefaultsSymbol),
              display: inject2.call(this, DisplaySymbol),
              theme: inject2.call(this, ThemeSymbol),
              icons: inject2.call(this, IconSymbol),
              locale: inject2.call(this, LocaleAdapterSymbol),
              rtl: inject2.call(this, RtlSymbol)
            });
          }
        }
      });
    };
    return {
      install,
      defaults,
      display,
      theme,
      icons,
      locale: locale.adapter
    };
  }
  var version2 = "3.0.0-beta.13";
  createVuetify.version = version2;
  function inject2(key) {
    var _vm$parent, _vm$vnode$appContext;
    const vm = this.$;
    const provides = ((_vm$parent = vm.parent) == null ? void 0 : _vm$parent.provides) ?? ((_vm$vnode$appContext = vm.vnode.appContext) == null ? void 0 : _vm$vnode$appContext.provides);
    if (provides && key in provides) {
      return provides[key];
    }
  }

  // node_modules/vuetify/lib/components/index.mjs
  var components_exports = {};
  __export(components_exports, {
    VAlert: () => VAlert,
    VAlertTitle: () => VAlertTitle,
    VApp: () => VApp,
    VAppBar: () => VAppBar,
    VAppBarNavIcon: () => VAppBarNavIcon,
    VAppBarTitle: () => VAppBarTitle,
    VAutocomplete: () => VAutocomplete,
    VAvatar: () => VAvatar,
    VBadge: () => VBadge,
    VBanner: () => VBanner,
    VBannerActions: () => VBannerActions,
    VBannerText: () => VBannerText,
    VBottomNavigation: () => VBottomNavigation,
    VBreadcrumbs: () => VBreadcrumbs,
    VBreadcrumbsDivider: () => VBreadcrumbsDivider,
    VBreadcrumbsItem: () => VBreadcrumbsItem,
    VBtn: () => VBtn,
    VBtnGroup: () => VBtnGroup,
    VBtnToggle: () => VBtnToggle,
    VCard: () => VCard,
    VCardActions: () => VCardActions,
    VCardItem: () => VCardItem,
    VCardSubtitle: () => VCardSubtitle,
    VCardText: () => VCardText,
    VCardTitle: () => VCardTitle,
    VCarousel: () => VCarousel,
    VCarouselItem: () => VCarouselItem,
    VCheckbox: () => VCheckbox,
    VCheckboxBtn: () => VCheckboxBtn,
    VChip: () => VChip,
    VChipGroup: () => VChipGroup,
    VClassIcon: () => VClassIcon,
    VCode: () => VCode,
    VCol: () => VCol,
    VColorPicker: () => VColorPicker,
    VCombobox: () => VCombobox,
    VComponentIcon: () => VComponentIcon,
    VContainer: () => VContainer,
    VCounter: () => VCounter,
    VDefaultsProvider: () => VDefaultsProvider,
    VDialog: () => VDialog,
    VDialogBottomTransition: () => VDialogBottomTransition,
    VDialogTopTransition: () => VDialogTopTransition,
    VDialogTransition: () => VDialogTransition,
    VDivider: () => VDivider,
    VExpandTransition: () => VExpandTransition,
    VExpandXTransition: () => VExpandXTransition,
    VExpansionPanel: () => VExpansionPanel,
    VExpansionPanelText: () => VExpansionPanelText,
    VExpansionPanelTitle: () => VExpansionPanelTitle,
    VExpansionPanels: () => VExpansionPanels,
    VFabTransition: () => VFabTransition,
    VFadeTransition: () => VFadeTransition,
    VField: () => VField,
    VFieldLabel: () => VFieldLabel,
    VFileInput: () => VFileInput,
    VFooter: () => VFooter,
    VForm: () => VForm,
    VHover: () => VHover,
    VIcon: () => VIcon,
    VImg: () => VImg,
    VInput: () => VInput,
    VItem: () => VItem,
    VItemGroup: () => VItemGroup,
    VKbd: () => VKbd,
    VLabel: () => VLabel,
    VLayout: () => VLayout,
    VLayoutItem: () => VLayoutItem,
    VLazy: () => VLazy,
    VLigatureIcon: () => VLigatureIcon,
    VList: () => VList,
    VListGroup: () => VListGroup,
    VListImg: () => VListImg,
    VListItem: () => VListItem,
    VListItemAction: () => VListItemAction,
    VListItemMedia: () => VListItemMedia,
    VListItemSubtitle: () => VListItemSubtitle,
    VListItemTitle: () => VListItemTitle,
    VListSubheader: () => VListSubheader,
    VLocaleProvider: () => VLocaleProvider,
    VMain: () => VMain,
    VMenu: () => VMenu,
    VMessages: () => VMessages,
    VNavigationDrawer: () => VNavigationDrawer,
    VNoSsr: () => VNoSsr,
    VOverlay: () => VOverlay,
    VPagination: () => VPagination,
    VParallax: () => VParallax,
    VProgressCircular: () => VProgressCircular,
    VProgressLinear: () => VProgressLinear,
    VRadio: () => VRadio,
    VRadioGroup: () => VRadioGroup,
    VRangeSlider: () => VRangeSlider,
    VRating: () => VRating,
    VResponsive: () => VResponsive,
    VRow: () => VRow,
    VScaleTransition: () => VScaleTransition,
    VScrollXReverseTransition: () => VScrollXReverseTransition,
    VScrollXTransition: () => VScrollXTransition,
    VScrollYReverseTransition: () => VScrollYReverseTransition,
    VScrollYTransition: () => VScrollYTransition,
    VSelect: () => VSelect,
    VSelectionControl: () => VSelectionControl,
    VSelectionControlGroup: () => VSelectionControlGroup,
    VSheet: () => VSheet,
    VSlideGroup: () => VSlideGroup,
    VSlideGroupItem: () => VSlideGroupItem,
    VSlideXReverseTransition: () => VSlideXReverseTransition,
    VSlideXTransition: () => VSlideXTransition,
    VSlideYReverseTransition: () => VSlideYReverseTransition,
    VSlideYTransition: () => VSlideYTransition,
    VSlider: () => VSlider,
    VSnackbar: () => VSnackbar,
    VSpacer: () => VSpacer,
    VSvgIcon: () => VSvgIcon,
    VSwitch: () => VSwitch,
    VSystemBar: () => VSystemBar,
    VTab: () => VTab,
    VTable: () => VTable,
    VTabs: () => VTabs,
    VTextField: () => VTextField,
    VTextarea: () => VTextarea,
    VThemeProvider: () => VThemeProvider,
    VTimeline: () => VTimeline,
    VTimelineItem: () => VTimelineItem,
    VToolbar: () => VToolbar,
    VToolbarItems: () => VToolbarItems,
    VToolbarTitle: () => VToolbarTitle,
    VTooltip: () => VTooltip,
    VValidation: () => VValidation,
    VWindow: () => VWindow,
    VWindowItem: () => VWindowItem
  });

  // node_modules/vuetify/lib/components/VApp/VApp.mjs
  var VApp = defineComponent2({
    name: "VApp",
    props: {
      ...makeLayoutProps({
        fullHeight: true
      }),
      ...makeThemeProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const theme = provideTheme(props);
      const {
        layoutClasses,
        layoutStyles,
        getLayoutItem,
        items,
        layoutRef
      } = createLayout(props);
      const {
        rtlClasses
      } = useRtl();
      useRender(() => {
        var _slots$default;
        return createVNode("div", {
          "ref": layoutRef,
          "class": ["v-application", theme.themeClasses.value, layoutClasses.value, rtlClasses.value],
          "style": layoutStyles.value
        }, [createVNode("div", {
          "class": "v-application__wrap"
        }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)])]);
      });
      return {
        getLayoutItem,
        items,
        theme
      };
    }
  });

  // node_modules/vuetify/lib/components/VDefaultsProvider/VDefaultsProvider.mjs
  var VDefaultsProvider = defineComponent({
    name: "VDefaultsProvider",
    props: {
      defaults: Object,
      reset: [Number, String],
      root: Boolean,
      scoped: Boolean
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        defaults,
        reset: reset2,
        root,
        scoped
      } = toRefs(props);
      provideDefaults(defaults, {
        reset: reset2,
        root,
        scoped
      });
      return () => {
        var _slots$default;
        return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots);
      };
    }
  });

  // node_modules/vuetify/lib/components/transitions/createTransition.mjs
  function createCssTransition(name) {
    let origin = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "top center 0";
    let mode = arguments.length > 2 ? arguments[2] : void 0;
    return defineComponent2({
      name,
      props: {
        group: Boolean,
        hideOnLeave: Boolean,
        leaveAbsolute: Boolean,
        mode: {
          type: String,
          default: mode
        },
        origin: {
          type: String,
          default: origin
        }
      },
      setup(props, _ref) {
        let {
          slots
        } = _ref;
        return () => {
          const tag = props.group ? TransitionGroup : Transition;
          return h(tag, {
            name,
            mode: props.mode,
            onBeforeEnter(el) {
              el.style.transformOrigin = props.origin;
            },
            onLeave(el) {
              if (props.leaveAbsolute) {
                const {
                  offsetTop,
                  offsetLeft,
                  offsetWidth,
                  offsetHeight
                } = el;
                el._transitionInitialStyles = {
                  position: el.style.position,
                  top: el.style.top,
                  left: el.style.left,
                  width: el.style.width,
                  height: el.style.height
                };
                el.style.position = "absolute";
                el.style.top = `${offsetTop}px`;
                el.style.left = `${offsetLeft}px`;
                el.style.width = `${offsetWidth}px`;
                el.style.height = `${offsetHeight}px`;
              }
              if (props.hideOnLeave) {
                el.style.setProperty("display", "none", "important");
              }
            },
            onAfterLeave(el) {
              if (props.leaveAbsolute && el != null && el._transitionInitialStyles) {
                const {
                  position,
                  top,
                  left,
                  width,
                  height
                } = el._transitionInitialStyles;
                delete el._transitionInitialStyles;
                el.style.position = position || "";
                el.style.top = top || "";
                el.style.left = left || "";
                el.style.width = width || "";
                el.style.height = height || "";
              }
            }
          }, slots.default);
        };
      }
    });
  }
  function createJavascriptTransition(name, functions) {
    let mode = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "in-out";
    return defineComponent2({
      name,
      props: {
        mode: {
          type: String,
          default: mode
        }
      },
      setup(props, _ref2) {
        let {
          slots
        } = _ref2;
        return () => {
          return h(Transition, {
            name,
            ...functions
          }, slots.default);
        };
      }
    });
  }

  // node_modules/vuetify/lib/components/transitions/expand-transition.mjs
  function expand_transition_default() {
    let expandedParentClass = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    let x = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    const sizeProperty = x ? "width" : "height";
    const offsetProperty = camelize(`offset-${sizeProperty}`);
    return {
      onBeforeEnter(el) {
        el._parent = el.parentNode;
        el._initialStyle = {
          transition: el.style.transition,
          overflow: el.style.overflow,
          [sizeProperty]: el.style[sizeProperty]
        };
      },
      onEnter(el) {
        const initialStyle = el._initialStyle;
        el.style.setProperty("transition", "none", "important");
        el.style.overflow = "hidden";
        const offset = `${el[offsetProperty]}px`;
        el.style[sizeProperty] = "0";
        void el.offsetHeight;
        el.style.transition = initialStyle.transition;
        if (expandedParentClass && el._parent) {
          el._parent.classList.add(expandedParentClass);
        }
        requestAnimationFrame(() => {
          el.style[sizeProperty] = offset;
        });
      },
      onAfterEnter: resetStyles,
      onEnterCancelled: resetStyles,
      onLeave(el) {
        el._initialStyle = {
          transition: "",
          overflow: el.style.overflow,
          [sizeProperty]: el.style[sizeProperty]
        };
        el.style.overflow = "hidden";
        el.style[sizeProperty] = `${el[offsetProperty]}px`;
        void el.offsetHeight;
        requestAnimationFrame(() => el.style[sizeProperty] = "0");
      },
      onAfterLeave,
      onLeaveCancelled: onAfterLeave
    };
    function onAfterLeave(el) {
      if (expandedParentClass && el._parent) {
        el._parent.classList.remove(expandedParentClass);
      }
      resetStyles(el);
    }
    function resetStyles(el) {
      const size2 = el._initialStyle[sizeProperty];
      el.style.overflow = el._initialStyle.overflow;
      if (size2 != null)
        el.style[sizeProperty] = size2;
      delete el._initialStyle;
    }
  }

  // node_modules/vuetify/lib/components/transitions/dialog-transition.mjs
  var VDialogTransition = defineComponent2({
    name: "VDialogTransition",
    props: {
      target: Object
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const functions = {
        onBeforeEnter(el) {
          el.style.pointerEvents = "none";
          el.style.visibility = "hidden";
        },
        async onEnter(el, done) {
          var _getChildren;
          await new Promise((resolve2) => requestAnimationFrame(resolve2));
          await new Promise((resolve2) => requestAnimationFrame(resolve2));
          el.style.visibility = "";
          const {
            x,
            y,
            sx,
            sy,
            speed
          } = getDimensions(props.target, el);
          const animation = animate(el, [{
            transform: `translate(${x}px, ${y}px) scale(${sx}, ${sy})`,
            opacity: 0
          }, {
            transform: ""
          }], {
            duration: 225 * speed,
            easing: deceleratedEasing
          });
          (_getChildren = getChildren(el)) == null ? void 0 : _getChildren.forEach((el2) => {
            animate(el2, [{
              opacity: 0
            }, {
              opacity: 0,
              offset: 0.33
            }, {
              opacity: 1
            }], {
              duration: 225 * 2 * speed,
              easing: standardEasing
            });
          });
          animation.finished.then(() => done());
        },
        onAfterEnter(el) {
          el.style.removeProperty("pointer-events");
        },
        onBeforeLeave(el) {
          el.style.pointerEvents = "none";
        },
        async onLeave(el, done) {
          var _getChildren2;
          await new Promise((resolve2) => requestAnimationFrame(resolve2));
          const {
            x,
            y,
            sx,
            sy,
            speed
          } = getDimensions(props.target, el);
          const animation = animate(el, [{
            transform: ""
          }, {
            transform: `translate(${x}px, ${y}px) scale(${sx}, ${sy})`,
            opacity: 0
          }], {
            duration: 125 * speed,
            easing: acceleratedEasing
          });
          animation.finished.then(() => done());
          (_getChildren2 = getChildren(el)) == null ? void 0 : _getChildren2.forEach((el2) => {
            animate(el2, [{}, {
              opacity: 0,
              offset: 0.2
            }, {
              opacity: 0
            }], {
              duration: 125 * 2 * speed,
              easing: standardEasing
            });
          });
        },
        onAfterLeave(el) {
          el.style.removeProperty("pointer-events");
        }
      };
      return () => {
        return props.target ? createVNode(Transition, mergeProps({
          "name": "dialog-transition"
        }, functions, {
          "css": false
        }), slots) : createVNode(Transition, {
          "name": "dialog-transition"
        }, slots);
      };
    }
  });
  function getChildren(el) {
    var _el$querySelector;
    const els = (_el$querySelector = el.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list")) == null ? void 0 : _el$querySelector.children;
    return els && [...els];
  }
  function getDimensions(target, el) {
    const targetBox = target.getBoundingClientRect();
    const elBox = nullifyTransforms(el);
    const [originX, originY] = getComputedStyle(el).transformOrigin.split(" ").map((v) => parseFloat(v));
    const [anchorSide, anchorOffset] = getComputedStyle(el).getPropertyValue("--v-overlay-anchor-origin").split(" ");
    let offsetX = targetBox.left + targetBox.width / 2;
    if (anchorSide === "left" || anchorOffset === "left") {
      offsetX -= targetBox.width / 2;
    } else if (anchorSide === "right" || anchorOffset === "right") {
      offsetX += targetBox.width / 2;
    }
    let offsetY = targetBox.top + targetBox.height / 2;
    if (anchorSide === "top" || anchorOffset === "top") {
      offsetY -= targetBox.height / 2;
    } else if (anchorSide === "bottom" || anchorOffset === "bottom") {
      offsetY += targetBox.height / 2;
    }
    const tsx = targetBox.width / elBox.width;
    const tsy = targetBox.height / elBox.height;
    const maxs = Math.max(1, tsx, tsy);
    const sx = tsx / maxs;
    const sy = tsy / maxs;
    const asa = elBox.width * elBox.height / (window.innerWidth * window.innerHeight);
    const speed = asa > 0.12 ? Math.min(1.5, (asa - 0.12) * 10 + 1) : 1;
    return {
      x: offsetX - (originX + elBox.left),
      y: offsetY - (originY + elBox.top),
      sx,
      sy,
      speed
    };
  }

  // node_modules/vuetify/lib/components/transitions/index.mjs
  var VFabTransition = createCssTransition("fab-transition", "center center", "out-in");
  var VDialogBottomTransition = createCssTransition("dialog-bottom-transition");
  var VDialogTopTransition = createCssTransition("dialog-top-transition");
  var VFadeTransition = createCssTransition("fade-transition");
  var VScaleTransition = createCssTransition("scale-transition");
  var VScrollXTransition = createCssTransition("scroll-x-transition");
  var VScrollXReverseTransition = createCssTransition("scroll-x-reverse-transition");
  var VScrollYTransition = createCssTransition("scroll-y-transition");
  var VScrollYReverseTransition = createCssTransition("scroll-y-reverse-transition");
  var VSlideXTransition = createCssTransition("slide-x-transition");
  var VSlideXReverseTransition = createCssTransition("slide-x-reverse-transition");
  var VSlideYTransition = createCssTransition("slide-y-transition");
  var VSlideYReverseTransition = createCssTransition("slide-y-reverse-transition");
  var VExpandTransition = createJavascriptTransition("expand-transition", expand_transition_default());
  var VExpandXTransition = createJavascriptTransition("expand-x-transition", expand_transition_default("", true));

  // node_modules/vuetify/lib/composables/dimensions.mjs
  var makeDimensionProps = propsFactory({
    height: [Number, String],
    maxHeight: [Number, String],
    maxWidth: [Number, String],
    minHeight: [Number, String],
    minWidth: [Number, String],
    width: [Number, String]
  }, "dimension");
  function useDimension(props) {
    const dimensionStyles = computed2(() => ({
      height: convertToUnit(props.height),
      maxHeight: convertToUnit(props.maxHeight),
      maxWidth: convertToUnit(props.maxWidth),
      minHeight: convertToUnit(props.minHeight),
      minWidth: convertToUnit(props.minWidth),
      width: convertToUnit(props.width)
    }));
    return {
      dimensionStyles
    };
  }

  // node_modules/vuetify/lib/components/VResponsive/VResponsive.mjs
  function useAspectStyles(props) {
    return {
      aspectStyles: computed2(() => {
        const ratio = Number(props.aspectRatio);
        return ratio ? {
          paddingBottom: String(1 / ratio * 100) + "%"
        } : void 0;
      })
    };
  }
  var VResponsive = defineComponent2({
    name: "VResponsive",
    props: {
      aspectRatio: [String, Number],
      contentClass: String,
      ...makeDimensionProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        aspectStyles
      } = useAspectStyles(props);
      const {
        dimensionStyles
      } = useDimension(props);
      useRender(() => {
        var _slots$additional;
        return createVNode("div", {
          "class": "v-responsive",
          "style": dimensionStyles.value
        }, [createVNode("div", {
          "class": "v-responsive__sizer",
          "style": aspectStyles.value
        }, null), (_slots$additional = slots.additional) == null ? void 0 : _slots$additional.call(slots), slots.default && createVNode("div", {
          "class": ["v-responsive__content", props.contentClass]
        }, [slots.default()])]);
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/directives/intersect/index.mjs
  function mounted(el, binding) {
    if (!SUPPORTS_INTERSECTION)
      return;
    const modifiers = binding.modifiers || {};
    const value = binding.value;
    const {
      handler,
      options
    } = typeof value === "object" ? value : {
      handler: value,
      options: {}
    };
    const observer = new IntersectionObserver(function() {
      var _el$_observe;
      let entries = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
      let observer2 = arguments.length > 1 ? arguments[1] : void 0;
      const _observe = (_el$_observe = el._observe) == null ? void 0 : _el$_observe[binding.instance.$.uid];
      if (!_observe)
        return;
      const isIntersecting = entries.some((entry) => entry.isIntersecting);
      if (handler && (!modifiers.quiet || _observe.init) && (!modifiers.once || isIntersecting || _observe.init)) {
        handler(isIntersecting, entries, observer2);
      }
      if (isIntersecting && modifiers.once)
        unmounted(el, binding);
      else
        _observe.init = true;
    }, options);
    el._observe = Object(el._observe);
    el._observe[binding.instance.$.uid] = {
      init: false,
      observer
    };
    observer.observe(el);
  }
  function unmounted(el, binding) {
    var _el$_observe2;
    const observe = (_el$_observe2 = el._observe) == null ? void 0 : _el$_observe2[binding.instance.$.uid];
    if (!observe)
      return;
    observe.observer.unobserve(el);
    delete el._observe[binding.instance.$.uid];
  }
  var Intersect = {
    mounted,
    unmounted
  };
  var intersect_default = Intersect;

  // node_modules/vuetify/lib/composables/transition.mjs
  var makeTransitionProps = propsFactory({
    transition: {
      type: [Boolean, String, Object],
      default: "fade-transition",
      validator: (val) => val !== true
    }
  }, "transition");
  var MaybeTransition = (props, _ref) => {
    var _slots$default;
    let {
      slots
    } = _ref;
    const {
      transition,
      ...rest
    } = props;
    if (!transition || typeof transition === "boolean")
      return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots);
    const {
      component = Transition,
      ...customProps
    } = typeof transition === "object" ? transition : {};
    return h(component, mergeProps(typeof transition === "string" ? {
      name: transition
    } : customProps, rest), slots);
  };

  // node_modules/vuetify/lib/components/VImg/VImg.mjs
  var VImg = defineComponent2({
    name: "VImg",
    directives: {
      intersect: intersect_default
    },
    props: {
      aspectRatio: [String, Number],
      alt: String,
      cover: Boolean,
      eager: Boolean,
      gradient: String,
      lazySrc: String,
      options: {
        type: Object,
        default: () => ({
          root: void 0,
          rootMargin: void 0,
          threshold: void 0
        })
      },
      sizes: String,
      src: {
        type: [String, Object],
        default: ""
      },
      srcset: String,
      width: [String, Number],
      ...makeTransitionProps()
    },
    emits: ["loadstart", "load", "error"],
    setup(props, _ref) {
      let {
        emit: emit2,
        slots
      } = _ref;
      const currentSrc = ref("");
      const image = ref();
      const state = ref(props.eager ? "loading" : "idle");
      const naturalWidth = ref();
      const naturalHeight = ref();
      const normalisedSrc = computed2(() => {
        return props.src && typeof props.src === "object" ? {
          src: props.src.src,
          srcset: props.srcset || props.src.srcset,
          lazySrc: props.lazySrc || props.src.lazySrc,
          aspect: Number(props.aspectRatio || props.src.aspect)
        } : {
          src: props.src,
          srcset: props.srcset,
          lazySrc: props.lazySrc,
          aspect: Number(props.aspectRatio || 0)
        };
      });
      const aspectRatio = computed2(() => {
        return normalisedSrc.value.aspect || naturalWidth.value / naturalHeight.value || 0;
      });
      watch(() => props.src, () => {
        init(state.value !== "idle");
      });
      onBeforeMount(() => init());
      function init(isIntersecting) {
        if (props.eager && isIntersecting)
          return;
        if (SUPPORTS_INTERSECTION && !isIntersecting && !props.eager)
          return;
        state.value = "loading";
        if (normalisedSrc.value.lazySrc) {
          const lazyImg = new Image();
          lazyImg.src = normalisedSrc.value.lazySrc;
          pollForSize(lazyImg, null);
        }
        if (!normalisedSrc.value.src)
          return;
        nextTick(() => {
          var _image$value, _image$value2;
          emit2("loadstart", ((_image$value = image.value) == null ? void 0 : _image$value.currentSrc) || normalisedSrc.value.src);
          if ((_image$value2 = image.value) != null && _image$value2.complete) {
            if (!image.value.naturalWidth) {
              onError();
            }
            if (state.value === "error")
              return;
            if (!aspectRatio.value)
              pollForSize(image.value, null);
            onLoad();
          } else {
            if (!aspectRatio.value)
              pollForSize(image.value);
            getSrc();
          }
        });
      }
      function onLoad() {
        var _image$value3;
        getSrc();
        state.value = "loaded";
        emit2("load", ((_image$value3 = image.value) == null ? void 0 : _image$value3.currentSrc) || normalisedSrc.value.src);
      }
      function onError() {
        var _image$value4;
        state.value = "error";
        emit2("error", ((_image$value4 = image.value) == null ? void 0 : _image$value4.currentSrc) || normalisedSrc.value.src);
      }
      function getSrc() {
        const img = image.value;
        if (img)
          currentSrc.value = img.currentSrc || img.src;
      }
      function pollForSize(img) {
        let timeout = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 100;
        const poll = () => {
          const {
            naturalHeight: imgHeight,
            naturalWidth: imgWidth
          } = img;
          if (imgHeight || imgWidth) {
            naturalWidth.value = imgWidth;
            naturalHeight.value = imgHeight;
          } else if (!img.complete && state.value === "loading" && timeout != null) {
            setTimeout(poll, timeout);
          } else if (img.currentSrc.endsWith(".svg") || img.currentSrc.startsWith("data:image/svg+xml")) {
            naturalWidth.value = 1;
            naturalHeight.value = 1;
          }
        };
        poll();
      }
      const containClasses = computed2(() => ({
        "v-img__img--cover": props.cover,
        "v-img__img--contain": !props.cover
      }));
      const __image = () => {
        var _slots$sources;
        if (!normalisedSrc.value.src || state.value === "idle")
          return null;
        const img = createVNode("img", {
          "class": ["v-img__img", containClasses.value],
          "src": normalisedSrc.value.src,
          "srcset": normalisedSrc.value.srcset,
          "alt": "",
          "sizes": props.sizes,
          "ref": image,
          "onLoad": onLoad,
          "onError": onError
        }, null);
        const sources = (_slots$sources = slots.sources) == null ? void 0 : _slots$sources.call(slots);
        return createVNode(MaybeTransition, {
          "transition": props.transition,
          "appear": true
        }, {
          default: () => [withDirectives(sources ? createVNode("picture", {
            "class": "v-img__picture"
          }, [sources, img]) : img, [[vShow, state.value === "loaded"]])]
        });
      };
      const __preloadImage = () => createVNode(MaybeTransition, {
        "transition": props.transition
      }, {
        default: () => [normalisedSrc.value.lazySrc && state.value !== "loaded" && createVNode("img", {
          "class": ["v-img__img", "v-img__img--preload", containClasses.value],
          "src": normalisedSrc.value.lazySrc,
          "alt": ""
        }, null)]
      });
      const __placeholder = () => {
        if (!slots.placeholder)
          return null;
        return createVNode(MaybeTransition, {
          "transition": props.transition,
          "appear": true
        }, {
          default: () => [(state.value === "loading" || state.value === "error" && !slots.error) && createVNode("div", {
            "class": "v-img__placeholder"
          }, [slots.placeholder()])]
        });
      };
      const __error = () => {
        if (!slots.error)
          return null;
        return createVNode(MaybeTransition, {
          "transition": props.transition,
          "appear": true
        }, {
          default: () => [state.value === "error" && createVNode("div", {
            "class": "v-img__error"
          }, [slots.error()])]
        });
      };
      const __gradient = () => {
        if (!props.gradient)
          return null;
        return createVNode("div", {
          "class": "v-img__gradient",
          "style": {
            backgroundImage: `linear-gradient(${props.gradient})`
          }
        }, null);
      };
      const isBooted = ref(false);
      {
        const stop2 = watch(aspectRatio, (val) => {
          if (val) {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                isBooted.value = true;
              });
            });
            stop2();
          }
        });
      }
      useRender(() => withDirectives(createVNode(VResponsive, {
        "class": ["v-img", {
          "v-img--booting": !isBooted.value
        }],
        "style": {
          width: convertToUnit(props.width === "auto" ? naturalWidth.value : props.width)
        },
        "aspectRatio": aspectRatio.value,
        "aria-label": props.alt,
        "role": props.alt ? "img" : void 0
      }, {
        additional: () => createVNode(Fragment, null, [createVNode(__image, null, null), createVNode(__preloadImage, null, null), createVNode(__gradient, null, null), createVNode(__placeholder, null, null), createVNode(__error, null, null)]),
        default: slots.default
      }), [[resolveDirective("intersect"), {
        handler: init,
        options: props.options
      }, null, {
        once: true
      }]]));
      return {
        currentSrc,
        image,
        state,
        naturalWidth,
        naturalHeight
      };
    }
  });

  // node_modules/vuetify/lib/composables/tag.mjs
  var makeTagProps = propsFactory({
    tag: {
      type: String,
      default: "div"
    }
  }, "tag");

  // node_modules/vuetify/lib/components/VToolbar/VToolbarTitle.mjs
  var VToolbarTitle = genericComponent()({
    name: "VToolbarTitle",
    props: {
      text: String,
      ...makeTagProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      useRender(() => {
        var _slots$default;
        const hasText = !!(slots.default || slots.text || props.text);
        return createVNode(props.tag, {
          "class": "v-toolbar-title"
        }, {
          default: () => [hasText && createVNode("div", {
            "class": "v-toolbar-title__placeholder"
          }, [slots.text ? slots.text() : props.text, (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)])]
        });
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/composables/border.mjs
  var makeBorderProps = propsFactory({
    border: [Boolean, Number, String]
  }, "border");
  function useBorder(props) {
    let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
    const borderClasses = computed2(() => {
      const border = isRef(props) ? props.value : props.border;
      const classes = [];
      if (border === true || border === "") {
        classes.push(`${name}--border`);
      } else if (typeof border === "string" || border === 0) {
        for (const value of String(border).split(" ")) {
          classes.push(`border-${value}`);
        }
      }
      return classes;
    });
    return {
      borderClasses
    };
  }

  // node_modules/vuetify/lib/composables/elevation.mjs
  var makeElevationProps = propsFactory({
    elevation: {
      type: [Number, String],
      validator(v) {
        const value = parseInt(v);
        return !isNaN(value) && value >= 0 && value <= 24;
      }
    }
  }, "elevation");
  function useElevation(props) {
    const elevationClasses = computed2(() => {
      const elevation = isRef(props) ? props.value : props.elevation;
      const classes = [];
      if (elevation == null)
        return classes;
      classes.push(`elevation-${elevation}`);
      return classes;
    });
    return {
      elevationClasses
    };
  }

  // node_modules/vuetify/lib/composables/rounded.mjs
  var makeRoundedProps = propsFactory({
    rounded: {
      type: [Boolean, Number, String],
      default: void 0
    }
  }, "rounded");
  function useRounded(props) {
    let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
    const roundedClasses = computed2(() => {
      const rounded = isRef(props) ? props.value : props.rounded;
      const classes = [];
      if (rounded === true || rounded === "") {
        classes.push(`${name}--rounded`);
      } else if (typeof rounded === "string" || rounded === 0) {
        for (const value of String(rounded).split(" ")) {
          classes.push(`rounded-${value}`);
        }
      }
      return classes;
    });
    return {
      roundedClasses
    };
  }

  // node_modules/vuetify/lib/composables/color.mjs
  function useColor(colors) {
    return destructComputed(() => {
      const classes = [];
      const styles = {};
      if (colors.value.background) {
        if (isCssColor(colors.value.background)) {
          styles.backgroundColor = colors.value.background;
        } else {
          classes.push(`bg-${colors.value.background}`);
        }
      }
      if (colors.value.text) {
        if (isCssColor(colors.value.text)) {
          styles.color = colors.value.text;
          styles.caretColor = colors.value.text;
        } else {
          classes.push(`text-${colors.value.text}`);
        }
      }
      return {
        colorClasses: classes,
        colorStyles: styles
      };
    });
  }
  function useTextColor(props, name) {
    const colors = computed2(() => ({
      text: isRef(props) ? props.value : name ? props[name] : null
    }));
    const {
      colorClasses: textColorClasses,
      colorStyles: textColorStyles
    } = useColor(colors);
    return {
      textColorClasses,
      textColorStyles
    };
  }
  function useBackgroundColor(props, name) {
    const colors = computed2(() => ({
      background: isRef(props) ? props.value : name ? props[name] : null
    }));
    const {
      colorClasses: backgroundColorClasses,
      colorStyles: backgroundColorStyles
    } = useColor(colors);
    return {
      backgroundColorClasses,
      backgroundColorStyles
    };
  }

  // node_modules/vuetify/lib/components/VToolbar/VToolbar.mjs
  var allowedDensities = [null, "prominent", "default", "comfortable", "compact"];
  var makeVToolbarProps = propsFactory({
    absolute: Boolean,
    collapse: Boolean,
    color: String,
    density: {
      type: String,
      default: "default",
      validator: (v) => allowedDensities.includes(v)
    },
    extended: Boolean,
    extensionHeight: {
      type: [Number, String],
      default: 48
    },
    flat: Boolean,
    floating: Boolean,
    height: {
      type: [Number, String],
      default: 64
    },
    image: String,
    title: String,
    ...makeBorderProps(),
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeTagProps({
      tag: "header"
    }),
    ...makeThemeProps()
  }, "v-toolbar");
  var VToolbar = genericComponent()({
    name: "VToolbar",
    props: makeVToolbarProps(),
    setup(props, _ref) {
      var _slots$extension;
      let {
        slots
      } = _ref;
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(toRef(props, "color"));
      const {
        borderClasses
      } = useBorder(props);
      const {
        elevationClasses
      } = useElevation(props);
      const {
        roundedClasses
      } = useRounded(props);
      const {
        themeClasses
      } = provideTheme(props);
      const isExtended = ref(!!(props.extended || (_slots$extension = slots.extension) != null && _slots$extension.call(slots)));
      const contentHeight = computed2(() => parseInt(Number(props.height) + (props.density === "prominent" ? Number(props.height) : 0) - (props.density === "comfortable" ? 8 : 0) - (props.density === "compact" ? 16 : 0), 10));
      const extensionHeight = computed2(() => isExtended.value ? parseInt(Number(props.extensionHeight) + (props.density === "prominent" ? Number(props.extensionHeight) : 0) - (props.density === "comfortable" ? 4 : 0) - (props.density === "compact" ? 8 : 0), 10) : 0);
      provideDefaults({
        VBtn: {
          variant: "text"
        }
      });
      useRender(() => {
        var _slots$extension2, _slots$image, _slots$prepend, _slots$default, _slots$append;
        const hasTitle = !!(props.title || slots.title);
        const hasImage = !!(slots.image || props.image);
        const extension = (_slots$extension2 = slots.extension) == null ? void 0 : _slots$extension2.call(slots);
        isExtended.value = !!(props.extended || extension);
        return createVNode(props.tag, {
          "class": ["v-toolbar", {
            "v-toolbar--absolute": props.absolute,
            "v-toolbar--collapse": props.collapse,
            "v-toolbar--flat": props.flat,
            "v-toolbar--floating": props.floating,
            [`v-toolbar--density-${props.density}`]: true
          }, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value, themeClasses.value],
          "style": [backgroundColorStyles.value]
        }, {
          default: () => [hasImage && createVNode("div", {
            "key": "image",
            "class": "v-toolbar__image"
          }, [createVNode(VDefaultsProvider, {
            "defaults": {
              VImg: {
                cover: true,
                src: props.image
              }
            }
          }, {
            default: () => [slots.image ? (_slots$image = slots.image) == null ? void 0 : _slots$image.call(slots) : createVNode(VImg, null, null)]
          })]), createVNode("div", {
            "class": "v-toolbar__content",
            "style": {
              height: convertToUnit(contentHeight.value)
            }
          }, [slots.prepend && createVNode("div", {
            "class": "v-toolbar__prepend"
          }, [(_slots$prepend = slots.prepend) == null ? void 0 : _slots$prepend.call(slots)]), hasTitle && createVNode(VToolbarTitle, {
            "key": "title",
            "text": props.title
          }, {
            text: slots.title
          }), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots), slots.append && createVNode("div", {
            "class": "v-toolbar__append"
          }, [(_slots$append = slots.append) == null ? void 0 : _slots$append.call(slots)])]), createVNode(VExpandTransition, null, {
            default: () => [isExtended.value && createVNode("div", {
              "class": "v-toolbar__extension",
              "style": {
                height: convertToUnit(extensionHeight.value)
              }
            }, [extension])]
          })]
        });
      });
      return {
        contentHeight,
        extensionHeight
      };
    }
  });
  function filterToolbarProps(props) {
    return pick(props, Object.keys((VToolbar == null ? void 0 : VToolbar.props) ?? {}));
  }

  // node_modules/vuetify/lib/composables/toggleScope.mjs
  function useToggleScope(source, cb) {
    let scope;
    watch(source, (active) => {
      if (active && !scope) {
        scope = effectScope();
        scope.run(cb);
      } else {
        var _scope;
        (_scope = scope) == null ? void 0 : _scope.stop();
        scope = void 0;
      }
    }, {
      immediate: true
    });
  }

  // node_modules/vuetify/lib/composables/proxiedModel.mjs
  function useProxiedModel(props, prop, defaultValue) {
    let transformIn = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : (v) => v;
    let transformOut = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : (v) => v;
    const vm = getCurrentInstance2("useProxiedModel");
    const internal = ref(props[prop]);
    const kebabProp = toKebabCase(prop);
    const checkKebab = kebabProp !== prop;
    const isControlled = checkKebab ? computed2(() => {
      var _vm$vnode$props, _vm$vnode$props2, _vm$vnode$props3, _vm$vnode$props4;
      void props[prop];
      return !!(((_vm$vnode$props = vm.vnode.props) != null && _vm$vnode$props.hasOwnProperty(prop) || (_vm$vnode$props2 = vm.vnode.props) != null && _vm$vnode$props2.hasOwnProperty(kebabProp)) && ((_vm$vnode$props3 = vm.vnode.props) != null && _vm$vnode$props3.hasOwnProperty(`onUpdate:${prop}`) || (_vm$vnode$props4 = vm.vnode.props) != null && _vm$vnode$props4.hasOwnProperty(`onUpdate:${kebabProp}`)));
    }) : computed2(() => {
      var _vm$vnode$props5, _vm$vnode$props6;
      void props[prop];
      return !!((_vm$vnode$props5 = vm.vnode.props) != null && _vm$vnode$props5.hasOwnProperty(prop) && (_vm$vnode$props6 = vm.vnode.props) != null && _vm$vnode$props6.hasOwnProperty(`onUpdate:${prop}`));
    });
    useToggleScope(() => !isControlled.value, () => {
      watch(() => props[prop], (val) => {
        internal.value = val;
      });
    });
    const model = computed2({
      get() {
        return transformIn(isControlled.value ? props[prop] : internal.value);
      },
      set(newValue) {
        if (transformIn(isControlled.value ? props[prop] : internal.value) === newValue) {
          return;
        }
        newValue = transformOut(newValue);
        internal.value = newValue;
        vm == null ? void 0 : vm.emit(`update:${prop}`, newValue);
      }
    });
    Object.defineProperty(model, "externalValue", {
      get: () => isControlled.value ? props[prop] : internal.value
    });
    return model;
  }

  // node_modules/vuetify/lib/components/VAppBar/VAppBar.mjs
  var VAppBar = defineComponent2({
    name: "VAppBar",
    props: {
      modelValue: {
        type: Boolean,
        default: true
      },
      location: {
        type: String,
        default: "top",
        validator: (value) => ["top", "bottom"].includes(value)
      },
      ...makeVToolbarProps(),
      ...makeLayoutItemProps(),
      height: {
        type: [Number, String],
        default: 64
      }
    },
    emits: {
      "update:modelValue": (value) => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const vToolbarRef = ref();
      const isActive = useProxiedModel(props, "modelValue");
      const height = computed2(() => {
        var _vToolbarRef$value, _vToolbarRef$value2;
        const height2 = ((_vToolbarRef$value = vToolbarRef.value) == null ? void 0 : _vToolbarRef$value.contentHeight) ?? 0;
        const extensionHeight = ((_vToolbarRef$value2 = vToolbarRef.value) == null ? void 0 : _vToolbarRef$value2.extensionHeight) ?? 0;
        return height2 + extensionHeight;
      });
      const {
        layoutItemStyles
      } = useLayoutItem({
        id: props.name,
        order: computed2(() => parseInt(props.order, 10)),
        position: toRef(props, "location"),
        layoutSize: height,
        elementSize: height,
        active: isActive,
        absolute: toRef(props, "absolute")
      });
      useRender(() => {
        const [toolbarProps] = filterToolbarProps(props);
        return createVNode(VToolbar, mergeProps({
          "ref": vToolbarRef,
          "class": ["v-app-bar", {
            "v-app-bar--bottom": props.location === "bottom"
          }],
          "style": {
            ...layoutItemStyles.value,
            height: void 0
          }
        }, toolbarProps), slots);
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/composables/density.mjs
  var allowedDensities2 = [null, "default", "comfortable", "compact"];
  var makeDensityProps = propsFactory({
    density: {
      type: String,
      default: "default",
      validator: (v) => allowedDensities2.includes(v)
    }
  }, "density");
  function useDensity(props) {
    let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
    const densityClasses = computed2(() => {
      return `${name}--density-${props.density}`;
    });
    return {
      densityClasses
    };
  }

  // node_modules/vuetify/lib/composables/variant.mjs
  var allowedVariants = ["elevated", "flat", "tonal", "outlined", "text", "plain"];
  function genOverlays(isClickable, name) {
    return createVNode(Fragment, null, [isClickable && createVNode("span", {
      "key": "overlay",
      "class": `${name}__overlay`
    }, null), createVNode("span", {
      "key": "underlay",
      "class": `${name}__underlay`
    }, null)]);
  }
  var makeVariantProps = propsFactory({
    color: String,
    variant: {
      type: String,
      default: "elevated",
      validator: (v) => allowedVariants.includes(v)
    }
  }, "variant");
  function useVariant(props) {
    let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
    const variantClasses = computed2(() => {
      const {
        variant
      } = unref(props);
      return `${name}--variant-${variant}`;
    });
    const {
      colorClasses,
      colorStyles
    } = useColor(computed2(() => {
      const {
        variant,
        color
      } = unref(props);
      return {
        [["elevated", "flat"].includes(variant) ? "background" : "text"]: color
      };
    }));
    return {
      colorClasses,
      colorStyles,
      variantClasses
    };
  }

  // node_modules/vuetify/lib/components/VBtnGroup/VBtnGroup.mjs
  var VBtnGroup = defineComponent2({
    name: "VBtnGroup",
    props: {
      divided: Boolean,
      ...makeBorderProps(),
      ...makeDensityProps(),
      ...makeElevationProps(),
      ...makeRoundedProps(),
      ...makeTagProps(),
      ...makeThemeProps(),
      ...makeVariantProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        themeClasses
      } = provideTheme(props);
      const {
        densityClasses
      } = useDensity(props);
      const {
        borderClasses
      } = useBorder(props);
      const {
        elevationClasses
      } = useElevation(props);
      const {
        roundedClasses
      } = useRounded(props);
      provideDefaults({
        VBtn: {
          height: "auto",
          color: toRef(props, "color"),
          density: toRef(props, "density"),
          flat: true,
          variant: toRef(props, "variant")
        }
      });
      useRender(() => {
        return createVNode(props.tag, {
          "class": ["v-btn-group", {
            "v-btn-group--divided": props.divided
          }, themeClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value]
        }, slots);
      });
    }
  });

  // node_modules/vuetify/lib/composables/group.mjs
  var makeGroupProps = propsFactory({
    modelValue: {
      type: null,
      default: void 0
    },
    multiple: Boolean,
    mandatory: [Boolean, String],
    max: Number,
    selectedClass: String,
    disabled: Boolean
  }, "group");
  var makeGroupItemProps = propsFactory({
    value: null,
    disabled: Boolean,
    selectedClass: String
  }, "group-item");
  function useGroupItem(props, injectKey) {
    let required = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
    const vm = getCurrentInstance2("useGroupItem");
    if (!vm) {
      throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");
    }
    const id = getUid();
    provide(Symbol.for(`${injectKey.description}:id`), id);
    const group = inject(injectKey, null);
    if (!group) {
      if (!required)
        return group;
      throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${injectKey.description}`);
    }
    const value = toRef(props, "value");
    const disabled = computed2(() => group.disabled.value || props.disabled);
    group.register({
      id,
      value,
      disabled
    }, vm);
    onBeforeUnmount(() => {
      group.unregister(id);
    });
    const isSelected = computed2(() => {
      return group.isSelected(id);
    });
    const selectedClass = computed2(() => isSelected.value && [group.selectedClass.value, props.selectedClass]);
    watch(isSelected, (value2) => {
      vm.emit("group:selected", {
        value: value2
      });
    });
    return {
      id,
      isSelected,
      toggle: () => group.select(id, !isSelected.value),
      select: (value2) => group.select(id, value2),
      selectedClass,
      value,
      disabled,
      group
    };
  }
  function useGroup(props, injectKey) {
    let isUnmounted = false;
    const items = reactive([]);
    const selected = useProxiedModel(props, "modelValue", [], (v) => {
      if (v == null)
        return [];
      return getIds(items, wrapInArray(v));
    }, (v) => {
      const arr = getValues(items, v);
      return props.multiple ? arr : arr[0];
    });
    const groupVm = getCurrentInstance2("useGroup");
    function register(item, vm) {
      const unwrapped = item;
      const key = Symbol.for(`${injectKey.description}:id`);
      const children = findChildrenWithProvide(key, groupVm == null ? void 0 : groupVm.vnode);
      const index = children.indexOf(vm);
      if (index > -1) {
        items.splice(index, 0, unwrapped);
      } else {
        items.push(unwrapped);
      }
    }
    function unregister(id) {
      if (isUnmounted)
        return;
      forceMandatoryValue();
      const index = items.findIndex((item) => item.id === id);
      items.splice(index, 1);
    }
    function forceMandatoryValue() {
      const item = items.find((item2) => !item2.disabled);
      if (item && props.mandatory === "force" && !selected.value.length) {
        selected.value = [item.id];
      }
    }
    onMounted(() => {
      forceMandatoryValue();
    });
    onBeforeUnmount(() => {
      isUnmounted = true;
    });
    function select(id, value) {
      const item = items.find((item2) => item2.id === id);
      if (value && item != null && item.disabled)
        return;
      if (props.multiple) {
        const internalValue = selected.value.slice();
        const index = internalValue.findIndex((v) => v === id);
        const isSelected = ~index;
        value = value ?? !isSelected;
        if (isSelected && props.mandatory && internalValue.length <= 1)
          return;
        if (!isSelected && props.max != null && internalValue.length + 1 > props.max)
          return;
        if (index < 0 && value)
          internalValue.push(id);
        else if (index >= 0 && !value)
          internalValue.splice(index, 1);
        selected.value = internalValue;
      } else {
        const isSelected = selected.value.includes(id);
        if (props.mandatory && isSelected)
          return;
        selected.value = value ?? !isSelected ? [id] : [];
      }
    }
    function step(offset) {
      if (props.multiple)
        consoleWarn('This method is not supported when using "multiple" prop');
      if (!selected.value.length) {
        const item = items.find((item2) => !item2.disabled);
        item && (selected.value = [item.id]);
      } else {
        const currentId = selected.value[0];
        const currentIndex = items.findIndex((i) => i.id === currentId);
        let newIndex = (currentIndex + offset) % items.length;
        let newItem = items[newIndex];
        while (newItem.disabled && newIndex !== currentIndex) {
          newIndex = (newIndex + offset) % items.length;
          newItem = items[newIndex];
        }
        if (newItem.disabled)
          return;
        selected.value = [items[newIndex].id];
      }
    }
    const state = {
      register,
      unregister,
      selected,
      select,
      disabled: toRef(props, "disabled"),
      prev: () => step(items.length - 1),
      next: () => step(1),
      isSelected: (id) => selected.value.includes(id),
      selectedClass: computed2(() => props.selectedClass),
      items: computed2(() => items),
      getItemIndex: (value) => getItemIndex(items, value)
    };
    provide(injectKey, state);
    return state;
  }
  function getItemIndex(items, value) {
    const ids = getIds(items, [value]);
    if (!ids.length)
      return -1;
    return items.findIndex((item) => item.id === ids[0]);
  }
  function getIds(items, modelValue) {
    const ids = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.value != null) {
        if (modelValue.find((value) => deepEqual(value, item.value)) != null) {
          ids.push(item.id);
        }
      } else if (modelValue.includes(i)) {
        ids.push(item.id);
      }
    }
    return ids;
  }
  function getValues(items, ids) {
    const values = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (ids.includes(item.id)) {
        values.push(item.value != null ? item.value : i);
      }
    }
    return values;
  }

  // node_modules/vuetify/lib/components/VBtnToggle/VBtnToggle.mjs
  var VBtnToggleSymbol = Symbol.for("vuetify:v-btn-toggle");
  var VBtnToggle = genericComponent()({
    name: "VBtnToggle",
    props: makeGroupProps(),
    emits: {
      "update:modelValue": (value) => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        isSelected,
        next,
        prev,
        select,
        selected
      } = useGroup(props, VBtnToggleSymbol);
      useRender(() => {
        var _slots$default;
        return createVNode(VBtnGroup, {
          "class": "v-btn-toggle"
        }, {
          default: () => [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
            isSelected,
            next,
            prev,
            select,
            selected
          })]
        });
      });
      return {
        next,
        prev,
        select
      };
    }
  });

  // node_modules/vuetify/lib/composables/size.mjs
  var predefinedSizes = ["x-small", "small", "default", "large", "x-large"];
  var makeSizeProps = propsFactory({
    size: {
      type: [String, Number],
      default: "default"
    }
  }, "size");
  function useSize(props) {
    let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
    return destructComputed(() => {
      let sizeClasses;
      let sizeStyles;
      if (includes(predefinedSizes, props.size)) {
        sizeClasses = `${name}--size-${props.size}`;
      } else if (props.size) {
        sizeStyles = {
          width: convertToUnit(props.size),
          height: convertToUnit(props.size)
        };
      }
      return {
        sizeClasses,
        sizeStyles
      };
    });
  }

  // node_modules/vuetify/lib/components/VIcon/VIcon.mjs
  var makeVIconProps = propsFactory({
    color: String,
    start: Boolean,
    end: Boolean,
    icon: IconValue,
    ...makeSizeProps(),
    ...makeTagProps({
      tag: "i"
    }),
    ...makeThemeProps()
  }, "v-icon");
  var VIcon = defineComponent2({
    name: "VIcon",
    props: makeVIconProps(),
    setup(props, _ref) {
      let {
        attrs,
        slots
      } = _ref;
      let slotIcon;
      if (slots.default) {
        slotIcon = computed2(() => {
          var _slots$default, _flattenFragments$fil;
          const slot = (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots);
          if (!slot)
            return;
          return (_flattenFragments$fil = flattenFragments(slot).filter((node) => node.children && typeof node.children === "string")[0]) == null ? void 0 : _flattenFragments$fil.children;
        });
      }
      const {
        themeClasses
      } = provideTheme(props);
      const {
        iconData
      } = useIcon(slotIcon || props);
      const {
        sizeClasses
      } = useSize(props);
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(toRef(props, "color"));
      useRender(() => createVNode(iconData.value.component, {
        "tag": props.tag,
        "icon": iconData.value.icon,
        "class": ["v-icon", "notranslate", themeClasses.value, sizeClasses.value, textColorClasses.value, {
          "v-icon--clickable": !!attrs.onClick,
          "v-icon--start": props.start,
          "v-icon--end": props.end
        }],
        "style": [!sizeClasses.value ? {
          fontSize: convertToUnit(props.size),
          height: convertToUnit(props.size),
          width: convertToUnit(props.size)
        } : void 0, textColorStyles.value],
        "role": attrs.onClick ? "button" : void 0,
        "aria-hidden": !attrs.onClick
      }, null));
      return {};
    }
  });

  // node_modules/vuetify/lib/composables/intersectionObserver.mjs
  function useIntersectionObserver(callback) {
    const intersectionRef = ref();
    const isIntersecting = ref(false);
    if (SUPPORTS_INTERSECTION) {
      const observer = new IntersectionObserver((entries) => {
        callback == null ? void 0 : callback(entries, observer);
        isIntersecting.value = !!entries.find((entry) => entry.isIntersecting);
      });
      onBeforeUnmount(() => {
        observer.disconnect();
      });
      watch(intersectionRef, (newValue, oldValue) => {
        if (oldValue) {
          observer.unobserve(oldValue);
          isIntersecting.value = false;
        }
        if (newValue)
          observer.observe(newValue);
      }, {
        flush: "post"
      });
    }
    return {
      intersectionRef,
      isIntersecting
    };
  }

  // node_modules/vuetify/lib/components/VProgressCircular/VProgressCircular.mjs
  var VProgressCircular = defineComponent2({
    name: "VProgressCircular",
    props: {
      bgColor: String,
      color: String,
      indeterminate: [Boolean, String],
      modelValue: {
        type: [Number, String],
        default: 0
      },
      rotate: {
        type: [Number, String],
        default: 0
      },
      width: {
        type: [Number, String],
        default: 4
      },
      ...makeSizeProps(),
      ...makeTagProps({
        tag: "div"
      }),
      ...makeThemeProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const MAGIC_RADIUS_CONSTANT = 20;
      const CIRCUMFERENCE = 2 * Math.PI * MAGIC_RADIUS_CONSTANT;
      const root = ref();
      const {
        themeClasses
      } = provideTheme(props);
      const {
        sizeClasses,
        sizeStyles
      } = useSize(props);
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(toRef(props, "color"));
      const {
        textColorClasses: underlayColorClasses,
        textColorStyles: underlayColorStyles
      } = useTextColor(toRef(props, "bgColor"));
      const {
        intersectionRef,
        isIntersecting
      } = useIntersectionObserver();
      const {
        resizeRef,
        contentRect
      } = useResizeObserver();
      const normalizedValue = computed2(() => Math.max(0, Math.min(100, parseFloat(props.modelValue))));
      const width = computed2(() => Number(props.width));
      const size2 = computed2(() => {
        return sizeStyles.value ? Number(props.size) : contentRect.value ? contentRect.value.width : Math.max(width.value, 32);
      });
      const diameter = computed2(() => MAGIC_RADIUS_CONSTANT / (1 - width.value / size2.value) * 2);
      const strokeWidth = computed2(() => width.value / size2.value * diameter.value);
      const strokeDashOffset = computed2(() => convertToUnit((100 - normalizedValue.value) / 100 * CIRCUMFERENCE));
      watchEffect(() => {
        intersectionRef.value = root.value;
        resizeRef.value = root.value;
      });
      useRender(() => createVNode(props.tag, {
        "ref": root,
        "class": ["v-progress-circular", {
          "v-progress-circular--indeterminate": !!props.indeterminate,
          "v-progress-circular--visible": isIntersecting.value,
          "v-progress-circular--disable-shrink": props.indeterminate === "disable-shrink"
        }, themeClasses.value, sizeClasses.value, textColorClasses.value],
        "style": [sizeStyles.value, textColorStyles.value],
        "role": "progressbar",
        "aria-valuemin": "0",
        "aria-valuemax": "100",
        "aria-valuenow": props.indeterminate ? void 0 : normalizedValue.value
      }, {
        default: () => [createVNode("svg", {
          "style": {
            transform: `rotate(calc(-90deg + ${Number(props.rotate)}deg))`
          },
          "xmlns": "http://www.w3.org/2000/svg",
          "viewBox": `0 0 ${diameter.value} ${diameter.value}`
        }, [createVNode("circle", {
          "class": ["v-progress-circular__underlay", underlayColorClasses.value],
          "style": underlayColorStyles.value,
          "fill": "transparent",
          "cx": "50%",
          "cy": "50%",
          "r": MAGIC_RADIUS_CONSTANT,
          "stroke-width": strokeWidth.value,
          "stroke-dasharray": CIRCUMFERENCE,
          "stroke-dashoffset": 0
        }, null), createVNode("circle", {
          "class": "v-progress-circular__overlay",
          "fill": "transparent",
          "cx": "50%",
          "cy": "50%",
          "r": MAGIC_RADIUS_CONSTANT,
          "stroke-width": strokeWidth.value,
          "stroke-dasharray": CIRCUMFERENCE,
          "stroke-dashoffset": strokeDashOffset.value
        }, null)]), slots.default && createVNode("div", {
          "class": "v-progress-circular__content"
        }, [slots.default({
          value: normalizedValue.value
        })])]
      }));
      return {};
    }
  });

  // node_modules/vuetify/lib/directives/ripple/index.mjs
  var stopSymbol = Symbol("rippleStop");
  var DELAY_RIPPLE = 80;
  function transform(el, value) {
    el.style.transform = value;
    el.style.webkitTransform = value;
  }
  function opacity(el, value) {
    el.style.opacity = `calc(${value} * var(--v-theme-overlay-multiplier))`;
  }
  function isTouchEvent(e) {
    return e.constructor.name === "TouchEvent";
  }
  function isKeyboardEvent(e) {
    return e.constructor.name === "KeyboardEvent";
  }
  var calculate = function(e, el) {
    var _el$_ripple;
    let value = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    let localX = 0;
    let localY = 0;
    if (!isKeyboardEvent(e)) {
      const offset = el.getBoundingClientRect();
      const target = isTouchEvent(e) ? e.touches[e.touches.length - 1] : e;
      localX = target.clientX - offset.left;
      localY = target.clientY - offset.top;
    }
    let radius = 0;
    let scale = 0.3;
    if ((_el$_ripple = el._ripple) != null && _el$_ripple.circle) {
      scale = 0.15;
      radius = el.clientWidth / 2;
      radius = value.center ? radius : radius + Math.sqrt((localX - radius) ** 2 + (localY - radius) ** 2) / 4;
    } else {
      radius = Math.sqrt(el.clientWidth ** 2 + el.clientHeight ** 2) / 2;
    }
    const centerX = `${(el.clientWidth - radius * 2) / 2}px`;
    const centerY = `${(el.clientHeight - radius * 2) / 2}px`;
    const x = value.center ? centerX : `${localX - radius}px`;
    const y = value.center ? centerY : `${localY - radius}px`;
    return {
      radius,
      scale,
      x,
      y,
      centerX,
      centerY
    };
  };
  var ripples = {
    show(e, el) {
      var _el$_ripple2;
      let value = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      if (!(el != null && (_el$_ripple2 = el._ripple) != null && _el$_ripple2.enabled)) {
        return;
      }
      const container = document.createElement("span");
      const animation = document.createElement("span");
      container.appendChild(animation);
      container.className = "v-ripple__container";
      if (value.class) {
        container.className += ` ${value.class}`;
      }
      const {
        radius,
        scale,
        x,
        y,
        centerX,
        centerY
      } = calculate(e, el, value);
      const size2 = `${radius * 2}px`;
      animation.className = "v-ripple__animation";
      animation.style.width = size2;
      animation.style.height = size2;
      el.appendChild(container);
      const computed3 = window.getComputedStyle(el);
      if (computed3 && computed3.position === "static") {
        el.style.position = "relative";
        el.dataset.previousPosition = "static";
      }
      animation.classList.add("v-ripple__animation--enter");
      animation.classList.add("v-ripple__animation--visible");
      transform(animation, `translate(${x}, ${y}) scale3d(${scale},${scale},${scale})`);
      opacity(animation, 0);
      animation.dataset.activated = String(performance.now());
      setTimeout(() => {
        animation.classList.remove("v-ripple__animation--enter");
        animation.classList.add("v-ripple__animation--in");
        transform(animation, `translate(${centerX}, ${centerY}) scale3d(1,1,1)`);
        opacity(animation, 0.08);
      }, 0);
    },
    hide(el) {
      var _el$_ripple3;
      if (!(el != null && (_el$_ripple3 = el._ripple) != null && _el$_ripple3.enabled))
        return;
      const ripples2 = el.getElementsByClassName("v-ripple__animation");
      if (ripples2.length === 0)
        return;
      const animation = ripples2[ripples2.length - 1];
      if (animation.dataset.isHiding)
        return;
      else
        animation.dataset.isHiding = "true";
      const diff = performance.now() - Number(animation.dataset.activated);
      const delay = Math.max(250 - diff, 0);
      setTimeout(() => {
        animation.classList.remove("v-ripple__animation--in");
        animation.classList.add("v-ripple__animation--out");
        opacity(animation, 0);
        setTimeout(() => {
          const ripples3 = el.getElementsByClassName("v-ripple__animation");
          if (ripples3.length === 1 && el.dataset.previousPosition) {
            el.style.position = el.dataset.previousPosition;
            delete el.dataset.previousPosition;
          }
          animation.parentNode && el.removeChild(animation.parentNode);
        }, 300);
      }, delay);
    }
  };
  function isRippleEnabled(value) {
    return typeof value === "undefined" || !!value;
  }
  function rippleShow(e) {
    const value = {};
    const element = e.currentTarget;
    if (!(element != null && element._ripple) || element._ripple.touched || e[stopSymbol])
      return;
    e[stopSymbol] = true;
    if (isTouchEvent(e)) {
      element._ripple.touched = true;
      element._ripple.isTouch = true;
    } else {
      if (element._ripple.isTouch)
        return;
    }
    value.center = element._ripple.centered || isKeyboardEvent(e);
    if (element._ripple.class) {
      value.class = element._ripple.class;
    }
    if (isTouchEvent(e)) {
      if (element._ripple.showTimerCommit)
        return;
      element._ripple.showTimerCommit = () => {
        ripples.show(e, element, value);
      };
      element._ripple.showTimer = window.setTimeout(() => {
        var _element$_ripple;
        if (element != null && (_element$_ripple = element._ripple) != null && _element$_ripple.showTimerCommit) {
          element._ripple.showTimerCommit();
          element._ripple.showTimerCommit = null;
        }
      }, DELAY_RIPPLE);
    } else {
      ripples.show(e, element, value);
    }
  }
  function rippleStop(e) {
    e[stopSymbol] = true;
  }
  function rippleHide(e) {
    const element = e.currentTarget;
    if (!element || !element._ripple)
      return;
    window.clearTimeout(element._ripple.showTimer);
    if (e.type === "touchend" && element._ripple.showTimerCommit) {
      element._ripple.showTimerCommit();
      element._ripple.showTimerCommit = null;
      element._ripple.showTimer = window.setTimeout(() => {
        rippleHide(e);
      });
      return;
    }
    window.setTimeout(() => {
      if (element._ripple) {
        element._ripple.touched = false;
      }
    });
    ripples.hide(element);
  }
  function rippleCancelShow(e) {
    const element = e.currentTarget;
    if (!element || !element._ripple)
      return;
    if (element._ripple.showTimerCommit) {
      element._ripple.showTimerCommit = null;
    }
    window.clearTimeout(element._ripple.showTimer);
  }
  var keyboardRipple = false;
  function keyboardRippleShow(e) {
    if (!keyboardRipple && (e.keyCode === keyCodes.enter || e.keyCode === keyCodes.space)) {
      keyboardRipple = true;
      rippleShow(e);
    }
  }
  function keyboardRippleHide(e) {
    keyboardRipple = false;
    rippleHide(e);
  }
  function focusRippleHide(e) {
    if (keyboardRipple) {
      keyboardRipple = false;
      rippleHide(e);
    }
  }
  function updateRipple(el, binding, wasEnabled) {
    const {
      value,
      modifiers
    } = binding;
    const enabled = isRippleEnabled(value);
    if (!enabled) {
      ripples.hide(el);
    }
    el._ripple = el._ripple ?? {};
    el._ripple.enabled = enabled;
    el._ripple.centered = modifiers.center;
    el._ripple.circle = modifiers.circle;
    if (isObject2(value) && value.class) {
      el._ripple.class = value.class;
    }
    if (enabled && !wasEnabled) {
      if (modifiers.stop) {
        el.addEventListener("touchstart", rippleStop, {
          passive: true
        });
        el.addEventListener("mousedown", rippleStop);
        return;
      }
      el.addEventListener("touchstart", rippleShow, {
        passive: true
      });
      el.addEventListener("touchend", rippleHide, {
        passive: true
      });
      el.addEventListener("touchmove", rippleCancelShow, {
        passive: true
      });
      el.addEventListener("touchcancel", rippleHide);
      el.addEventListener("mousedown", rippleShow);
      el.addEventListener("mouseup", rippleHide);
      el.addEventListener("mouseleave", rippleHide);
      el.addEventListener("keydown", keyboardRippleShow);
      el.addEventListener("keyup", keyboardRippleHide);
      el.addEventListener("blur", focusRippleHide);
      el.addEventListener("dragstart", rippleHide, {
        passive: true
      });
    } else if (!enabled && wasEnabled) {
      removeListeners(el);
    }
  }
  function removeListeners(el) {
    el.removeEventListener("mousedown", rippleShow);
    el.removeEventListener("touchstart", rippleShow);
    el.removeEventListener("touchend", rippleHide);
    el.removeEventListener("touchmove", rippleCancelShow);
    el.removeEventListener("touchcancel", rippleHide);
    el.removeEventListener("mouseup", rippleHide);
    el.removeEventListener("mouseleave", rippleHide);
    el.removeEventListener("keydown", keyboardRippleShow);
    el.removeEventListener("keyup", keyboardRippleHide);
    el.removeEventListener("dragstart", rippleHide);
    el.removeEventListener("blur", focusRippleHide);
  }
  function mounted2(el, binding) {
    updateRipple(el, binding, false);
  }
  function unmounted2(el) {
    delete el._ripple;
    removeListeners(el);
  }
  function updated(el, binding) {
    if (binding.value === binding.oldValue) {
      return;
    }
    const wasEnabled = isRippleEnabled(binding.oldValue);
    updateRipple(el, binding, wasEnabled);
  }
  var Ripple = {
    mounted: mounted2,
    unmounted: unmounted2,
    updated
  };
  var ripple_default = Ripple;

  // node_modules/vuetify/lib/components/VProgressLinear/VProgressLinear.mjs
  var VProgressLinear = defineComponent2({
    name: "VProgressLinear",
    props: {
      active: {
        type: Boolean,
        default: true
      },
      bgColor: String,
      bgOpacity: [Number, String],
      bufferValue: {
        type: [Number, String],
        default: 0
      },
      clickable: Boolean,
      color: String,
      height: {
        type: [Number, String],
        default: 4
      },
      indeterminate: Boolean,
      max: {
        type: [Number, String],
        default: 100
      },
      modelValue: {
        type: [Number, String],
        default: 0
      },
      reverse: Boolean,
      stream: Boolean,
      striped: Boolean,
      roundedBar: Boolean,
      ...makeRoundedProps(),
      ...makeTagProps(),
      ...makeThemeProps()
    },
    emits: {
      "update:modelValue": (value) => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const progress = useProxiedModel(props, "modelValue");
      const {
        isRtl
      } = useRtl();
      const {
        themeClasses
      } = provideTheme(props);
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(props, "color");
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(computed2(() => props.bgColor || props.color));
      const {
        backgroundColorClasses: barColorClasses,
        backgroundColorStyles: barColorStyles
      } = useBackgroundColor(props, "color");
      const {
        roundedClasses
      } = useRounded(props);
      const {
        intersectionRef,
        isIntersecting
      } = useIntersectionObserver();
      const max = computed2(() => parseInt(props.max, 10));
      const height = computed2(() => parseInt(props.height, 10));
      const normalizedBuffer = computed2(() => parseFloat(props.bufferValue) / max.value * 100);
      const normalizedValue = computed2(() => parseFloat(progress.value) / max.value * 100);
      const isReversed = computed2(() => isRtl.value !== props.reverse);
      const transition = computed2(() => props.indeterminate ? "fade-transition" : "slide-x-transition");
      const opacity2 = computed2(() => {
        return props.bgOpacity == null ? props.bgOpacity : parseFloat(props.bgOpacity);
      });
      function handleClick(e) {
        if (!intersectionRef.value)
          return;
        const {
          left,
          right,
          width
        } = intersectionRef.value.getBoundingClientRect();
        const value = isReversed.value ? width - e.clientX + (right - width) : e.clientX - left;
        progress.value = Math.round(value / width * max.value);
      }
      useRender(() => createVNode(props.tag, {
        "ref": intersectionRef,
        "class": ["v-progress-linear", {
          "v-progress-linear--active": props.active && isIntersecting.value,
          "v-progress-linear--reverse": isReversed.value,
          "v-progress-linear--rounded": props.rounded,
          "v-progress-linear--rounded-bar": props.roundedBar,
          "v-progress-linear--striped": props.striped
        }, roundedClasses.value, themeClasses.value],
        "style": {
          height: props.active ? convertToUnit(height.value) : 0,
          "--v-progress-linear-height": convertToUnit(height.value)
        },
        "role": "progressbar",
        "aria-valuemin": "0",
        "aria-valuemax": props.max,
        "aria-valuenow": props.indeterminate ? void 0 : normalizedValue.value,
        "onClick": props.clickable && handleClick
      }, {
        default: () => [props.stream && createVNode("div", {
          "key": "stream",
          "class": ["v-progress-linear__stream", textColorClasses.value],
          "style": {
            ...textColorStyles.value,
            [isReversed.value ? "left" : "right"]: convertToUnit(-height.value),
            borderTop: `${convertToUnit(height.value / 2)} dotted`,
            opacity: opacity2.value,
            top: `calc(50% - ${convertToUnit(height.value / 4)})`,
            width: convertToUnit(100 - normalizedBuffer.value, "%"),
            "--v-progress-linear-stream-to": convertToUnit(height.value * (isReversed.value ? 1 : -1))
          }
        }, null), createVNode("div", {
          "class": ["v-progress-linear__background", backgroundColorClasses.value],
          "style": [backgroundColorStyles.value, {
            opacity: opacity2.value,
            width: convertToUnit(!props.stream ? 100 : normalizedBuffer.value, "%")
          }]
        }, null), createVNode(Transition, {
          "name": transition.value
        }, {
          default: () => [!props.indeterminate ? createVNode("div", {
            "class": ["v-progress-linear__determinate", barColorClasses.value],
            "style": [barColorStyles.value, {
              width: convertToUnit(normalizedValue.value, "%")
            }]
          }, null) : createVNode("div", {
            "class": "v-progress-linear__indeterminate"
          }, [["long", "short"].map((bar) => createVNode("div", {
            "key": bar,
            "class": ["v-progress-linear__indeterminate", bar, barColorClasses.value],
            "style": barColorStyles.value
          }, null))])]
        }), slots.default && createVNode("div", {
          "class": "v-progress-linear__content"
        }, [slots.default({
          value: normalizedValue.value,
          buffer: normalizedBuffer.value
        })])]
      }));
      return {};
    }
  });

  // node_modules/vuetify/lib/composables/loader.mjs
  var makeLoaderProps = propsFactory({
    loading: Boolean
  }, "loader");
  function useLoader(props) {
    let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
    const loaderClasses = computed2(() => ({
      [`${name}--loading`]: props.loading
    }));
    return {
      loaderClasses
    };
  }
  function LoaderSlot(props, _ref) {
    var _slots$default;
    let {
      slots
    } = _ref;
    return createVNode("div", {
      "class": `${props.name}__loader`
    }, [((_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
      color: props.color,
      isActive: props.active
    })) || createVNode(VProgressLinear, {
      "active": props.active,
      "color": props.color,
      "height": "2",
      "indeterminate": true
    }, null)]);
  }

  // node_modules/vuetify/lib/composables/location.mjs
  var oppositeMap = {
    center: "center",
    top: "bottom",
    bottom: "top",
    left: "right",
    right: "left"
  };
  var makeLocationProps = propsFactory({
    location: String
  }, "location");
  function useLocation(props) {
    let opposite = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    let offset = arguments.length > 2 ? arguments[2] : void 0;
    const {
      isRtl
    } = useRtl();
    const locationStyles = computed2(() => {
      if (!props.location)
        return {};
      const {
        side,
        align
      } = parseAnchor(props.location.split(" ").length > 1 ? props.location : `${props.location} center`, isRtl.value);
      function getOffset3(side2) {
        return offset ? offset(side2) : 0;
      }
      const styles = {};
      if (side !== "center") {
        if (opposite)
          styles[oppositeMap[side]] = `calc(100% - ${getOffset3(side)}px)`;
        else
          styles[side] = 0;
      }
      if (align !== "center") {
        if (opposite)
          styles[oppositeMap[align]] = `calc(100% - ${getOffset3(align)}px)`;
        else
          styles[align] = 0;
      } else {
        if (side === "center")
          styles.top = styles.left = "50%";
        else {
          styles[{
            top: "left",
            bottom: "left",
            left: "top",
            right: "top"
          }[side]] = "50%";
        }
        styles.transform = {
          top: "translateX(-50%)",
          bottom: "translateX(-50%)",
          left: "translateY(-50%)",
          right: "translateY(-50%)",
          center: "translate(-50%, -50%)"
        }[side];
      }
      return styles;
    });
    return {
      locationStyles
    };
  }

  // node_modules/vuetify/lib/composables/position.mjs
  var positionValues = ["static", "relative", "fixed", "absolute", "sticky"];
  var makePositionProps = propsFactory({
    position: {
      type: String,
      validator: (v) => positionValues.includes(v)
    }
  }, "position");
  function usePosition(props) {
    let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
    const positionClasses = computed2(() => {
      return props.position ? `${name}--${props.position}` : void 0;
    });
    return {
      positionClasses
    };
  }

  // node_modules/vuetify/lib/composables/router.mjs
  function useRouter() {
    var _getCurrentInstance, _getCurrentInstance$p;
    return (_getCurrentInstance = getCurrentInstance2("useRouter")) == null ? void 0 : (_getCurrentInstance$p = _getCurrentInstance.proxy) == null ? void 0 : _getCurrentInstance$p.$router;
  }
  function useLink(props, attrs) {
    const RouterLink = resolveDynamicComponent("RouterLink");
    const isLink = computed2(() => !!(props.href || props.to));
    const isClickable = computed2(() => {
      return (isLink == null ? void 0 : isLink.value) || !!(attrs.onClick || attrs.onClickOnce);
    });
    if (typeof RouterLink === "string") {
      return {
        isLink,
        isClickable,
        href: toRef(props, "href")
      };
    }
    const link = props.to ? RouterLink.useLink(props) : void 0;
    return {
      isLink,
      isClickable,
      route: link == null ? void 0 : link.route,
      navigate: link == null ? void 0 : link.navigate,
      isActive: link && computed2(() => {
        var _link$isExactActive, _link$isActive;
        return props.exact ? (_link$isExactActive = link.isExactActive) == null ? void 0 : _link$isExactActive.value : (_link$isActive = link.isActive) == null ? void 0 : _link$isActive.value;
      }),
      href: computed2(() => props.to ? link == null ? void 0 : link.route.value.href : props.href)
    };
  }
  var makeRouterProps = propsFactory({
    href: String,
    replace: Boolean,
    to: [String, Object],
    exact: Boolean
  }, "router");
  var inTransition = false;
  function useBackButton(router, cb) {
    let popped = false;
    let removeBefore;
    let removeAfter;
    if (IN_BROWSER) {
      nextTick(() => {
        window.addEventListener("popstate", onPopstate);
        removeBefore = router == null ? void 0 : router.beforeEach((to, from, next) => {
          if (!inTransition) {
            setTimeout(() => popped ? cb(next) : next());
          } else {
            popped ? cb(next) : next();
          }
          inTransition = true;
        });
        removeAfter = router == null ? void 0 : router.afterEach(() => {
          inTransition = false;
        });
      });
      onScopeDispose(() => {
        var _removeBefore, _removeAfter;
        window.removeEventListener("popstate", onPopstate);
        (_removeBefore = removeBefore) == null ? void 0 : _removeBefore();
        (_removeAfter = removeAfter) == null ? void 0 : _removeAfter();
      });
    }
    function onPopstate(e) {
      var _e$state;
      if ((_e$state = e.state) != null && _e$state.replaced)
        return;
      popped = true;
      setTimeout(() => popped = false);
    }
  }

  // node_modules/vuetify/lib/composables/selectLink.mjs
  function useSelectLink(link, select) {
    watch(() => {
      var _link$isActive;
      return (_link$isActive = link.isActive) == null ? void 0 : _link$isActive.value;
    }, (isActive) => {
      if (link.isLink.value && isActive && select) {
        nextTick(() => {
          select(true);
        });
      }
    }, {
      immediate: true
    });
  }

  // node_modules/vuetify/lib/components/VBtn/VBtn.mjs
  var VBtn = defineComponent2({
    name: "VBtn",
    directives: {
      Ripple
    },
    props: {
      active: {
        type: Boolean,
        default: void 0
      },
      symbol: {
        type: null,
        default: VBtnToggleSymbol
      },
      flat: Boolean,
      icon: [Boolean, String, Function, Object],
      prependIcon: IconValue,
      appendIcon: IconValue,
      block: Boolean,
      stacked: Boolean,
      ripple: {
        type: Boolean,
        default: true
      },
      ...makeBorderProps(),
      ...makeRoundedProps(),
      ...makeDensityProps(),
      ...makeDimensionProps(),
      ...makeElevationProps(),
      ...makeGroupItemProps(),
      ...makeLoaderProps(),
      ...makeLocationProps(),
      ...makePositionProps(),
      ...makeRouterProps(),
      ...makeSizeProps(),
      ...makeTagProps({
        tag: "button"
      }),
      ...makeThemeProps(),
      ...makeVariantProps({
        variant: "elevated"
      })
    },
    emits: {
      "group:selected": (val) => true
    },
    setup(props, _ref) {
      let {
        attrs,
        slots
      } = _ref;
      const {
        themeClasses
      } = provideTheme(props);
      const {
        borderClasses
      } = useBorder(props);
      const {
        colorClasses,
        colorStyles,
        variantClasses
      } = useVariant(props);
      const {
        densityClasses
      } = useDensity(props);
      const {
        dimensionStyles
      } = useDimension(props);
      const {
        elevationClasses
      } = useElevation(props);
      const {
        loaderClasses
      } = useLoader(props);
      const {
        locationStyles
      } = useLocation(props);
      const {
        positionClasses
      } = usePosition(props);
      const {
        roundedClasses
      } = useRounded(props);
      const {
        sizeClasses,
        sizeStyles
      } = useSize(props);
      const group = useGroupItem(props, props.symbol, false);
      const link = useLink(props, attrs);
      const isActive = computed2(() => {
        var _link$isActive;
        return props.active !== false && (props.active || ((_link$isActive = link.isActive) == null ? void 0 : _link$isActive.value) || (group == null ? void 0 : group.isSelected.value));
      });
      const isDisabled = computed2(() => (group == null ? void 0 : group.disabled.value) || props.disabled);
      const isElevated = computed2(() => {
        return props.variant === "elevated" && !(props.disabled || props.flat || props.border);
      });
      useSelectLink(link, group == null ? void 0 : group.select);
      useRender(() => {
        var _slots$prepend, _slots$default, _slots$append, _slots$loader;
        const Tag = link.isLink.value ? "a" : props.tag;
        const hasColor = !group || group.isSelected.value;
        const hasPrepend = !!(props.prependIcon || slots.prepend);
        const hasAppend = !!(props.appendIcon || slots.append);
        const hasIcon = !!(props.icon && props.icon !== true);
        return withDirectives(createVNode(Tag, {
          "type": Tag === "a" ? void 0 : "button",
          "class": ["v-btn", group == null ? void 0 : group.selectedClass.value, {
            "v-btn--active": isActive.value,
            "v-btn--block": props.block,
            "v-btn--disabled": isDisabled.value,
            "v-btn--elevated": isElevated.value,
            "v-btn--flat": props.flat,
            "v-btn--icon": !!props.icon,
            "v-btn--loading": props.loading,
            "v-btn--stacked": props.stacked
          }, themeClasses.value, borderClasses.value, hasColor ? colorClasses.value : void 0, densityClasses.value, elevationClasses.value, loaderClasses.value, positionClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value],
          "style": [hasColor ? colorStyles.value : void 0, dimensionStyles.value, locationStyles.value, sizeStyles.value],
          "disabled": isDisabled.value || void 0,
          "href": link.href.value,
          "onClick": (e) => {
            var _link$navigate;
            if (isDisabled.value)
              return;
            (_link$navigate = link.navigate) == null ? void 0 : _link$navigate.call(link, e);
            group == null ? void 0 : group.toggle();
          }
        }, {
          default: () => [genOverlays(true, "v-btn"), !props.icon && hasPrepend && createVNode(VDefaultsProvider, {
            "key": "prepend",
            "defaults": {
              VIcon: {
                icon: props.prependIcon
              }
            }
          }, {
            default: () => [createVNode("span", {
              "class": "v-btn__prepend"
            }, [((_slots$prepend = slots.prepend) == null ? void 0 : _slots$prepend.call(slots)) ?? createVNode(VIcon, null, null)])]
          }), createVNode("span", {
            "class": "v-btn__content",
            "data-no-activator": ""
          }, [createVNode(VDefaultsProvider, {
            "key": "content",
            "defaults": {
              VIcon: {
                icon: hasIcon ? props.icon : void 0
              }
            }
          }, {
            default: () => [((_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)) ?? (hasIcon && createVNode(VIcon, {
              "key": "icon"
            }, null))]
          })]), !props.icon && hasAppend && createVNode(VDefaultsProvider, {
            "key": "append",
            "defaults": {
              VIcon: {
                icon: props.appendIcon
              }
            }
          }, {
            default: () => [createVNode("span", {
              "class": "v-btn__append"
            }, [((_slots$append = slots.append) == null ? void 0 : _slots$append.call(slots)) ?? createVNode(VIcon, null, null)])]
          }), !!props.loading && createVNode("span", {
            "key": "loader",
            "class": "v-btn__loader"
          }, [((_slots$loader = slots.loader) == null ? void 0 : _slots$loader.call(slots)) ?? createVNode(VProgressCircular, {
            "color": typeof props.loading === "boolean" ? void 0 : props.loading,
            "indeterminate": true,
            "size": "23",
            "width": "2"
          }, null)])]
        }), [[resolveDirective("ripple"), !isDisabled.value && props.ripple, null]]);
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VAppBar/VAppBarNavIcon.mjs
  var VAppBarNavIcon = defineComponent2({
    name: "VAppBarNavIcon",
    props: {
      icon: {
        type: IconValue,
        default: "$menu"
      }
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      useRender(() => createVNode(VBtn, {
        "class": "v-app-bar-nav-icon",
        "icon": props.icon
      }, slots));
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VToolbar/VToolbarItems.mjs
  var VToolbarItems = defineComponent2({
    name: "VToolbarItems",
    props: makeVariantProps({
      variant: "text"
    }),
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      provideDefaults({
        VBtn: {
          color: toRef(props, "color"),
          height: "inherit",
          variant: toRef(props, "variant")
        }
      });
      useRender(() => {
        var _slots$default;
        return createVNode("div", {
          "class": "v-toolbar-items"
        }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]);
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VAppBar/VAppBarTitle.mjs
  var VAppBarTitle = defineComponent2({
    name: "VAppBarTitle",
    props: {
      ...VToolbarTitle.props
    },
    setup(_, _ref) {
      let {
        slots
      } = _ref;
      useRender(() => createVNode(VToolbarTitle, {
        "class": "v-app-bar-title"
      }, slots));
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VAlert/VAlertTitle.mjs
  var VAlertTitle = createSimpleFunctional("v-alert-title");

  // node_modules/vuetify/lib/components/VAlert/VAlert.mjs
  var allowedTypes = ["success", "info", "warning", "error"];
  var VAlert = defineComponent2({
    name: "VAlert",
    props: {
      border: {
        type: [Boolean, String],
        validator: (val) => {
          return typeof val === "boolean" || ["top", "end", "bottom", "start"].includes(val);
        }
      },
      borderColor: String,
      closable: Boolean,
      closeIcon: {
        type: IconValue,
        default: "$close"
      },
      closeLabel: {
        type: String,
        default: "$vuetify.close"
      },
      icon: {
        type: [Boolean, String, Function, Object],
        default: null
      },
      modelValue: {
        type: Boolean,
        default: true
      },
      prominent: Boolean,
      title: String,
      text: String,
      type: {
        type: String,
        validator: (val) => allowedTypes.includes(val)
      },
      ...makeDensityProps(),
      ...makeDimensionProps(),
      ...makeElevationProps(),
      ...makeLocationProps(),
      ...makePositionProps(),
      ...makeRoundedProps(),
      ...makeTagProps(),
      ...makeThemeProps(),
      ...makeVariantProps({
        variant: "flat"
      })
    },
    emits: {
      "update:modelValue": (value) => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const isActive = useProxiedModel(props, "modelValue");
      const icon = computed2(() => {
        if (props.icon === false)
          return void 0;
        if (!props.type)
          return props.icon;
        return props.icon ?? `$${props.type}`;
      });
      const variantProps = computed2(() => ({
        color: props.color ?? props.type,
        variant: props.variant
      }));
      const {
        themeClasses
      } = provideTheme(props);
      const {
        colorClasses,
        colorStyles,
        variantClasses
      } = useVariant(variantProps);
      const {
        densityClasses
      } = useDensity(props);
      const {
        dimensionStyles
      } = useDimension(props);
      const {
        elevationClasses
      } = useElevation(props);
      const {
        locationStyles
      } = useLocation(props);
      const {
        positionClasses
      } = usePosition(props);
      const {
        roundedClasses
      } = useRounded(props);
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(toRef(props, "borderColor"));
      const {
        t
      } = useLocale();
      const closeProps = computed2(() => ({
        "aria-label": t(props.closeLabel),
        onClick(e) {
          isActive.value = false;
        }
      }));
      return () => {
        var _slots$default, _slots$close;
        const hasPrepend = !!(slots.prepend || icon.value);
        const hasTitle = !!(slots.title || props.title);
        const hasText = !!(props.text || slots.text);
        const hasClose = !!(slots.close || props.closable);
        return isActive.value && createVNode(props.tag, {
          "class": ["v-alert", props.border && {
            "v-alert--border": !!props.border,
            [`v-alert--border-${props.border === true ? "start" : props.border}`]: true
          }, {
            "v-alert--prominent": props.prominent
          }, themeClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, variantClasses.value],
          "style": [colorStyles.value, dimensionStyles.value, locationStyles.value],
          "role": "alert"
        }, {
          default: () => [genOverlays(false, "v-alert"), props.border && createVNode("div", {
            "key": "border",
            "class": ["v-alert__border", textColorClasses.value],
            "style": textColorStyles.value
          }, null), hasPrepend && createVNode(VDefaultsProvider, {
            "key": "prepend",
            "defaults": {
              VIcon: {
                density: props.density,
                icon: icon.value,
                size: props.prominent ? 44 : 28
              }
            }
          }, {
            default: () => [createVNode("div", {
              "class": "v-alert__prepend"
            }, [slots.prepend ? slots.prepend() : icon.value && createVNode(VIcon, null, null)])]
          }), createVNode("div", {
            "class": "v-alert__content"
          }, [hasTitle && createVNode(VAlertTitle, {
            "key": "title"
          }, {
            default: () => [slots.title ? slots.title() : props.title]
          }), hasText && (slots.text ? slots.text() : props.text), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]), slots.append && createVNode("div", {
            "key": "append",
            "class": "v-alert__append"
          }, [slots.append()]), hasClose && createVNode(VDefaultsProvider, {
            "key": "close",
            "defaults": {
              VBtn: {
                icon: props.closeIcon,
                size: "x-small",
                variant: "text"
              }
            }
          }, {
            default: () => [createVNode("div", {
              "class": "v-alert__close"
            }, [((_slots$close = slots.close) == null ? void 0 : _slots$close.call(slots, {
              props: closeProps.value
            })) ?? createVNode(VBtn, closeProps.value, null)])]
          })]
        });
      };
    }
  });

  // node_modules/vuetify/lib/components/VMessages/VMessages.mjs
  var VMessages = defineComponent2({
    name: "VMessages",
    props: {
      active: Boolean,
      color: String,
      messages: {
        type: [Array, String],
        default: () => []
      },
      ...makeTransitionProps({
        transition: {
          component: VSlideYTransition,
          leaveAbsolute: true,
          group: true
        }
      })
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const messages = computed2(() => wrapInArray(props.messages));
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(computed2(() => props.color));
      useRender(() => createVNode(MaybeTransition, {
        "transition": props.transition,
        "tag": "div",
        "class": ["v-messages", textColorClasses.value],
        "style": textColorStyles.value
      }, {
        default: () => [props.active && messages.value.map((message, i) => createVNode("div", {
          "class": "v-messages__message",
          "key": `${i}-${messages.value}`
        }, [slots.message ? slots.message({
          message
        }) : message]))]
      }));
      return {};
    }
  });

  // node_modules/vuetify/lib/composables/form.mjs
  var FormKey = Symbol.for("vuetify:form");
  var makeFormProps = propsFactory({
    disabled: Boolean,
    fastFail: Boolean,
    lazyValidation: Boolean,
    readonly: Boolean,
    modelValue: {
      type: Boolean,
      default: null
    }
  });
  function createForm(props) {
    const model = useProxiedModel(props, "modelValue");
    const isDisabled = computed2(() => props.disabled);
    const isReadonly2 = computed2(() => props.readonly);
    const isValidating = ref(false);
    const items = ref([]);
    const errors = ref([]);
    async function validate() {
      const results = [];
      let valid = true;
      errors.value = [];
      isValidating.value = true;
      for (const item of items.value) {
        const itemErrorMessages = await item.validate();
        if (itemErrorMessages.length > 0) {
          valid = false;
          results.push({
            id: item.id,
            errorMessages: itemErrorMessages
          });
        }
        if (!valid && props.fastFail)
          break;
      }
      errors.value = results;
      isValidating.value = false;
      return {
        valid,
        errors: errors.value
      };
    }
    function reset2() {
      items.value.forEach((item) => item.reset());
      model.value = null;
    }
    function resetValidation() {
      items.value.forEach((item) => item.resetValidation());
      errors.value = [];
      model.value = null;
    }
    watch(items, () => {
      let valid = 0;
      let invalid = 0;
      const results = [];
      for (const item of items.value) {
        if (item.isValid === false) {
          invalid++;
          results.push({
            id: item.id,
            errorMessages: item.errorMessages
          });
        } else if (item.isValid === true)
          valid++;
      }
      errors.value = results;
      model.value = invalid > 0 ? false : valid === items.value.length ? true : null;
    }, {
      deep: true
    });
    provide(FormKey, {
      register: (_ref) => {
        let {
          id,
          validate: validate2,
          reset: reset3,
          resetValidation: resetValidation2
        } = _ref;
        if (items.value.some((item) => item.id === id)) {
          consoleWarn(`Duplicate input name "${id}"`);
        }
        items.value.push({
          id,
          validate: validate2,
          reset: reset3,
          resetValidation: resetValidation2,
          isValid: null,
          errorMessages: []
        });
      },
      unregister: (id) => {
        items.value = items.value.filter((item) => {
          return item.id !== id;
        });
      },
      update: (id, isValid, errorMessages) => {
        const found = items.value.find((item) => item.id === id);
        if (!found)
          return;
        found.isValid = isValid;
        found.errorMessages = errorMessages;
      },
      isDisabled,
      isReadonly: isReadonly2,
      isValidating,
      items
    });
    return {
      errors,
      isDisabled,
      isReadonly: isReadonly2,
      isValidating,
      items,
      validate,
      reset: reset2,
      resetValidation
    };
  }
  function useForm() {
    return inject(FormKey, null);
  }

  // node_modules/vuetify/lib/composables/validation.mjs
  var makeValidationProps = propsFactory({
    disabled: Boolean,
    error: Boolean,
    errorMessages: {
      type: [Array, String],
      default: () => []
    },
    maxErrors: {
      type: [Number, String],
      default: 1
    },
    name: String,
    label: String,
    readonly: Boolean,
    rules: {
      type: Array,
      default: () => []
    },
    modelValue: null,
    validationValue: null
  });
  function useValidation(props) {
    let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
    let id = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : getUid();
    const model = useProxiedModel(props, "modelValue");
    const validationModel = computed2(() => props.validationValue === void 0 ? model.value : props.validationValue);
    const form = useForm();
    const internalErrorMessages = ref([]);
    const isPristine = ref(true);
    const isDirty = computed2(() => !!(wrapInArray(model.value === "" ? null : model.value).length || wrapInArray(validationModel.value === "" ? null : validationModel.value).length));
    const isDisabled = computed2(() => !!(props.disabled || form != null && form.isDisabled.value));
    const isReadonly2 = computed2(() => !!(props.readonly || form != null && form.isReadonly.value));
    const errorMessages = computed2(() => {
      return props.errorMessages.length ? wrapInArray(props.errorMessages) : internalErrorMessages.value;
    });
    const isValid = computed2(() => {
      if (props.error || errorMessages.value.length)
        return false;
      if (!props.rules.length)
        return true;
      return isPristine.value ? null : true;
    });
    const isValidating = ref(false);
    const validationClasses = computed2(() => {
      return {
        [`${name}--error`]: isValid.value === false,
        [`${name}--dirty`]: isDirty.value,
        [`${name}--disabled`]: isDisabled.value,
        [`${name}--readonly`]: isReadonly2.value
      };
    });
    const uid2 = computed2(() => props.name ?? unref(id));
    onBeforeMount(() => {
      form == null ? void 0 : form.register({
        id: uid2.value,
        validate,
        reset: reset2,
        resetValidation
      });
    });
    onBeforeUnmount(() => {
      form == null ? void 0 : form.unregister(uid2.value);
    });
    onMounted(() => form == null ? void 0 : form.update(uid2.value, isValid.value, errorMessages.value));
    watch(validationModel, () => {
      if (validationModel.value != null)
        validate();
    });
    watch(isValid, () => {
      form == null ? void 0 : form.update(uid2.value, isValid.value, errorMessages.value);
    });
    function reset2() {
      resetValidation();
      model.value = null;
    }
    function resetValidation() {
      isPristine.value = true;
      internalErrorMessages.value = [];
    }
    async function validate() {
      const results = [];
      isValidating.value = true;
      for (const rule of props.rules) {
        if (results.length >= (props.maxErrors || 1)) {
          break;
        }
        const handler = typeof rule === "function" ? rule : () => rule;
        const result = await handler(validationModel.value);
        if (result === true)
          continue;
        if (typeof result !== "string") {
          console.warn(`${result} is not a valid value. Rule functions must return boolean true or a string.`);
          continue;
        }
        results.push(result);
      }
      internalErrorMessages.value = results;
      isValidating.value = false;
      isPristine.value = false;
      return internalErrorMessages.value;
    }
    return {
      errorMessages,
      isDirty,
      isDisabled,
      isReadonly: isReadonly2,
      isPristine,
      isValid,
      isValidating,
      reset: reset2,
      resetValidation,
      validate,
      validationClasses
    };
  }

  // node_modules/vuetify/lib/components/VInput/InputIcon.mjs
  function useInputIcon(props) {
    const {
      t
    } = useLocale();
    function InputIcon(_ref) {
      let {
        name
      } = _ref;
      const localeKey = {
        prepend: "prependAction",
        prependInner: "prependAction",
        append: "appendAction",
        appendInner: "appendAction",
        clear: "clear"
      }[name];
      const listener = props[`onClick:${name}`];
      const label = listener && localeKey ? t(`$vuetify.input.${localeKey}`, props.label ?? "") : void 0;
      return createVNode(VIcon, {
        "icon": props[`${name}Icon`],
        "aria-label": label,
        "onClick": listener
      }, null);
    }
    return {
      InputIcon
    };
  }

  // node_modules/vuetify/lib/components/VInput/VInput.mjs
  var makeVInputProps = propsFactory({
    id: String,
    appendIcon: IconValue,
    prependIcon: IconValue,
    hideDetails: [Boolean, String],
    messages: {
      type: [Array, String],
      default: () => []
    },
    direction: {
      type: String,
      default: "horizontal",
      validator: (v) => ["horizontal", "vertical"].includes(v)
    },
    "onClick:prepend": EventProp,
    "onClick:append": EventProp,
    ...makeDensityProps(),
    ...makeValidationProps()
  });
  var VInput = genericComponent()({
    name: "VInput",
    props: {
      ...makeVInputProps()
    },
    emits: {
      "update:modelValue": (val) => true
    },
    setup(props, _ref) {
      let {
        attrs,
        slots,
        emit: emit2
      } = _ref;
      const {
        densityClasses
      } = useDensity(props);
      const {
        InputIcon
      } = useInputIcon(props);
      const uid2 = getUid();
      const id = computed2(() => props.id || `input-${uid2}`);
      const {
        errorMessages,
        isDirty,
        isDisabled,
        isReadonly: isReadonly2,
        isPristine,
        isValid,
        isValidating,
        reset: reset2,
        resetValidation,
        validate,
        validationClasses
      } = useValidation(props, "v-input", id);
      const slotProps = computed2(() => ({
        id,
        isDirty,
        isDisabled,
        isReadonly: isReadonly2,
        isPristine,
        isValid,
        isValidating,
        reset: reset2,
        resetValidation,
        validate
      }));
      useRender(() => {
        var _props$messages, _slots$prepend, _slots$default, _slots$append, _slots$details;
        const hasPrepend = !!(slots.prepend || props.prependIcon);
        const hasAppend = !!(slots.append || props.appendIcon);
        const hasMessages = !!((_props$messages = props.messages) != null && _props$messages.length || errorMessages.value.length);
        const hasDetails = !props.hideDetails || props.hideDetails === "auto" && (hasMessages || !!slots.details);
        return createVNode("div", {
          "class": ["v-input", `v-input--${props.direction}`, densityClasses.value, validationClasses.value]
        }, [hasPrepend && createVNode("div", {
          "key": "prepend",
          "class": "v-input__prepend"
        }, [(_slots$prepend = slots.prepend) == null ? void 0 : _slots$prepend.call(slots, slotProps.value), props.prependIcon && createVNode(InputIcon, {
          "key": "prepend-icon",
          "name": "prepend"
        }, null)]), slots.default && createVNode("div", {
          "class": "v-input__control"
        }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, slotProps.value)]), hasAppend && createVNode("div", {
          "key": "append",
          "class": "v-input__append"
        }, [props.appendIcon && createVNode(InputIcon, {
          "key": "append-icon",
          "name": "append"
        }, null), (_slots$append = slots.append) == null ? void 0 : _slots$append.call(slots, slotProps.value)]), hasDetails && createVNode("div", {
          "class": "v-input__details"
        }, [createVNode(VMessages, {
          "active": hasMessages,
          "messages": errorMessages.value.length > 0 ? errorMessages.value : props.messages
        }, {
          message: slots.message
        }), (_slots$details = slots.details) == null ? void 0 : _slots$details.call(slots, slotProps.value)])]);
      });
      return {
        reset: reset2,
        resetValidation,
        validate
      };
    }
  });
  function filterInputProps(props) {
    const keys2 = Object.keys(VInput.props).filter((k) => !isOn2(k));
    return pick(props, keys2);
  }

  // node_modules/vuetify/lib/components/VLabel/VLabel.mjs
  var VLabel = defineComponent2({
    name: "VLabel",
    props: {
      text: String,
      clickable: Boolean,
      ...makeThemeProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      useRender(() => {
        var _slots$default;
        return createVNode("label", {
          "class": ["v-label", {
            "v-label--clickable": props.clickable
          }]
        }, [props.text, (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]);
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VSelectionControlGroup/VSelectionControlGroup.mjs
  var VSelectionControlGroupSymbol = Symbol.for("vuetify:selection-control-group");
  var VSelectionControlGroup = defineComponent2({
    name: "VSelectionControlGroup",
    props: {
      disabled: Boolean,
      id: String,
      inline: Boolean,
      name: String,
      falseIcon: IconValue,
      trueIcon: IconValue,
      multiple: {
        type: Boolean,
        default: null
      },
      readonly: Boolean,
      type: String,
      modelValue: null
    },
    emits: {
      "update:modelValue": (val) => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const modelValue = useProxiedModel(props, "modelValue");
      const uid2 = getUid();
      const id = computed2(() => props.id || `v-selection-control-group-${uid2}`);
      const name = computed2(() => props.name || id.value);
      provide(VSelectionControlGroupSymbol, {
        disabled: toRef(props, "disabled"),
        inline: toRef(props, "inline"),
        modelValue,
        multiple: computed2(() => !!props.multiple || props.multiple == null && Array.isArray(modelValue.value)),
        name,
        falseIcon: toRef(props, "falseIcon"),
        trueIcon: toRef(props, "trueIcon"),
        readonly: toRef(props, "readonly"),
        type: toRef(props, "type")
      });
      useRender(() => {
        var _slots$default;
        return createVNode("div", {
          "class": ["v-selection-control-group", {
            "v-selection-control-group--inline": props.inline
          }],
          "aria-labelled-by": props.type === "radio" ? id.value : void 0,
          "role": props.type === "radio" ? "radiogroup" : void 0
        }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]);
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VSelectionControl/VSelectionControl.mjs
  var makeSelectionControlProps = propsFactory({
    color: String,
    disabled: Boolean,
    error: Boolean,
    id: String,
    inline: Boolean,
    label: String,
    falseIcon: IconValue,
    trueIcon: IconValue,
    ripple: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: null
    },
    name: String,
    readonly: Boolean,
    trueValue: null,
    falseValue: null,
    modelValue: null,
    type: String,
    value: null,
    valueComparator: {
      type: Function,
      default: deepEqual
    },
    ...makeThemeProps(),
    ...makeDensityProps()
  });
  function useSelectionControl(props) {
    const group = inject(VSelectionControlGroupSymbol, void 0);
    const {
      densityClasses
    } = useDensity(props);
    const modelValue = useProxiedModel(props, "modelValue");
    const trueValue = computed2(() => props.trueValue !== void 0 ? props.trueValue : props.value !== void 0 ? props.value : true);
    const falseValue = computed2(() => props.falseValue !== void 0 ? props.falseValue : false);
    const isMultiple = computed2(() => (group == null ? void 0 : group.multiple.value) || !!props.multiple || props.multiple == null && Array.isArray(modelValue.value));
    const model = computed2({
      get() {
        const val = group ? group.modelValue.value : modelValue.value;
        return isMultiple.value ? val.some((v) => props.valueComparator(v, trueValue.value)) : props.valueComparator(val, trueValue.value);
      },
      set(val) {
        if (props.readonly)
          return;
        const currentValue = val ? trueValue.value : falseValue.value;
        let newVal = currentValue;
        if (isMultiple.value) {
          newVal = val ? [...wrapInArray(modelValue.value), currentValue] : wrapInArray(modelValue.value).filter((item) => !props.valueComparator(item, trueValue.value));
        }
        if (group) {
          group.modelValue.value = newVal;
        } else {
          modelValue.value = newVal;
        }
      }
    });
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(computed2(() => {
      return model.value && !props.error && !props.disabled ? props.color : void 0;
    }));
    const icon = computed2(() => {
      return model.value ? (group == null ? void 0 : group.trueIcon.value) ?? props.trueIcon : (group == null ? void 0 : group.falseIcon.value) ?? props.falseIcon;
    });
    return {
      group,
      densityClasses,
      trueValue,
      falseValue,
      model,
      textColorClasses,
      textColorStyles,
      icon
    };
  }
  var VSelectionControl = genericComponent()({
    name: "VSelectionControl",
    directives: {
      Ripple
    },
    inheritAttrs: false,
    props: makeSelectionControlProps(),
    emits: {
      "update:modelValue": (val) => true
    },
    setup(props, _ref) {
      let {
        attrs,
        slots
      } = _ref;
      const {
        densityClasses,
        group,
        icon,
        model,
        textColorClasses,
        textColorStyles,
        trueValue
      } = useSelectionControl(props);
      const uid2 = getUid();
      const id = computed2(() => props.id || `input-${uid2}`);
      const isFocused = ref(false);
      const isFocusVisible = ref(false);
      const input = ref();
      function onFocus(e) {
        isFocused.value = true;
        if (!SUPPORTS_FOCUS_VISIBLE || SUPPORTS_FOCUS_VISIBLE && e.target.matches(":focus-visible")) {
          isFocusVisible.value = true;
        }
      }
      function onBlur() {
        isFocused.value = false;
        isFocusVisible.value = false;
      }
      function onInput(e) {
        model.value = e.target.checked;
      }
      useRender(() => {
        var _slots$default, _slots$input;
        const label = slots.label ? slots.label({
          label: props.label,
          props: {
            for: id.value
          }
        }) : props.label;
        const type = (group == null ? void 0 : group.type.value) ?? props.type;
        const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
        return createVNode("div", mergeProps({
          "class": ["v-selection-control", {
            "v-selection-control--dirty": model.value,
            "v-selection-control--disabled": props.disabled,
            "v-selection-control--error": props.error,
            "v-selection-control--focused": isFocused.value,
            "v-selection-control--focus-visible": isFocusVisible.value,
            "v-selection-control--inline": (group == null ? void 0 : group.inline.value) || props.inline
          }, densityClasses.value]
        }, rootAttrs), [createVNode("div", {
          "class": ["v-selection-control__wrapper", textColorClasses.value],
          "style": textColorStyles.value
        }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots), withDirectives(createVNode("div", {
          "class": ["v-selection-control__input"]
        }, [icon.value && createVNode(VIcon, {
          "key": "icon",
          "icon": icon.value
        }, null), createVNode("input", mergeProps({
          "ref": input,
          "checked": model.value,
          "disabled": props.disabled,
          "id": id.value,
          "onBlur": onBlur,
          "onFocus": onFocus,
          "onInput": onInput,
          "aria-readonly": props.readonly,
          "type": type,
          "value": trueValue.value,
          "name": (group == null ? void 0 : group.name.value) ?? props.name,
          "aria-checked": type === "checkbox" ? model.value : void 0
        }, inputAttrs), null), (_slots$input = slots.input) == null ? void 0 : _slots$input.call(slots, {
          model,
          textColorClasses,
          props: {
            onFocus,
            onBlur,
            id: id.value
          }
        })]), [[resolveDirective("ripple"), props.ripple && [!props.disabled && !props.readonly, null, ["center", "circle"]]]])]), label && createVNode(VLabel, {
          "for": id.value,
          "clickable": true
        }, {
          default: () => [label]
        })]);
      });
      return {
        isFocused,
        input
      };
    }
  });
  function filterControlProps(props) {
    return pick(props, Object.keys(VSelectionControl.props));
  }

  // node_modules/vuetify/lib/components/VCheckbox/VCheckboxBtn.mjs
  var makeVCheckboxBtnProps = propsFactory({
    indeterminate: Boolean,
    indeterminateIcon: {
      type: IconValue,
      default: "$checkboxIndeterminate"
    },
    ...makeSelectionControlProps({
      falseIcon: "$checkboxOff",
      trueIcon: "$checkboxOn"
    })
  });
  var VCheckboxBtn = defineComponent2({
    name: "VCheckboxBtn",
    props: makeVCheckboxBtnProps(),
    emits: {
      "update:modelValue": (value) => true,
      "update:indeterminate": (val) => true
    },
    setup(props, _ref) {
      let {
        slots,
        emit: emit2
      } = _ref;
      const indeterminate = useProxiedModel(props, "indeterminate");
      function onChange(v) {
        if (indeterminate.value) {
          indeterminate.value = false;
        }
        emit2("update:modelValue", v);
      }
      const falseIcon = computed2(() => {
        return props.indeterminate ? props.indeterminateIcon : props.falseIcon;
      });
      const trueIcon = computed2(() => {
        return props.indeterminate ? props.indeterminateIcon : props.trueIcon;
      });
      useRender(() => createVNode(VSelectionControl, mergeProps(props, {
        "class": "v-checkbox-btn",
        "type": "checkbox",
        "inline": true,
        "onUpdate:modelValue": onChange,
        "falseIcon": falseIcon.value,
        "trueIcon": trueIcon.value,
        "aria-checked": props.indeterminate ? "mixed" : void 0
      }), slots));
      return {};
    }
  });
  function filterCheckboxBtnProps(props) {
    return pick(props, Object.keys(VCheckboxBtn.props));
  }

  // node_modules/vuetify/lib/components/VCheckbox/VCheckbox.mjs
  var VCheckbox = defineComponent2({
    name: "VCheckbox",
    inheritAttrs: false,
    props: {
      ...makeVInputProps(),
      ...makeVCheckboxBtnProps()
    },
    setup(props, _ref) {
      let {
        attrs,
        slots
      } = _ref;
      const uid2 = getUid();
      const id = computed2(() => props.id || `checkbox-${uid2}`);
      useRender(() => {
        const [inputAttrs, controlAttrs] = filterInputAttrs(attrs);
        const [inputProps, _1] = filterInputProps(props);
        const [checkboxProps, _2] = filterCheckboxBtnProps(props);
        return createVNode(VInput, mergeProps({
          "class": "v-checkbox"
        }, inputAttrs, inputProps, {
          "id": id.value
        }), {
          ...slots,
          default: (_ref2) => {
            let {
              id: id2,
              isDisabled,
              isReadonly: isReadonly2
            } = _ref2;
            return createVNode(VCheckboxBtn, mergeProps(checkboxProps, {
              "id": id2.value,
              "disabled": isDisabled.value,
              "readonly": isReadonly2.value
            }, controlAttrs), slots);
          }
        });
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VAvatar/VAvatar.mjs
  var makeVAvatarProps = propsFactory({
    start: Boolean,
    end: Boolean,
    icon: IconValue,
    image: String,
    ...makeDensityProps(),
    ...makeRoundedProps(),
    ...makeSizeProps(),
    ...makeTagProps(),
    ...makeVariantProps({
      variant: "flat"
    })
  });
  var VAvatar = defineComponent2({
    name: "VAvatar",
    props: makeVAvatarProps(),
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        colorClasses,
        colorStyles,
        variantClasses
      } = useVariant(props);
      const {
        densityClasses
      } = useDensity(props);
      const {
        roundedClasses
      } = useRounded(props);
      const {
        sizeClasses,
        sizeStyles
      } = useSize(props);
      useRender(() => {
        var _slots$default;
        return createVNode(props.tag, {
          "class": ["v-avatar", {
            "v-avatar--start": props.start,
            "v-avatar--end": props.end
          }, colorClasses.value, densityClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value],
          "style": [colorStyles.value, sizeStyles.value]
        }, {
          default: () => [props.image ? createVNode(VImg, {
            "key": "image",
            "src": props.image,
            "alt": ""
          }, null) : props.icon ? createVNode(VIcon, {
            "key": "icon",
            "icon": props.icon
          }, null) : (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots), genOverlays(false, "v-avatar")]
        });
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VChipGroup/VChipGroup.mjs
  var VChipGroupSymbol = Symbol.for("vuetify:v-chip-group");
  var VChipGroup = defineComponent2({
    name: "VChipGroup",
    props: {
      column: Boolean,
      filter: Boolean,
      valueComparator: {
        type: Function,
        default: deepEqual
      },
      ...makeGroupProps({
        selectedClass: "v-chip--selected"
      }),
      ...makeTagProps(),
      ...makeThemeProps(),
      ...makeVariantProps({
        variant: "tonal"
      })
    },
    emits: {
      "update:modelValue": (value) => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        themeClasses
      } = provideTheme(props);
      const {
        isSelected,
        select,
        next,
        prev,
        selected
      } = useGroup(props, VChipGroupSymbol);
      provideDefaults({
        VChip: {
          color: toRef(props, "color"),
          filter: toRef(props, "filter"),
          variant: toRef(props, "variant")
        }
      });
      useRender(() => {
        var _slots$default;
        return createVNode(props.tag, {
          "class": ["v-chip-group", {
            "v-chip-group--column": props.column
          }, themeClasses.value]
        }, {
          default: () => [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
            isSelected,
            select,
            next,
            prev,
            selected: selected.value
          })]
        });
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VChip/VChip.mjs
  var VChip = defineComponent2({
    name: "VChip",
    directives: {
      Ripple
    },
    props: {
      activeClass: String,
      appendAvatar: String,
      appendIcon: IconValue,
      closable: Boolean,
      closeIcon: {
        type: IconValue,
        default: "$delete"
      },
      closeLabel: {
        type: String,
        default: "$vuetify.close"
      },
      draggable: Boolean,
      filter: Boolean,
      filterIcon: {
        type: String,
        default: "$complete"
      },
      label: Boolean,
      link: Boolean,
      pill: Boolean,
      prependAvatar: String,
      prependIcon: IconValue,
      ripple: {
        type: Boolean,
        default: true
      },
      text: String,
      modelValue: {
        type: Boolean,
        default: true
      },
      ...makeBorderProps(),
      ...makeDensityProps(),
      ...makeElevationProps(),
      ...makeGroupItemProps(),
      ...makeRoundedProps(),
      ...makeRouterProps(),
      ...makeSizeProps(),
      ...makeTagProps({
        tag: "span"
      }),
      ...makeThemeProps(),
      ...makeVariantProps({
        variant: "tonal"
      })
    },
    emits: {
      "click:close": (e) => true,
      "update:active": (value) => true,
      "update:modelValue": (value) => true,
      "group:selected": (val) => true
    },
    setup(props, _ref) {
      let {
        attrs,
        emit: emit2,
        slots
      } = _ref;
      const {
        borderClasses
      } = useBorder(props);
      const {
        colorClasses,
        colorStyles,
        variantClasses
      } = useVariant(props);
      const {
        densityClasses
      } = useDensity(props);
      const {
        elevationClasses
      } = useElevation(props);
      const {
        roundedClasses
      } = useRounded(props);
      const {
        sizeClasses
      } = useSize(props);
      const {
        themeClasses
      } = provideTheme(props);
      const isActive = useProxiedModel(props, "modelValue");
      const group = useGroupItem(props, VChipGroupSymbol, false);
      const link = useLink(props, attrs);
      function onCloseClick(e) {
        isActive.value = false;
        emit2("click:close", e);
      }
      return () => {
        var _slots$default;
        const Tag = link.isLink.value ? "a" : props.tag;
        const hasAppend = !!(slots.append || props.appendIcon || props.appendAvatar);
        const hasClose = !!(slots.close || props.closable);
        const hasFilter = !!(slots.filter || props.filter) && group;
        const hasPrepend = !!(slots.prepend || props.prependIcon || props.prependAvatar);
        const hasColor = !group || group.isSelected.value;
        const isClickable = !props.disabled && (!!group || link.isClickable.value || props.link);
        const onClickFunc = props.link ? props.link : group == null ? void 0 : group.toggle;
        return isActive.value && withDirectives(createVNode(Tag, {
          "class": ["v-chip", {
            "v-chip--disabled": props.disabled,
            "v-chip--label": props.label,
            "v-chip--link": isClickable,
            "v-chip--filter": hasFilter,
            "v-chip--pill": props.pill
          }, themeClasses.value, borderClasses.value, hasColor ? colorClasses.value : void 0, densityClasses.value, elevationClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value, group == null ? void 0 : group.selectedClass.value],
          "style": [hasColor ? colorStyles.value : void 0],
          "disabled": props.disabled || void 0,
          "draggable": props.draggable,
          "href": link.href.value,
          "onClick": isClickable && onClickFunc
        }, {
          default: () => [genOverlays(isClickable, "v-chip"), hasFilter && createVNode(VDefaultsProvider, {
            "key": "filter",
            "defaults": {
              VIcon: {
                icon: props.filterIcon
              }
            }
          }, {
            default: () => [createVNode(VExpandXTransition, null, {
              default: () => [withDirectives(createVNode("div", {
                "class": "v-chip__filter"
              }, [slots.filter ? slots.filter() : createVNode(VIcon, null, null)]), [[vShow, group.isSelected.value]])]
            })]
          }), hasPrepend && createVNode(VDefaultsProvider, {
            "key": "prepend",
            "defaults": {
              VAvatar: {
                image: props.prependAvatar
              },
              VIcon: {
                icon: props.prependIcon
              }
            }
          }, {
            default: () => [slots.prepend ? createVNode("div", {
              "class": "v-chip__prepend"
            }, [slots.prepend()]) : props.prependAvatar ? createVNode(VAvatar, {
              "start": true
            }, null) : props.prependIcon ? createVNode(VIcon, {
              "start": true
            }, null) : void 0]
          }), ((_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
            isSelected: group == null ? void 0 : group.isSelected.value,
            selectedClass: group == null ? void 0 : group.selectedClass.value,
            select: group == null ? void 0 : group.select,
            toggle: group == null ? void 0 : group.toggle,
            value: group == null ? void 0 : group.value.value,
            disabled: props.disabled
          })) ?? props.text, hasAppend && createVNode(VDefaultsProvider, {
            "key": "append",
            "defaults": {
              VAvatar: {
                image: props.appendAvatar
              },
              VIcon: {
                icon: props.appendIcon
              }
            }
          }, {
            default: () => [slots.append ? createVNode("div", {
              "class": "v-chip__append"
            }, [slots.append()]) : props.appendAvatar ? createVNode(VAvatar, {
              "end": true
            }, null) : props.appendIcon ? createVNode(VIcon, {
              "end": true
            }, null) : void 0]
          }), hasClose && createVNode(VDefaultsProvider, {
            "key": "close",
            "defaults": {
              VIcon: {
                icon: props.closeIcon,
                size: "x-small"
              }
            }
          }, {
            default: () => [createVNode("div", {
              "class": "v-chip__close",
              "onClick": onCloseClick
            }, [slots.close ? slots.close() : createVNode(VIcon, null, null)])]
          })]
        }), [[resolveDirective("ripple"), isClickable && props.ripple, null]]);
      };
    }
  });

  // node_modules/vuetify/lib/components/VDivider/VDivider.mjs
  var VDivider = defineComponent2({
    name: "VDivider",
    props: {
      color: String,
      inset: Boolean,
      length: [Number, String],
      thickness: [Number, String],
      vertical: Boolean,
      ...makeThemeProps()
    },
    setup(props, _ref) {
      let {
        attrs
      } = _ref;
      const {
        themeClasses
      } = provideTheme(props);
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(toRef(props, "color"));
      const dividerStyles = computed2(() => {
        const styles = {};
        if (props.length) {
          styles[props.vertical ? "maxHeight" : "maxWidth"] = convertToUnit(props.length);
        }
        if (props.thickness) {
          styles[props.vertical ? "borderRightWidth" : "borderTopWidth"] = convertToUnit(props.thickness);
        }
        return styles;
      });
      useRender(() => createVNode("hr", {
        "class": [{
          "v-divider": true,
          "v-divider--inset": props.inset,
          "v-divider--vertical": props.vertical
        }, themeClasses.value, backgroundColorClasses.value],
        "style": [dividerStyles.value, backgroundColorStyles.value],
        "aria-orientation": !attrs.role || attrs.role === "separator" ? props.vertical ? "vertical" : "horizontal" : void 0,
        "role": `${attrs.role || "separator"}`
      }, null));
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VList/list.mjs
  var DepthKey = Symbol.for("vuetify:depth");
  var ListKey = Symbol.for("vuetify:list");
  function createList() {
    const parent = inject(ListKey, {
      hasPrepend: ref(false),
      updateHasPrepend: () => null
    });
    const data = {
      hasPrepend: ref(false),
      updateHasPrepend: (value) => {
        if (value)
          data.hasPrepend.value = value;
      }
    };
    provide(ListKey, data);
    return parent;
  }
  function useList() {
    return inject(ListKey, null);
  }

  // node_modules/vuetify/lib/composables/nested/openStrategies.mjs
  var singleOpenStrategy = {
    open: (_ref) => {
      let {
        id,
        value,
        opened,
        parents
      } = _ref;
      if (value) {
        const newOpened = /* @__PURE__ */ new Set();
        newOpened.add(id);
        let parent = parents.get(id);
        while (parent != null) {
          newOpened.add(parent);
          parent = parents.get(parent);
        }
        return newOpened;
      } else {
        opened.delete(id);
        return opened;
      }
    },
    select: () => null
  };
  var multipleOpenStrategy = {
    open: (_ref2) => {
      let {
        id,
        value,
        opened,
        parents
      } = _ref2;
      if (value) {
        let parent = parents.get(id);
        opened.add(id);
        while (parent != null && parent !== id) {
          opened.add(parent);
          parent = parents.get(parent);
        }
        return opened;
      } else {
        opened.delete(id);
      }
      return opened;
    },
    select: () => null
  };
  var listOpenStrategy = {
    open: multipleOpenStrategy.open,
    select: (_ref3) => {
      let {
        id,
        value,
        opened,
        parents
      } = _ref3;
      if (!value)
        return opened;
      const path = [];
      let parent = parents.get(id);
      while (parent != null) {
        path.push(parent);
        parent = parents.get(parent);
      }
      return new Set(path);
    }
  };

  // node_modules/vuetify/lib/composables/nested/selectStrategies.mjs
  var independentSelectStrategy = (mandatory) => {
    const strategy = {
      select: (_ref) => {
        let {
          id,
          value,
          selected
        } = _ref;
        if (mandatory && !value) {
          const on = Array.from(selected.entries()).reduce((arr, _ref2) => {
            let [key, value2] = _ref2;
            return value2 === "on" ? [...arr, key] : arr;
          }, []);
          if (on.length === 1 && on[0] === id)
            return selected;
        }
        selected.set(id, value ? "on" : "off");
        return selected;
      },
      in: (v, children, parents) => {
        let map2 = /* @__PURE__ */ new Map();
        for (const id of v || []) {
          map2 = strategy.select({
            id,
            value: true,
            selected: new Map(map2),
            children,
            parents
          });
        }
        return map2;
      },
      out: (v) => {
        const arr = [];
        for (const [key, value] of v.entries()) {
          if (value === "on")
            arr.push(key);
        }
        return arr;
      }
    };
    return strategy;
  };
  var independentSingleSelectStrategy = (mandatory) => {
    const parentStrategy = independentSelectStrategy(mandatory);
    const strategy = {
      select: (_ref3) => {
        let {
          selected,
          id,
          ...rest
        } = _ref3;
        const singleSelected = selected.has(id) ? /* @__PURE__ */ new Map([[id, selected.get(id)]]) : /* @__PURE__ */ new Map();
        return parentStrategy.select({
          ...rest,
          id,
          selected: singleSelected
        });
      },
      in: (v, children, parents) => {
        let map2 = /* @__PURE__ */ new Map();
        if (v != null && v.length) {
          map2 = parentStrategy.in(v.slice(0, 1), children, parents);
        }
        return map2;
      },
      out: (v, children, parents) => {
        return parentStrategy.out(v, children, parents);
      }
    };
    return strategy;
  };
  var leafSelectStrategy = (mandatory) => {
    const parentStrategy = independentSelectStrategy(mandatory);
    const strategy = {
      select: (_ref4) => {
        let {
          id,
          selected,
          children,
          ...rest
        } = _ref4;
        if (children.has(id))
          return selected;
        return parentStrategy.select({
          id,
          selected,
          children,
          ...rest
        });
      },
      in: parentStrategy.in,
      out: parentStrategy.out
    };
    return strategy;
  };
  var leafSingleSelectStrategy = (mandatory) => {
    const parentStrategy = independentSingleSelectStrategy(mandatory);
    const strategy = {
      select: (_ref5) => {
        let {
          id,
          selected,
          children,
          ...rest
        } = _ref5;
        if (children.has(id))
          return selected;
        return parentStrategy.select({
          id,
          selected,
          children,
          ...rest
        });
      },
      in: parentStrategy.in,
      out: parentStrategy.out
    };
    return strategy;
  };
  var classicSelectStrategy = (mandatory) => {
    const strategy = {
      select: (_ref6) => {
        let {
          id,
          value,
          selected,
          children,
          parents
        } = _ref6;
        const original = new Map(selected);
        const items = [id];
        while (items.length) {
          const item = items.shift();
          selected.set(item, value ? "on" : "off");
          if (children.has(item)) {
            items.push(...children.get(item));
          }
        }
        let parent = parents.get(id);
        while (parent) {
          const childrenIds = children.get(parent);
          const everySelected = childrenIds.every((cid) => selected.get(cid) === "on");
          const noneSelected = childrenIds.every((cid) => !selected.has(cid) || selected.get(cid) === "off");
          selected.set(parent, everySelected ? "on" : noneSelected ? "off" : "indeterminate");
          parent = parents.get(parent);
        }
        if (mandatory && !value) {
          const on = Array.from(selected.entries()).reduce((arr, _ref7) => {
            let [key, value2] = _ref7;
            return value2 === "on" ? [...arr, key] : arr;
          }, []);
          if (on.length === 0)
            return original;
        }
        return selected;
      },
      in: (v, children, parents) => {
        let map2 = /* @__PURE__ */ new Map();
        for (const id of v || []) {
          map2 = strategy.select({
            id,
            value: true,
            selected: new Map(map2),
            children,
            parents
          });
        }
        return map2;
      },
      out: (v, children) => {
        const arr = [];
        for (const [key, value] of v.entries()) {
          if (value === "on" && !children.has(key))
            arr.push(key);
        }
        return arr;
      }
    };
    return strategy;
  };

  // node_modules/vuetify/lib/composables/nested/nested.mjs
  var VNestedSymbol = Symbol.for("vuetify:nested");
  var emptyNested = {
    id: ref(),
    root: {
      register: () => null,
      unregister: () => null,
      parents: ref(/* @__PURE__ */ new Map()),
      children: ref(/* @__PURE__ */ new Map()),
      open: () => null,
      openOnSelect: () => null,
      select: () => null,
      opened: ref(/* @__PURE__ */ new Set()),
      selected: ref(/* @__PURE__ */ new Map()),
      selectedValues: ref([])
    }
  };
  var makeNestedProps = propsFactory({
    selectStrategy: [String, Function],
    openStrategy: [String, Function],
    opened: Array,
    selected: Array,
    mandatory: Boolean
  }, "nested");
  var useNested = (props) => {
    let isUnmounted = false;
    const children = ref(/* @__PURE__ */ new Map());
    const parents = ref(/* @__PURE__ */ new Map());
    const opened = useProxiedModel(props, "opened", props.opened, (v) => new Set(v), (v) => [...v.values()]);
    const selectStrategy = computed2(() => {
      if (typeof props.selectStrategy === "object")
        return props.selectStrategy;
      switch (props.selectStrategy) {
        case "single-leaf":
          return leafSingleSelectStrategy(props.mandatory);
        case "leaf":
          return leafSelectStrategy(props.mandatory);
        case "independent":
          return independentSelectStrategy(props.mandatory);
        case "single-independent":
          return independentSingleSelectStrategy(props.mandatory);
        case "classic":
        default:
          return classicSelectStrategy(props.mandatory);
      }
    });
    const openStrategy = computed2(() => {
      if (typeof props.openStrategy === "function")
        return props.openStrategy;
      switch (props.openStrategy) {
        case "list":
          return listOpenStrategy;
        case "single":
          return singleOpenStrategy;
        case "multiple":
        default:
          return multipleOpenStrategy;
      }
    });
    const selected = useProxiedModel(props, "selected", props.selected, (v) => selectStrategy.value.in(v, children.value, parents.value), (v) => selectStrategy.value.out(v, children.value, parents.value));
    onBeforeUnmount(() => {
      isUnmounted = true;
    });
    function getPath(id) {
      const path = [];
      let parent = id;
      while (parent != null) {
        path.unshift(parent);
        parent = parents.value.get(parent);
      }
      return path;
    }
    const vm = getCurrentInstance2("nested");
    const nested = {
      id: ref(),
      root: {
        opened,
        selected,
        selectedValues: computed2(() => {
          const arr = [];
          for (const [key, value] of selected.value.entries()) {
            if (value === "on")
              arr.push(key);
          }
          return arr;
        }),
        register: (id, parentId, isGroup) => {
          parentId && id !== parentId && parents.value.set(id, parentId);
          isGroup && children.value.set(id, []);
          if (parentId != null) {
            children.value.set(parentId, [...children.value.get(parentId) || [], id]);
          }
        },
        unregister: (id) => {
          if (isUnmounted)
            return;
          children.value.delete(id);
          const parent = parents.value.get(id);
          if (parent) {
            const list = children.value.get(parent) ?? [];
            children.value.set(parent, list.filter((child) => child !== id));
          }
          parents.value.delete(id);
          opened.value.delete(id);
        },
        open: (id, value, event) => {
          vm.emit("click:open", {
            id,
            value,
            path: getPath(id),
            event
          });
          const newOpened = openStrategy.value.open({
            id,
            value,
            opened: new Set(opened.value),
            children: children.value,
            parents: parents.value,
            event
          });
          newOpened && (opened.value = newOpened);
        },
        openOnSelect: (id, value, event) => {
          const newOpened = openStrategy.value.select({
            id,
            value,
            selected: new Map(selected.value),
            opened: new Set(opened.value),
            children: children.value,
            parents: parents.value,
            event
          });
          newOpened && (opened.value = newOpened);
        },
        select: (id, value, event) => {
          vm.emit("click:select", {
            id,
            value,
            path: getPath(id),
            event
          });
          const newSelected = selectStrategy.value.select({
            id,
            value,
            selected: new Map(selected.value),
            children: children.value,
            parents: parents.value,
            event
          });
          newSelected && (selected.value = newSelected);
          nested.root.openOnSelect(id, value, event);
        },
        children,
        parents
      }
    };
    provide(VNestedSymbol, nested);
    return nested.root;
  };
  var useNestedItem = (id, isGroup) => {
    const parent = inject(VNestedSymbol, emptyNested);
    const computedId = computed2(() => id.value ?? getUid().toString());
    const item = {
      ...parent,
      id: computedId,
      open: (open, e) => parent.root.open(computedId.value, open, e),
      openOnSelect: (open, e) => parent.root.openOnSelect(computedId.value, open, e),
      isOpen: computed2(() => parent.root.opened.value.has(computedId.value)),
      parent: computed2(() => parent.root.parents.value.get(computedId.value)),
      select: (selected, e) => parent.root.select(computedId.value, selected, e),
      isSelected: computed2(() => parent.root.selected.value.get(computedId.value) === "on"),
      isIndeterminate: computed2(() => parent.root.selected.value.get(computedId.value) === "indeterminate"),
      isLeaf: computed2(() => !parent.root.children.value.get(computedId.value)),
      isGroupActivator: parent.isGroupActivator
    };
    !parent.isGroupActivator && parent.root.register(computedId.value, parent.id.value, isGroup);
    onBeforeUnmount(() => {
      !parent.isGroupActivator && parent.root.unregister(computedId.value);
    });
    isGroup && provide(VNestedSymbol, item);
    return item;
  };
  var useNestedGroupActivator = () => {
    const parent = inject(VNestedSymbol, emptyNested);
    provide(VNestedSymbol, {
      ...parent,
      isGroupActivator: true
    });
  };

  // node_modules/vuetify/lib/components/VList/VListGroup.mjs
  var VListGroupActivator = defineComponent2({
    name: "VListGroupActivator",
    setup(_, _ref) {
      let {
        slots
      } = _ref;
      useNestedGroupActivator();
      return () => {
        var _slots$default;
        return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots);
      };
    }
  });
  var makeVListGroupProps = propsFactory({
    activeColor: String,
    color: String,
    collapseIcon: {
      type: IconValue,
      default: "$collapse"
    },
    expandIcon: {
      type: IconValue,
      default: "$expand"
    },
    prependIcon: IconValue,
    appendIcon: IconValue,
    fluid: Boolean,
    subgroup: Boolean,
    value: null,
    ...makeTagProps()
  });
  var VListGroup = genericComponent()({
    name: "VListGroup",
    props: {
      title: String,
      ...makeVListGroupProps()
    },
    setup(props, _ref2) {
      let {
        slots
      } = _ref2;
      const {
        isOpen,
        open
      } = useNestedItem(toRef(props, "value"), true);
      const list = useList();
      const onClick = (e) => {
        open(!isOpen.value, e);
      };
      const activatorProps = computed2(() => ({
        onClick,
        class: "v-list-group__header"
      }));
      const toggleIcon = computed2(() => isOpen.value ? props.collapseIcon : props.expandIcon);
      useRender(() => {
        var _slots$default2;
        return createVNode(props.tag, {
          "class": ["v-list-group", {
            "v-list-group--prepend": list == null ? void 0 : list.hasPrepend.value,
            "v-list-group--fluid": props.fluid,
            "v-list-group--subgroup": props.subgroup
          }]
        }, {
          default: () => [slots.activator && createVNode(VDefaultsProvider, {
            "defaults": {
              VListItem: {
                active: isOpen.value,
                activeColor: props.activeColor,
                color: props.color,
                prependIcon: props.prependIcon || props.subgroup && toggleIcon.value,
                appendIcon: props.appendIcon || !props.subgroup && toggleIcon.value,
                title: props.title,
                value: props.value
              }
            }
          }, {
            default: () => [createVNode(VListGroupActivator, null, {
              default: () => [slots.activator({
                props: activatorProps.value,
                isOpen
              })]
            })]
          }), createVNode(VExpandTransition, null, {
            default: () => [withDirectives(createVNode("div", {
              "class": "v-list-group__items"
            }, [(_slots$default2 = slots.default) == null ? void 0 : _slots$default2.call(slots)]), [[vShow, isOpen.value]])]
          })]
        });
      });
      return {};
    }
  });
  function filterListGroupProps(props) {
    return pick(props, Object.keys(VListGroup.props));
  }

  // node_modules/vuetify/lib/components/VList/VListItemSubtitle.mjs
  var VListItemSubtitle = createSimpleFunctional("v-list-item-subtitle");

  // node_modules/vuetify/lib/components/VList/VListItemTitle.mjs
  var VListItemTitle = createSimpleFunctional("v-list-item-title");

  // node_modules/vuetify/lib/components/VList/VListItem.mjs
  var VListItem = genericComponent()({
    name: "VListItem",
    directives: {
      Ripple
    },
    props: {
      active: {
        type: Boolean,
        default: void 0
      },
      activeClass: String,
      activeColor: String,
      appendAvatar: String,
      appendIcon: IconValue,
      disabled: Boolean,
      lines: String,
      link: {
        type: Boolean,
        default: void 0
      },
      nav: Boolean,
      prependAvatar: String,
      prependIcon: IconValue,
      subtitle: [String, Number, Boolean],
      title: [String, Number, Boolean],
      value: null,
      ...makeBorderProps(),
      ...makeDensityProps(),
      ...makeDimensionProps(),
      ...makeElevationProps(),
      ...makeRoundedProps(),
      ...makeRouterProps(),
      ...makeTagProps(),
      ...makeThemeProps(),
      ...makeVariantProps({
        variant: "text"
      })
    },
    setup(props, _ref) {
      let {
        attrs,
        slots
      } = _ref;
      const link = useLink(props, attrs);
      const id = computed2(() => props.value ?? link.href.value);
      const {
        select,
        isSelected,
        isIndeterminate,
        isGroupActivator,
        root,
        parent,
        openOnSelect
      } = useNestedItem(id, false);
      const list = useList();
      const isActive = computed2(() => {
        var _link$isActive;
        return props.active !== false && (props.active || ((_link$isActive = link.isActive) == null ? void 0 : _link$isActive.value) || isSelected.value);
      });
      const isLink = computed2(() => props.link !== false && link.isLink.value);
      const isClickable = computed2(() => !props.disabled && props.link !== false && (props.link || link.isClickable.value || props.value != null && !!list));
      const roundedProps = computed2(() => props.rounded || props.nav);
      const variantProps = computed2(() => ({
        color: isActive.value ? props.activeColor ?? props.color : props.color,
        variant: props.variant
      }));
      watch(() => {
        var _link$isActive2;
        return (_link$isActive2 = link.isActive) == null ? void 0 : _link$isActive2.value;
      }, (val) => {
        if (val && parent.value != null) {
          root.open(parent.value, true);
        }
        if (val) {
          openOnSelect(val);
        }
      }, {
        immediate: true
      });
      const {
        themeClasses
      } = provideTheme(props);
      const {
        borderClasses
      } = useBorder(props);
      const {
        colorClasses,
        colorStyles,
        variantClasses
      } = useVariant(variantProps);
      const {
        densityClasses
      } = useDensity(props);
      const {
        dimensionStyles
      } = useDimension(props);
      const {
        elevationClasses
      } = useElevation(props);
      const {
        roundedClasses
      } = useRounded(roundedProps);
      const lineClasses = computed2(() => props.lines ? `v-list-item--${props.lines}-line` : void 0);
      const slotProps = computed2(() => ({
        isActive: isActive.value,
        select,
        isSelected: isSelected.value,
        isIndeterminate: isIndeterminate.value
      }));
      useRender(() => {
        var _slots$prepend, _slots$title, _slots$subtitle, _slots$default, _slots$append;
        const Tag = isLink.value ? "a" : props.tag;
        const hasColor = !list || isSelected.value || isActive.value;
        const hasTitle = slots.title || props.title;
        const hasSubtitle = slots.subtitle || props.subtitle;
        const hasAppend = !!(slots.append || props.appendAvatar || props.appendIcon);
        const hasPrepend = !!(slots.prepend || props.prependAvatar || props.prependIcon);
        list == null ? void 0 : list.updateHasPrepend(hasPrepend);
        return withDirectives(createVNode(Tag, {
          "class": ["v-list-item", {
            "v-list-item--active": isActive.value,
            "v-list-item--disabled": props.disabled,
            "v-list-item--link": isClickable.value,
            "v-list-item--nav": props.nav,
            "v-list-item--prepend": !hasPrepend && (list == null ? void 0 : list.hasPrepend.value),
            [`${props.activeClass}`]: isActive.value
          }, themeClasses.value, borderClasses.value, hasColor ? colorClasses.value : void 0, densityClasses.value, elevationClasses.value, lineClasses.value, roundedClasses.value, variantClasses.value],
          "style": [hasColor ? colorStyles.value : void 0, dimensionStyles.value],
          "href": link.href.value,
          "tabindex": isClickable.value ? 0 : void 0,
          "onClick": isClickable.value && ((e) => {
            var _link$navigate;
            if (isGroupActivator)
              return;
            (_link$navigate = link.navigate) == null ? void 0 : _link$navigate.call(link, e);
            props.value != null && select(!isSelected.value, e);
          })
        }, {
          default: () => [genOverlays(isClickable.value || isActive.value, "v-list-item"), hasPrepend && createVNode(VDefaultsProvider, {
            "key": "prepend",
            "defaults": {
              VAvatar: {
                density: props.density,
                image: props.prependAvatar
              },
              VIcon: {
                density: props.density,
                icon: props.prependIcon
              },
              VListItemAction: {
                start: true
              }
            }
          }, {
            default: () => [createVNode("div", {
              "class": "v-list-item__prepend"
            }, [props.prependAvatar && createVNode(VAvatar, {
              "key": "prepend-avatar"
            }, null), props.prependIcon && createVNode(VIcon, {
              "key": "prepend-icon"
            }, null), (_slots$prepend = slots.prepend) == null ? void 0 : _slots$prepend.call(slots, slotProps.value)])]
          }), createVNode("div", {
            "class": "v-list-item__content"
          }, [hasTitle && createVNode(VListItemTitle, {
            "key": "title"
          }, {
            default: () => [((_slots$title = slots.title) == null ? void 0 : _slots$title.call(slots, {
              title: props.title
            })) ?? props.title]
          }), hasSubtitle && createVNode(VListItemSubtitle, {
            "key": "subtitle"
          }, {
            default: () => [((_slots$subtitle = slots.subtitle) == null ? void 0 : _slots$subtitle.call(slots, {
              subtitle: props.subtitle
            })) ?? props.subtitle]
          }), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, slotProps.value)]), hasAppend && createVNode(VDefaultsProvider, {
            "key": "append",
            "defaults": {
              VAvatar: {
                density: props.density,
                image: props.appendAvatar
              },
              VIcon: {
                density: props.density,
                icon: props.appendIcon
              },
              VListItemAction: {
                end: true
              }
            }
          }, {
            default: () => [createVNode("div", {
              "class": "v-list-item__append"
            }, [(_slots$append = slots.append) == null ? void 0 : _slots$append.call(slots, slotProps.value), props.appendIcon && createVNode(VIcon, {
              "key": "append-icon"
            }, null), props.appendAvatar && createVNode(VAvatar, {
              "key": "append-avatar"
            }, null)])]
          })]
        }), [[resolveDirective("ripple"), isClickable.value]]);
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VList/VListSubheader.mjs
  var VListSubheader = defineComponent2({
    name: "VListSubheader",
    props: {
      color: String,
      inset: Boolean,
      sticky: Boolean,
      title: String,
      ...makeTagProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(toRef(props, "color"));
      useRender(() => {
        var _slots$default;
        const hasText = !!(slots.default || props.title);
        return createVNode(props.tag, {
          "class": ["v-list-subheader", {
            "v-list-subheader--inset": props.inset,
            "v-list-subheader--sticky": props.sticky
          }, textColorClasses.value],
          "style": {
            textColorStyles
          }
        }, {
          default: () => [hasText && createVNode("div", {
            "class": "v-list-subheader__text"
          }, [((_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)) ?? props.title])]
        });
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VList/VListChildren.mjs
  var VListChildren = genericComponent()({
    name: "VListChildren",
    props: {
      items: Array
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      createList();
      return () => {
        var _slots$default, _props$items;
        return ((_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)) ?? ((_props$items = props.items) == null ? void 0 : _props$items.map((_ref2) => {
          let {
            children,
            props: itemProps,
            type,
            raw: item
          } = _ref2;
          if (type === "divider") {
            var _slots$divider;
            return ((_slots$divider = slots.divider) == null ? void 0 : _slots$divider.call(slots, {
              props: itemProps
            })) ?? createVNode(VDivider, itemProps, null);
          }
          if (type === "subheader") {
            var _slots$subheader;
            return ((_slots$subheader = slots.subheader) == null ? void 0 : _slots$subheader.call(slots, {
              props: itemProps
            })) ?? createVNode(VListSubheader, itemProps, {
              default: slots.subheader
            });
          }
          const slotsWithItem = {
            subtitle: slots.subtitle ? (slotProps) => {
              var _slots$subtitle;
              return (_slots$subtitle = slots.subtitle) == null ? void 0 : _slots$subtitle.call(slots, {
                ...slotProps,
                item
              });
            } : void 0,
            prepend: slots.prepend ? (slotProps) => {
              var _slots$prepend;
              return (_slots$prepend = slots.prepend) == null ? void 0 : _slots$prepend.call(slots, {
                ...slotProps,
                item
              });
            } : void 0,
            append: slots.append ? (slotProps) => {
              var _slots$append;
              return (_slots$append = slots.append) == null ? void 0 : _slots$append.call(slots, {
                ...slotProps,
                item
              });
            } : void 0,
            default: slots.default ? (slotProps) => {
              var _slots$default2;
              return (_slots$default2 = slots.default) == null ? void 0 : _slots$default2.call(slots, {
                ...slotProps,
                item
              });
            } : void 0,
            title: slots.title ? (slotProps) => {
              var _slots$title;
              return (_slots$title = slots.title) == null ? void 0 : _slots$title.call(slots, {
                ...slotProps,
                item
              });
            } : void 0
          };
          const [listGroupProps, _1] = filterListGroupProps(itemProps);
          return children ? createVNode(VListGroup, mergeProps({
            "value": itemProps == null ? void 0 : itemProps.value
          }, listGroupProps), {
            activator: (_ref3) => {
              let {
                props: activatorProps
              } = _ref3;
              return slots.header ? slots.header({
                ...itemProps,
                ...activatorProps
              }) : createVNode(VListItem, mergeProps(itemProps, activatorProps), slotsWithItem);
            },
            default: () => createVNode(VListChildren, {
              "items": children
            }, slots)
          }) : slots.item ? slots.item(itemProps) : createVNode(VListItem, itemProps, slotsWithItem);
        }));
      };
    }
  });

  // node_modules/vuetify/lib/composables/items.mjs
  var makeItemsProps = propsFactory({
    items: {
      type: Array,
      default: () => []
    },
    itemTitle: {
      type: [String, Array, Function],
      default: "title"
    },
    itemValue: {
      type: [String, Array, Function],
      default: "value"
    },
    itemChildren: {
      type: [Boolean, String, Array, Function],
      default: "children"
    },
    itemProps: {
      type: [Boolean, String, Array, Function],
      default: "props"
    },
    returnObject: Boolean
  }, "item");
  function transformItem(props, item) {
    const title = getPropertyFromItem(item, props.itemTitle, item);
    const value = getPropertyFromItem(item, props.itemValue, title);
    const children = getPropertyFromItem(item, props.itemChildren);
    const itemProps = props.itemProps === true ? typeof item === "object" && item != null && !Array.isArray(item) ? "children" in item ? pick(item, ["children"])[1] : item : void 0 : getPropertyFromItem(item, props.itemProps);
    const _props = {
      title,
      value,
      ...itemProps
    };
    return {
      title: String(_props.title ?? ""),
      value: _props.value,
      props: _props,
      children: Array.isArray(children) ? transformItems(props, children) : void 0,
      raw: item
    };
  }
  function transformItems(props, items) {
    const array = [];
    for (const item of items) {
      array.push(transformItem(props, item));
    }
    return array;
  }
  function useItems(props) {
    const items = computed2(() => transformItems(props, props.items));
    function transformIn(value) {
      return value.map((item) => transformItem(props, item));
    }
    function transformOut(value) {
      if (props.returnObject)
        return value.map((_ref) => {
          let {
            raw: item
          } = _ref;
          return item;
        });
      return value.map((_ref2) => {
        let {
          props: props2
        } = _ref2;
        return props2.value;
      });
    }
    return {
      items,
      transformIn,
      transformOut
    };
  }

  // node_modules/vuetify/lib/components/VList/VList.mjs
  function transformItem2(props, item) {
    const type = getPropertyFromItem(item, props.itemType, "item");
    const title = typeof item === "string" ? item : getPropertyFromItem(item, props.itemTitle);
    const value = getPropertyFromItem(item, props.itemValue, void 0);
    const children = getPropertyFromItem(item, props.itemChildren);
    const itemProps = props.itemProps === true ? pick(item, ["children"])[1] : getPropertyFromItem(item, props.itemProps);
    const _props = {
      title,
      value,
      ...itemProps
    };
    return {
      type,
      title: _props.title,
      value: _props.value,
      props: _props,
      children: type === "item" && children ? transformItems2(props, children) : void 0,
      raw: item
    };
  }
  function transformItems2(props, items) {
    const array = [];
    for (const item of items) {
      array.push(transformItem2(props, item));
    }
    return array;
  }
  function useListItems(props) {
    const items = computed2(() => transformItems2(props, props.items));
    return {
      items
    };
  }
  var VList = genericComponent()({
    name: "VList",
    props: {
      activeColor: String,
      activeClass: String,
      bgColor: String,
      disabled: Boolean,
      lines: {
        type: [Boolean, String],
        default: "one"
      },
      nav: Boolean,
      ...makeNestedProps({
        selectStrategy: "single-leaf",
        openStrategy: "list"
      }),
      ...makeBorderProps(),
      ...makeDensityProps(),
      ...makeDimensionProps(),
      ...makeElevationProps(),
      itemType: {
        type: String,
        default: "type"
      },
      ...makeItemsProps(),
      ...makeRoundedProps(),
      ...makeTagProps(),
      ...makeThemeProps(),
      ...makeVariantProps({
        variant: "text"
      })
    },
    emits: {
      "update:selected": (val) => true,
      "update:opened": (val) => true,
      "click:open": (value) => true,
      "click:select": (value) => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        items
      } = useListItems(props);
      const {
        themeClasses
      } = provideTheme(props);
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(toRef(props, "bgColor"));
      const {
        borderClasses
      } = useBorder(props);
      const {
        densityClasses
      } = useDensity(props);
      const {
        dimensionStyles
      } = useDimension(props);
      const {
        elevationClasses
      } = useElevation(props);
      const {
        roundedClasses
      } = useRounded(props);
      const {
        open,
        select
      } = useNested(props);
      const lineClasses = computed2(() => props.lines ? `v-list--${props.lines}-line` : void 0);
      const activeColor = toRef(props, "activeColor");
      const color = toRef(props, "color");
      createList();
      provideDefaults({
        VListGroup: {
          activeColor,
          color
        },
        VListItem: {
          activeClass: toRef(props, "activeClass"),
          activeColor,
          color,
          density: toRef(props, "density"),
          disabled: toRef(props, "disabled"),
          lines: toRef(props, "lines"),
          nav: toRef(props, "nav"),
          variant: toRef(props, "variant")
        }
      });
      useRender(() => createVNode(props.tag, {
        "class": ["v-list", {
          "v-list--disabled": props.disabled,
          "v-list--nav": props.nav
        }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, lineClasses.value, roundedClasses.value],
        "style": [backgroundColorStyles.value, dimensionStyles.value]
      }, {
        default: () => [createVNode(VListChildren, {
          "items": items.value
        }, slots)]
      }));
      return {
        open,
        select
      };
    }
  });

  // node_modules/vuetify/lib/components/VList/VListImg.mjs
  var VListImg = createSimpleFunctional("v-list-img");

  // node_modules/vuetify/lib/components/VList/VListItemAction.mjs
  var VListItemAction = defineComponent2({
    name: "VListItemAction",
    props: {
      start: Boolean,
      end: Boolean,
      ...makeTagProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      useRender(() => createVNode(props.tag, {
        "class": ["v-list-item-action", {
          "v-list-item-action--start": props.start,
          "v-list-item-action--end": props.end
        }]
      }, slots));
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VList/VListItemMedia.mjs
  var VListItemMedia = defineComponent2({
    name: "VListItemMedia",
    props: {
      start: Boolean,
      end: Boolean,
      ...makeTagProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      useRender(() => {
        return createVNode(props.tag, {
          "class": ["v-list-item-media", {
            "v-list-item-media--start": props.start,
            "v-list-item-media--end": props.end
          }]
        }, slots);
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/composables/delay.mjs
  var makeDelayProps = propsFactory({
    closeDelay: [Number, String],
    openDelay: [Number, String]
  }, "delay");
  function useDelay(props, cb) {
    const delays = {};
    const runDelayFactory = (prop) => () => {
      if (!IN_BROWSER)
        return Promise.resolve(true);
      const active = prop === "openDelay";
      delays.closeDelay && window.clearTimeout(delays.closeDelay);
      delete delays.closeDelay;
      delays.openDelay && window.clearTimeout(delays.openDelay);
      delete delays.openDelay;
      return new Promise((resolve2) => {
        const delay = parseInt(props[prop] ?? 0, 10);
        delays[prop] = window.setTimeout(() => {
          cb == null ? void 0 : cb(active);
          resolve2(active);
        }, delay);
      });
    };
    return {
      runCloseDelay: runDelayFactory("closeDelay"),
      runOpenDelay: runDelayFactory("openDelay")
    };
  }

  // node_modules/vuetify/lib/components/VMenu/shared.mjs
  var VMenuSymbol = Symbol.for("vuetify:v-menu");

  // node_modules/vuetify/lib/components/VOverlay/useActivator.mjs
  var makeActivatorProps = propsFactory({
    activator: [String, Object],
    activatorProps: {
      type: Object,
      default: () => ({})
    },
    openOnClick: {
      type: Boolean,
      default: void 0
    },
    openOnHover: Boolean,
    openOnFocus: {
      type: Boolean,
      default: void 0
    },
    closeOnContentClick: Boolean,
    ...makeDelayProps()
  });
  function useActivator(props, _ref) {
    let {
      isActive,
      isTop
    } = _ref;
    const activatorEl = ref();
    let isHovered = false;
    let isFocused = false;
    let firstEnter = true;
    const openOnFocus = computed2(() => props.openOnFocus || props.openOnFocus == null && props.openOnHover);
    const openOnClick = computed2(() => props.openOnClick || props.openOnClick == null && !props.openOnHover && !openOnFocus.value);
    const {
      runOpenDelay,
      runCloseDelay
    } = useDelay(props, (value) => {
      if (value === (props.openOnHover && isHovered || openOnFocus.value && isFocused) && !(props.openOnHover && isActive.value && !isTop.value)) {
        if (isActive.value !== value) {
          firstEnter = true;
        }
        isActive.value = value;
      }
    });
    const availableEvents = {
      click: (e) => {
        e.stopPropagation();
        activatorEl.value = e.currentTarget || e.target;
        isActive.value = !isActive.value;
      },
      mouseenter: (e) => {
        isHovered = true;
        activatorEl.value = e.currentTarget || e.target;
        runOpenDelay();
      },
      mouseleave: (e) => {
        isHovered = false;
        runCloseDelay();
      },
      focus: (e) => {
        if (SUPPORTS_FOCUS_VISIBLE && !e.target.matches(":focus-visible"))
          return;
        isFocused = true;
        e.stopPropagation();
        activatorEl.value = e.currentTarget || e.target;
        runOpenDelay();
      },
      blur: (e) => {
        isFocused = false;
        e.stopPropagation();
        runCloseDelay();
      }
    };
    const activatorEvents = computed2(() => {
      const events = {};
      if (openOnClick.value) {
        events.click = availableEvents.click;
      }
      if (props.openOnHover) {
        events.mouseenter = availableEvents.mouseenter;
        events.mouseleave = availableEvents.mouseleave;
      }
      if (openOnFocus.value) {
        events.focus = availableEvents.focus;
        events.blur = availableEvents.blur;
      }
      return events;
    });
    const contentEvents = computed2(() => {
      const events = {};
      if (props.openOnHover) {
        events.mouseenter = () => {
          isHovered = true;
          runOpenDelay();
        };
        events.mouseleave = () => {
          isHovered = false;
          runCloseDelay();
        };
      }
      if (props.closeOnContentClick) {
        const menu = inject(VMenuSymbol, null);
        events.click = () => {
          isActive.value = false;
          menu == null ? void 0 : menu.closeParents();
        };
      }
      return events;
    });
    const scrimEvents = computed2(() => {
      const events = {};
      if (props.openOnHover) {
        events.mouseenter = () => {
          if (firstEnter) {
            isHovered = true;
            firstEnter = false;
            runOpenDelay();
          }
        };
        events.mouseleave = () => {
          isHovered = false;
          runCloseDelay();
        };
      }
      return events;
    });
    watch(isTop, (val) => {
      if (val && (props.openOnHover && !isHovered && (!openOnFocus.value || !isFocused) || openOnFocus.value && !isFocused && (!props.openOnHover || !isHovered))) {
        isActive.value = false;
      }
    });
    const activatorRef = ref();
    watchEffect(() => {
      if (!activatorRef.value)
        return;
      nextTick(() => {
        const activator = activatorRef.value;
        activatorEl.value = isComponentInstance(activator) ? activator.$el : activator;
      });
    });
    const vm = getCurrentInstance2("useActivator");
    let scope;
    watch(() => !!props.activator, (val) => {
      if (val && IN_BROWSER) {
        scope = effectScope();
        scope.run(() => {
          _useActivator(props, vm, {
            activatorEl,
            activatorEvents
          });
        });
      } else if (scope) {
        scope.stop();
      }
    }, {
      flush: "post",
      immediate: true
    });
    return {
      activatorEl,
      activatorRef,
      activatorEvents,
      contentEvents,
      scrimEvents
    };
  }
  function _useActivator(props, vm, _ref2) {
    let {
      activatorEl,
      activatorEvents
    } = _ref2;
    watch(() => props.activator, (val, oldVal) => {
      if (oldVal && val !== oldVal) {
        const activator = getActivator(oldVal);
        activator && unbindActivatorProps(activator);
      }
      if (val) {
        nextTick(() => bindActivatorProps());
      }
    }, {
      immediate: true
    });
    watch(() => props.activatorProps, () => {
      bindActivatorProps();
    });
    onScopeDispose(() => {
      unbindActivatorProps();
    });
    function bindActivatorProps() {
      let el = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getActivator();
      let _props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : props.activatorProps;
      if (!el)
        return;
      Object.entries(activatorEvents.value).forEach((_ref3) => {
        let [name, cb] = _ref3;
        el.addEventListener(name, cb);
      });
      Object.keys(_props).forEach((k) => {
        if (_props[k] == null) {
          el.removeAttribute(k);
        } else {
          el.setAttribute(k, _props[k]);
        }
      });
    }
    function unbindActivatorProps() {
      let el = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getActivator();
      let _props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : props.activatorProps;
      if (!el)
        return;
      Object.entries(activatorEvents.value).forEach((_ref4) => {
        let [name, cb] = _ref4;
        el.removeEventListener(name, cb);
      });
      Object.keys(_props).forEach((k) => {
        el.removeAttribute(k);
      });
    }
    function getActivator() {
      var _activator;
      let selector = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : props.activator;
      let activator;
      if (selector) {
        if (selector === "parent") {
          var _vm$proxy, _vm$proxy$$el;
          let el = vm == null ? void 0 : (_vm$proxy = vm.proxy) == null ? void 0 : (_vm$proxy$$el = _vm$proxy.$el) == null ? void 0 : _vm$proxy$$el.parentNode;
          while (el.hasAttribute("data-no-activator")) {
            el = el.parentNode;
          }
          activator = el;
        } else if (typeof selector === "string") {
          activator = document.querySelector(selector);
        } else if ("$el" in selector) {
          activator = selector.$el;
        } else {
          activator = selector;
        }
      }
      activatorEl.value = ((_activator = activator) == null ? void 0 : _activator.nodeType) === Node.ELEMENT_NODE ? activator : null;
      return activatorEl.value;
    }
  }

  // node_modules/vuetify/lib/composables/lazy.mjs
  var makeLazyProps = propsFactory({
    eager: Boolean
  }, "lazy");
  function useLazy(props, active) {
    const isBooted = ref(false);
    const hasContent = computed2(() => isBooted.value || props.eager || active.value);
    watch(active, () => isBooted.value = true);
    function onAfterLeave() {
      if (!props.eager)
        isBooted.value = false;
    }
    return {
      isBooted,
      hasContent,
      onAfterLeave
    };
  }

  // node_modules/vuetify/lib/components/VOverlay/util/point.mjs
  function elementToViewport(point, offset) {
    return {
      x: point.x + offset.x,
      y: point.y + offset.y
    };
  }
  function getOffset(a, b) {
    return {
      x: a.x - b.x,
      y: a.y - b.y
    };
  }
  function anchorToPoint(anchor, box) {
    if (anchor.side === "top" || anchor.side === "bottom") {
      const {
        side,
        align
      } = anchor;
      const x = align === "left" ? 0 : align === "center" ? box.width / 2 : align === "right" ? box.width : align;
      const y = side === "top" ? 0 : side === "bottom" ? box.height : side;
      return elementToViewport({
        x,
        y
      }, box);
    } else if (anchor.side === "left" || anchor.side === "right") {
      const {
        side,
        align
      } = anchor;
      const x = side === "left" ? 0 : side === "right" ? box.width : side;
      const y = align === "top" ? 0 : align === "center" ? box.height / 2 : align === "bottom" ? box.height : align;
      return elementToViewport({
        x,
        y
      }, box);
    }
    return elementToViewport({
      x: box.width / 2,
      y: box.height / 2
    }, box);
  }

  // node_modules/vuetify/lib/components/VOverlay/locationStrategies.mjs
  var locationStrategies = {
    static: staticLocationStrategy,
    connected: connectedLocationStrategy
  };
  var makeLocationStrategyProps = propsFactory({
    locationStrategy: {
      type: [String, Function],
      default: "static",
      validator: (val) => typeof val === "function" || val in locationStrategies
    },
    location: {
      type: String,
      default: "bottom"
    },
    origin: {
      type: String,
      default: "auto"
    },
    offset: [Number, String, Array]
  });
  function useLocationStrategies(props, data) {
    const contentStyles = ref({});
    const updateLocation = ref();
    let scope;
    watchEffect(async () => {
      var _scope;
      (_scope = scope) == null ? void 0 : _scope.stop();
      updateLocation.value = void 0;
      if (!(IN_BROWSER && data.isActive.value && props.locationStrategy))
        return;
      scope = effectScope();
      await nextTick();
      scope.run(() => {
        if (typeof props.locationStrategy === "function") {
          var _props$locationStrate;
          updateLocation.value = (_props$locationStrate = props.locationStrategy(data, props, contentStyles)) == null ? void 0 : _props$locationStrate.updateLocation;
        } else {
          var _locationStrategies$p;
          updateLocation.value = (_locationStrategies$p = locationStrategies[props.locationStrategy](data, props, contentStyles)) == null ? void 0 : _locationStrategies$p.updateLocation;
        }
      });
    });
    IN_BROWSER && window.addEventListener("resize", onResize, {
      passive: true
    });
    onScopeDispose(() => {
      var _scope2;
      IN_BROWSER && window.removeEventListener("resize", onResize);
      updateLocation.value = void 0;
      (_scope2 = scope) == null ? void 0 : _scope2.stop();
    });
    function onResize(e) {
      var _updateLocation$value;
      (_updateLocation$value = updateLocation.value) == null ? void 0 : _updateLocation$value.call(updateLocation, e);
    }
    return {
      contentStyles,
      updateLocation
    };
  }
  function staticLocationStrategy() {
  }
  function getIntrinsicSize(el) {
    const contentBox = nullifyTransforms(el);
    contentBox.x -= parseFloat(el.style.left || 0);
    contentBox.y -= parseFloat(el.style.top || 0);
    return contentBox;
  }
  function connectedLocationStrategy(data, props, contentStyles) {
    const activatorFixed = isFixedPosition(data.activatorEl.value);
    if (activatorFixed) {
      Object.assign(contentStyles.value, {
        position: "fixed"
      });
    }
    const {
      preferredAnchor,
      preferredOrigin
    } = destructComputed(() => {
      const parsedAnchor = parseAnchor(props.location, data.isRtl.value);
      const parsedOrigin = props.origin === "overlap" ? parsedAnchor : props.origin === "auto" ? flipSide(parsedAnchor) : parseAnchor(props.origin, data.isRtl.value);
      if (parsedAnchor.side === parsedOrigin.side && parsedAnchor.align === flipAlign(parsedOrigin).align) {
        return {
          preferredAnchor: flipCorner(parsedAnchor),
          preferredOrigin: flipCorner(parsedOrigin)
        };
      } else {
        return {
          preferredAnchor: parsedAnchor,
          preferredOrigin: parsedOrigin
        };
      }
    });
    const [minWidth, minHeight, maxWidth, maxHeight] = ["minWidth", "minHeight", "maxWidth", "maxHeight"].map((key) => {
      return computed2(() => {
        const val = parseFloat(props[key]);
        return isNaN(val) ? Infinity : val;
      });
    });
    const offset = computed2(() => {
      if (Array.isArray(props.offset)) {
        return props.offset;
      }
      if (typeof props.offset === "string") {
        const offset2 = props.offset.split(" ").map(parseFloat);
        if (offset2.length < 2)
          offset2.push(0);
        return offset2;
      }
      return typeof props.offset === "number" ? [props.offset, 0] : [0, 0];
    });
    let observe = false;
    if (IN_BROWSER) {
      const observer = new ResizeObserver(() => {
        if (observe)
          updateLocation();
      });
      watch([data.activatorEl, data.contentEl], (_ref, _ref2) => {
        let [newActivatorEl, newContentEl] = _ref;
        let [oldActivatorEl, oldContentEl] = _ref2;
        if (oldActivatorEl)
          observer.unobserve(oldActivatorEl);
        if (newActivatorEl)
          observer.observe(newActivatorEl);
        if (oldContentEl)
          observer.unobserve(oldContentEl);
        if (newContentEl)
          observer.observe(newContentEl);
      }, {
        immediate: true
      });
      onScopeDispose(() => {
        observer.disconnect();
      });
    }
    function updateLocation() {
      observe = false;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => observe = true);
      });
      if (!data.activatorEl.value || !data.contentEl.value)
        return;
      const targetBox = data.activatorEl.value.getBoundingClientRect();
      const contentBox = getIntrinsicSize(data.contentEl.value);
      const scrollParents = getScrollParents(data.contentEl.value);
      const viewportMargin = 12;
      if (!scrollParents.length) {
        scrollParents.push(document.documentElement);
        if (!(data.contentEl.value.style.top && data.contentEl.value.style.left)) {
          contentBox.x += parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x") || 0);
          contentBox.y += parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y") || 0);
        }
      }
      const viewport = scrollParents.reduce((box, el) => {
        const rect = el.getBoundingClientRect();
        const scrollBox = new Box({
          x: el === document.documentElement ? 0 : rect.x,
          y: el === document.documentElement ? 0 : rect.y,
          width: el.clientWidth,
          height: el.clientHeight
        });
        if (box) {
          return new Box({
            x: Math.max(box.left, scrollBox.left),
            y: Math.max(box.top, scrollBox.top),
            width: Math.min(box.right, scrollBox.right) - Math.max(box.left, scrollBox.left),
            height: Math.min(box.bottom, scrollBox.bottom) - Math.max(box.top, scrollBox.top)
          });
        }
        return scrollBox;
      }, void 0);
      viewport.x += viewportMargin;
      viewport.y += viewportMargin;
      viewport.width -= viewportMargin * 2;
      viewport.height -= viewportMargin * 2;
      let placement = {
        anchor: preferredAnchor.value,
        origin: preferredOrigin.value
      };
      function checkOverflow(_placement) {
        const box = new Box(contentBox);
        const targetPoint = anchorToPoint(_placement.anchor, targetBox);
        const contentPoint = anchorToPoint(_placement.origin, box);
        let {
          x: x2,
          y: y2
        } = getOffset(targetPoint, contentPoint);
        switch (_placement.anchor.side) {
          case "top":
            y2 -= offset.value[0];
            break;
          case "bottom":
            y2 += offset.value[0];
            break;
          case "left":
            x2 -= offset.value[0];
            break;
          case "right":
            x2 += offset.value[0];
            break;
        }
        switch (_placement.anchor.align) {
          case "top":
            y2 -= offset.value[1];
            break;
          case "bottom":
            y2 += offset.value[1];
            break;
          case "left":
            x2 -= offset.value[1];
            break;
          case "right":
            x2 += offset.value[1];
            break;
        }
        box.x += x2;
        box.y += y2;
        box.width = Math.min(box.width, maxWidth.value);
        box.height = Math.min(box.height, maxHeight.value);
        const overflows = getOverflow(box, viewport);
        return {
          overflows,
          x: x2,
          y: y2
        };
      }
      let x = 0;
      let y = 0;
      const available = {
        x: 0,
        y: 0
      };
      const flipped = {
        x: false,
        y: false
      };
      let resets = -1;
      while (true) {
        if (resets++ > 10) {
          consoleError("Infinite loop detected in connectedLocationStrategy");
          break;
        }
        const {
          x: _x,
          y: _y,
          overflows
        } = checkOverflow(placement);
        x += _x;
        y += _y;
        contentBox.x += _x;
        contentBox.y += _y;
        {
          const axis2 = getAxis(placement.anchor);
          const hasOverflowX = overflows.x.before || overflows.x.after;
          const hasOverflowY = overflows.y.before || overflows.y.after;
          let reset2 = false;
          ["x", "y"].forEach((key) => {
            if (key === "x" && hasOverflowX && !flipped.x || key === "y" && hasOverflowY && !flipped.y) {
              const newPlacement = {
                anchor: {
                  ...placement.anchor
                },
                origin: {
                  ...placement.origin
                }
              };
              const flip = key === "x" ? axis2 === "y" ? flipAlign : flipSide : axis2 === "y" ? flipSide : flipAlign;
              newPlacement.anchor = flip(newPlacement.anchor);
              newPlacement.origin = flip(newPlacement.origin);
              const {
                overflows: newOverflows
              } = checkOverflow(newPlacement);
              if (newOverflows[key].before <= overflows[key].before && newOverflows[key].after <= overflows[key].after || newOverflows[key].before + newOverflows[key].after < (overflows[key].before + overflows[key].after) / 2) {
                placement = newPlacement;
                reset2 = flipped[key] = true;
              }
            }
          });
          if (reset2)
            continue;
        }
        if (overflows.x.before) {
          x += overflows.x.before;
          contentBox.x += overflows.x.before;
        }
        if (overflows.x.after) {
          x -= overflows.x.after;
          contentBox.x -= overflows.x.after;
        }
        if (overflows.y.before) {
          y += overflows.y.before;
          contentBox.y += overflows.y.before;
        }
        if (overflows.y.after) {
          y -= overflows.y.after;
          contentBox.y -= overflows.y.after;
        }
        {
          const overflows2 = getOverflow(contentBox, viewport);
          available.x = viewport.width - overflows2.x.before - overflows2.x.after;
          available.y = viewport.height - overflows2.y.before - overflows2.y.after;
          x += overflows2.x.before;
          contentBox.x += overflows2.x.before;
          y += overflows2.y.before;
          contentBox.y += overflows2.y.before;
        }
        break;
      }
      const axis = getAxis(placement.anchor);
      Object.assign(contentStyles.value, {
        "--v-overlay-anchor-origin": `${placement.anchor.side} ${placement.anchor.align}`,
        transformOrigin: `${placement.origin.side} ${placement.origin.align}`,
        top: convertToUnit(pixelRound(y)),
        left: convertToUnit(pixelRound(x)),
        minWidth: convertToUnit(axis === "y" ? Math.min(minWidth.value, targetBox.width) : minWidth.value),
        maxWidth: convertToUnit(pixelCeil(clamp(available.x, minWidth.value === Infinity ? 0 : minWidth.value, maxWidth.value))),
        maxHeight: convertToUnit(pixelCeil(clamp(available.y, minHeight.value === Infinity ? 0 : minHeight.value, maxHeight.value)))
      });
    }
    watch(() => [preferredAnchor.value, preferredOrigin.value, props.offset, props.minWidth, props.minHeight, props.maxWidth, props.maxHeight], () => updateLocation(), {
      immediate: !activatorFixed
    });
    if (activatorFixed)
      nextTick(() => updateLocation());
    requestAnimationFrame(() => {
      if (contentStyles.value.maxHeight)
        updateLocation();
    });
    return {
      updateLocation
    };
  }
  function pixelRound(val) {
    return Math.round(val * devicePixelRatio) / devicePixelRatio;
  }
  function pixelCeil(val) {
    return Math.ceil(val * devicePixelRatio) / devicePixelRatio;
  }

  // node_modules/vuetify/lib/components/VOverlay/requestNewFrame.mjs
  var clean = true;
  var frames = [];
  function requestNewFrame(cb) {
    if (!clean || frames.length) {
      frames.push(cb);
      run();
    } else {
      clean = false;
      cb();
      run();
    }
  }
  var raf = -1;
  function run() {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const frame = frames.shift();
      if (frame)
        frame();
      if (frames.length)
        run();
      else
        clean = true;
    });
  }

  // node_modules/vuetify/lib/components/VOverlay/scrollStrategies.mjs
  var scrollStrategies = {
    none: null,
    close: closeScrollStrategy,
    block: blockScrollStrategy,
    reposition: repositionScrollStrategy
  };
  var makeScrollStrategyProps = propsFactory({
    scrollStrategy: {
      type: [String, Function],
      default: "block",
      validator: (val) => typeof val === "function" || val in scrollStrategies
    }
  });
  function useScrollStrategies(props, data) {
    if (!IN_BROWSER)
      return;
    let scope;
    watchEffect(async () => {
      var _scope;
      (_scope = scope) == null ? void 0 : _scope.stop();
      if (!(data.isActive.value && props.scrollStrategy))
        return;
      scope = effectScope();
      await nextTick();
      scope.run(() => {
        if (typeof props.scrollStrategy === "function") {
          props.scrollStrategy(data, props);
        } else {
          var _scrollStrategies$pro;
          (_scrollStrategies$pro = scrollStrategies[props.scrollStrategy]) == null ? void 0 : _scrollStrategies$pro.call(scrollStrategies, data, props);
        }
      });
    });
  }
  function closeScrollStrategy(data) {
    function onScroll(e) {
      data.isActive.value = false;
    }
    bindScroll(data.activatorEl.value ?? data.contentEl.value, onScroll);
  }
  function blockScrollStrategy(data, props) {
    var _data$root$value;
    const offsetParent = (_data$root$value = data.root.value) == null ? void 0 : _data$root$value.offsetParent;
    const scrollElements = [.../* @__PURE__ */ new Set([...getScrollParents(data.activatorEl.value, props.contained ? offsetParent : void 0), ...getScrollParents(data.contentEl.value, props.contained ? offsetParent : void 0)])].filter((el) => !el.classList.contains("v-overlay-scroll-blocked"));
    const scrollbarWidth = window.innerWidth - document.documentElement.offsetWidth;
    const scrollableParent = ((el) => hasScrollbar(el) && el)(offsetParent || document.documentElement);
    if (scrollableParent) {
      data.root.value.classList.add("v-overlay--scroll-blocked");
    }
    scrollElements.forEach((el, i) => {
      el.style.setProperty("--v-body-scroll-x", convertToUnit(-el.scrollLeft));
      el.style.setProperty("--v-body-scroll-y", convertToUnit(-el.scrollTop));
      el.style.setProperty("--v-scrollbar-offset", convertToUnit(scrollbarWidth));
      el.classList.add("v-overlay-scroll-blocked");
    });
    onScopeDispose(() => {
      scrollElements.forEach((el, i) => {
        const x = parseFloat(el.style.getPropertyValue("--v-body-scroll-x"));
        const y = parseFloat(el.style.getPropertyValue("--v-body-scroll-y"));
        el.style.removeProperty("--v-body-scroll-x");
        el.style.removeProperty("--v-body-scroll-y");
        el.style.removeProperty("--v-scrollbar-offset");
        el.classList.remove("v-overlay-scroll-blocked");
        el.scrollLeft = -x;
        el.scrollTop = -y;
      });
      if (scrollableParent) {
        data.root.value.classList.remove("v-overlay--scroll-blocked");
      }
    });
  }
  function repositionScrollStrategy(data) {
    let slow = false;
    let raf2 = -1;
    function update(e) {
      requestNewFrame(() => {
        var _data$updateLocation$, _data$updateLocation;
        const start = performance.now();
        (_data$updateLocation$ = (_data$updateLocation = data.updateLocation).value) == null ? void 0 : _data$updateLocation$.call(_data$updateLocation, e);
        const time = performance.now() - start;
        slow = time / (1e3 / 60) > 2;
      });
    }
    bindScroll(data.activatorEl.value ?? data.contentEl.value, (e) => {
      if (slow) {
        cancelAnimationFrame(raf2);
        raf2 = requestAnimationFrame(() => {
          raf2 = requestAnimationFrame(() => {
            update(e);
          });
        });
      } else {
        update(e);
      }
    });
  }
  function bindScroll(el, onScroll) {
    const scrollElements = [document, ...getScrollParents(el)];
    scrollElements.forEach((el2) => {
      el2.addEventListener("scroll", onScroll, {
        passive: true
      });
    });
    onScopeDispose(() => {
      scrollElements.forEach((el2) => {
        el2.removeEventListener("scroll", onScroll);
      });
    });
  }

  // node_modules/vuetify/lib/composables/stack.mjs
  var StackSymbol = Symbol.for("vuetify:stack");
  var globalStack = reactive([]);
  function useStack(isActive, zIndex) {
    const vm = getCurrentInstance2("useStack");
    const parent = inject(StackSymbol, void 0);
    const stack2 = reactive({
      activeChildren: /* @__PURE__ */ new Set()
    });
    provide(StackSymbol, stack2);
    const _zIndex = ref(+zIndex.value);
    useToggleScope(isActive, () => {
      var _globalStack$at;
      const lastZIndex = (_globalStack$at = globalStack.at(-1)) == null ? void 0 : _globalStack$at[1];
      _zIndex.value = lastZIndex ? lastZIndex + 10 : +zIndex.value;
      globalStack.push([vm.uid, _zIndex.value]);
      parent == null ? void 0 : parent.activeChildren.add(vm.uid);
      onScopeDispose(() => {
        const idx = globalStack.findIndex((v) => v[0] === vm.uid);
        globalStack.splice(idx, 1);
        parent == null ? void 0 : parent.activeChildren.delete(vm.uid);
      });
    });
    const globalTop = ref(true);
    watchEffect(() => {
      var _globalStack$at2;
      const _isTop = ((_globalStack$at2 = globalStack.at(-1)) == null ? void 0 : _globalStack$at2[0]) === vm.uid;
      setTimeout(() => globalTop.value = _isTop);
    });
    const localTop = computed2(() => !stack2.activeChildren.size);
    return {
      globalTop: readonly(globalTop),
      localTop,
      stackStyles: computed2(() => ({
        zIndex: _zIndex.value
      }))
    };
  }

  // node_modules/vuetify/lib/composables/teleport.mjs
  function useTeleport(target) {
    const teleportTarget = computed2(() => {
      const _target = target.value;
      if (_target === true || !IN_BROWSER)
        return void 0;
      const targetElement = _target === false ? document.body : typeof _target === "string" ? document.querySelector(_target) : _target;
      if (targetElement == null) {
        warn2(`Unable to locate target ${_target}`);
        return void 0;
      }
      if (!useTeleport.cache.has(targetElement)) {
        const el = document.createElement("div");
        el.className = "v-overlay-container";
        targetElement.appendChild(el);
        useTeleport.cache.set(targetElement, el);
      }
      return useTeleport.cache.get(targetElement);
    });
    return {
      teleportTarget
    };
  }
  useTeleport.cache = /* @__PURE__ */ new WeakMap();

  // node_modules/vuetify/lib/directives/click-outside/index.mjs
  function defaultConditional() {
    return true;
  }
  function checkEvent(e, el, binding) {
    if (!e || checkIsActive(e, binding) === false)
      return false;
    const root = attachedRoot(el);
    if (typeof ShadowRoot !== "undefined" && root instanceof ShadowRoot && root.host === e.target)
      return false;
    const elements = (typeof binding.value === "object" && binding.value.include || (() => []))();
    elements.push(el);
    return !elements.some((el2) => el2 == null ? void 0 : el2.contains(e.target));
  }
  function checkIsActive(e, binding) {
    const isActive = typeof binding.value === "object" && binding.value.closeConditional || defaultConditional;
    return isActive(e);
  }
  function directive(e, el, binding) {
    const handler = typeof binding.value === "function" ? binding.value : binding.value.handler;
    el._clickOutside.lastMousedownWasOutside && checkEvent(e, el, binding) && setTimeout(() => {
      checkIsActive(e, binding) && handler && handler(e);
    }, 0);
  }
  function handleShadow(el, callback) {
    const root = attachedRoot(el);
    callback(document);
    if (typeof ShadowRoot !== "undefined" && root instanceof ShadowRoot) {
      callback(root);
    }
  }
  var ClickOutside = {
    mounted(el, binding) {
      const onClick = (e) => directive(e, el, binding);
      const onMousedown = (e) => {
        el._clickOutside.lastMousedownWasOutside = checkEvent(e, el, binding);
      };
      handleShadow(el, (app2) => {
        app2.addEventListener("click", onClick, true);
        app2.addEventListener("mousedown", onMousedown, true);
      });
      if (!el._clickOutside) {
        el._clickOutside = {
          lastMousedownWasOutside: true
        };
      }
      el._clickOutside[binding.instance.$.uid] = {
        onClick,
        onMousedown
      };
    },
    unmounted(el, binding) {
      if (!el._clickOutside)
        return;
      handleShadow(el, (app2) => {
        var _el$_clickOutside;
        if (!app2 || !((_el$_clickOutside = el._clickOutside) != null && _el$_clickOutside[binding.instance.$.uid]))
          return;
        const {
          onClick,
          onMousedown
        } = el._clickOutside[binding.instance.$.uid];
        app2.removeEventListener("click", onClick, true);
        app2.removeEventListener("mousedown", onMousedown, true);
      });
      delete el._clickOutside[binding.instance.$.uid];
    }
  };

  // node_modules/vuetify/lib/components/VOverlay/VOverlay.mjs
  function Scrim(props) {
    const {
      modelValue,
      color,
      ...rest
    } = props;
    return createVNode(Transition, {
      "name": "fade-transition",
      "appear": true
    }, {
      default: () => [props.modelValue && createVNode("div", mergeProps({
        "class": ["v-overlay__scrim", props.color.backgroundColorClasses.value],
        "style": props.color.backgroundColorStyles.value
      }, rest), null)]
    });
  }
  var VOverlay = genericComponent()({
    name: "VOverlay",
    directives: {
      ClickOutside
    },
    inheritAttrs: false,
    props: {
      absolute: Boolean,
      attach: [Boolean, String, Object],
      closeOnBack: {
        type: Boolean,
        default: true
      },
      contained: Boolean,
      contentClass: null,
      contentProps: null,
      disabled: Boolean,
      noClickAnimation: Boolean,
      modelValue: Boolean,
      persistent: Boolean,
      scrim: {
        type: [String, Boolean],
        default: true
      },
      zIndex: {
        type: [Number, String],
        default: 2e3
      },
      ...makeActivatorProps(),
      ...makeDimensionProps(),
      ...makeLazyProps(),
      ...makeLocationStrategyProps(),
      ...makeScrollStrategyProps(),
      ...makeThemeProps(),
      ...makeTransitionProps()
    },
    emits: {
      "click:outside": (e) => true,
      "update:modelValue": (value) => true,
      afterLeave: () => true
    },
    setup(props, _ref) {
      let {
        slots,
        attrs,
        emit: emit2
      } = _ref;
      const model = useProxiedModel(props, "modelValue");
      const isActive = computed2({
        get: () => model.value,
        set: (v) => {
          if (!(v && props.disabled))
            model.value = v;
        }
      });
      const {
        teleportTarget
      } = useTeleport(computed2(() => props.attach || props.contained));
      const {
        themeClasses
      } = provideTheme(props);
      const {
        rtlClasses,
        isRtl
      } = useRtl();
      const {
        hasContent,
        onAfterLeave
      } = useLazy(props, isActive);
      const scrimColor = useBackgroundColor(computed2(() => {
        return typeof props.scrim === "string" ? props.scrim : null;
      }));
      const {
        globalTop,
        localTop,
        stackStyles
      } = useStack(isActive, toRef(props, "zIndex"));
      const {
        activatorEl,
        activatorRef,
        activatorEvents,
        contentEvents,
        scrimEvents
      } = useActivator(props, {
        isActive,
        isTop: localTop
      });
      const {
        dimensionStyles
      } = useDimension(props);
      watch(() => props.disabled, (v) => {
        if (v)
          isActive.value = false;
      });
      const root = ref();
      const contentEl = ref();
      const {
        contentStyles,
        updateLocation
      } = useLocationStrategies(props, {
        isRtl,
        contentEl,
        activatorEl,
        isActive
      });
      useScrollStrategies(props, {
        root,
        contentEl,
        activatorEl,
        isActive,
        updateLocation
      });
      function onClickOutside(e) {
        emit2("click:outside", e);
        if (!props.persistent)
          isActive.value = false;
        else
          animateClick();
      }
      function closeConditional() {
        return isActive.value && globalTop.value;
      }
      IN_BROWSER && watch(isActive, (val) => {
        if (val) {
          window.addEventListener("keydown", onKeydown);
        } else {
          window.removeEventListener("keydown", onKeydown);
        }
      }, {
        immediate: true
      });
      function onKeydown(e) {
        if (e.key === "Escape" && globalTop.value) {
          if (!props.persistent) {
            isActive.value = false;
          } else
            animateClick();
        }
      }
      const router = useRouter();
      useToggleScope(() => props.closeOnBack, () => {
        useBackButton(router, (next) => {
          if (globalTop.value && isActive.value) {
            next(false);
            if (!props.persistent)
              isActive.value = false;
            else
              animateClick();
          } else {
            next();
          }
        });
      });
      const top = ref();
      watch(() => isActive.value && (props.absolute || props.contained) && teleportTarget.value == null, (val) => {
        if (val) {
          const scrollParent = getScrollParent(root.value);
          if (scrollParent && scrollParent !== document.scrollingElement) {
            top.value = scrollParent.scrollTop;
          }
        }
      });
      function animateClick() {
        if (props.noClickAnimation)
          return;
        contentEl.value && animate(contentEl.value, [{
          transformOrigin: "center"
        }, {
          transform: "scale(1.03)"
        }, {
          transformOrigin: "center"
        }], {
          duration: 150,
          easing: standardEasing
        });
      }
      useRender(() => {
        var _slots$activator, _slots$default;
        return createVNode(Fragment, null, [(_slots$activator = slots.activator) == null ? void 0 : _slots$activator.call(slots, {
          isActive: isActive.value,
          props: mergeProps({
            ref: activatorRef
          }, toHandlers(activatorEvents.value), props.activatorProps)
        }), IN_BROWSER && createVNode(Teleport, {
          "disabled": !teleportTarget.value,
          "to": teleportTarget.value
        }, {
          default: () => [hasContent.value && createVNode("div", mergeProps({
            "class": ["v-overlay", {
              "v-overlay--absolute": props.absolute || props.contained,
              "v-overlay--active": isActive.value,
              "v-overlay--contained": props.contained
            }, themeClasses.value, rtlClasses.value],
            "style": [stackStyles.value, {
              top: convertToUnit(top.value)
            }],
            "ref": root
          }, attrs), [createVNode(Scrim, mergeProps({
            "color": scrimColor,
            "modelValue": isActive.value && !!props.scrim
          }, toHandlers(scrimEvents.value)), null), createVNode(MaybeTransition, {
            "appear": true,
            "persisted": true,
            "transition": props.transition,
            "target": activatorEl.value,
            "onAfterLeave": () => {
              onAfterLeave();
              emit2("afterLeave");
            }
          }, {
            default: () => [withDirectives(createVNode("div", mergeProps({
              "ref": contentEl,
              "class": ["v-overlay__content", props.contentClass],
              "style": [dimensionStyles.value, contentStyles.value]
            }, toHandlers(contentEvents.value), props.contentProps), [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
              isActive
            })]), [[vShow, isActive.value], [resolveDirective("click-outside"), {
              handler: onClickOutside,
              closeConditional,
              include: () => [activatorEl.value]
            }]])]
          })])]
        })]);
      });
      return {
        activatorEl,
        animateClick,
        contentEl,
        globalTop,
        localTop,
        updateLocation
      };
    }
  });

  // node_modules/vuetify/lib/composables/forwardRefs.mjs
  var Refs = Symbol("Forwarded refs");
  function forwardRefs(target) {
    for (var _len = arguments.length, refs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      refs[_key - 1] = arguments[_key];
    }
    target[Refs] = refs;
    return new Proxy(target, {
      get(target2, key) {
        if (Reflect.has(target2, key)) {
          return Reflect.get(target2, key);
        }
        for (const ref2 of refs) {
          if (ref2.value && Reflect.has(ref2.value, key)) {
            const val = Reflect.get(ref2.value, key);
            return typeof val === "function" ? val.bind(ref2.value) : val;
          }
        }
      },
      getOwnPropertyDescriptor(target2, key) {
        const descriptor = Reflect.getOwnPropertyDescriptor(target2, key);
        if (descriptor)
          return descriptor;
        if (typeof key === "symbol" || key.startsWith("__"))
          return;
        for (const ref2 of refs) {
          if (!ref2.value)
            continue;
          const descriptor2 = Reflect.getOwnPropertyDescriptor(ref2.value, key);
          if (descriptor2)
            return descriptor2;
          if ("_" in ref2.value && "setupState" in ref2.value._) {
            const descriptor3 = Reflect.getOwnPropertyDescriptor(ref2.value._.setupState, key);
            if (descriptor3)
              return descriptor3;
          }
        }
        for (const ref2 of refs) {
          let obj = ref2.value && Object.getPrototypeOf(ref2.value);
          while (obj) {
            const descriptor2 = Reflect.getOwnPropertyDescriptor(obj, key);
            if (descriptor2)
              return descriptor2;
            obj = Object.getPrototypeOf(obj);
          }
        }
        for (const ref2 of refs) {
          const childRefs = ref2.value && ref2.value[Refs];
          if (!childRefs)
            continue;
          const queue2 = childRefs.slice();
          while (queue2.length) {
            const ref3 = queue2.shift();
            const descriptor2 = Reflect.getOwnPropertyDescriptor(ref3.value, key);
            if (descriptor2)
              return descriptor2;
            const childRefs2 = ref3.value && ref3.value[Refs];
            if (childRefs2)
              queue2.push(...childRefs2);
          }
        }
        return void 0;
      }
    });
  }

  // node_modules/vuetify/lib/composables/scopeId.mjs
  function useScopeId() {
    const vm = getCurrentInstance2("useScopeId");
    const scopeId = vm.vnode.scopeId;
    return {
      scopeId: scopeId ? {
        [scopeId]: ""
      } : void 0
    };
  }

  // node_modules/vuetify/lib/components/VMenu/VMenu.mjs
  var VMenu = genericComponent()({
    name: "VMenu",
    inheritAttrs: false,
    props: {
      modelValue: Boolean,
      id: String,
      ...makeTransitionProps({
        transition: {
          component: VDialogTransition
        }
      })
    },
    emits: {
      "update:modelValue": (value) => true
    },
    setup(props, _ref) {
      let {
        attrs,
        slots
      } = _ref;
      const isActive = useProxiedModel(props, "modelValue");
      const {
        scopeId
      } = useScopeId();
      const uid2 = getUid();
      const id = computed2(() => props.id || `v-menu-${uid2}`);
      const overlay = ref();
      const parent = inject(VMenuSymbol, null);
      let openChildren = 0;
      provide(VMenuSymbol, {
        register() {
          ++openChildren;
        },
        unregister() {
          --openChildren;
        },
        closeParents() {
          setTimeout(() => {
            if (!openChildren) {
              isActive.value = false;
              parent == null ? void 0 : parent.closeParents();
            }
          }, 40);
        }
      });
      watch(isActive, (val) => {
        val ? parent == null ? void 0 : parent.register() : parent == null ? void 0 : parent.unregister();
      });
      function onClickOutside() {
        parent == null ? void 0 : parent.closeParents();
      }
      useRender(() => createVNode(VOverlay, mergeProps({
        "ref": overlay,
        "modelValue": isActive.value,
        "onUpdate:modelValue": ($event) => isActive.value = $event,
        "class": ["v-menu"],
        "transition": props.transition,
        "absolute": true,
        "closeOnContentClick": true,
        "locationStrategy": "connected",
        "scrollStrategy": "reposition",
        "scrim": false,
        "openDelay": "300",
        "closeDelay": "250",
        "activatorProps": {
          "aria-haspopup": "menu",
          "aria-expanded": String(isActive.value),
          "aria-owns": id.value
        },
        "onClick:outside": onClickOutside
      }, scopeId, attrs), {
        activator: slots.activator,
        default: function() {
          var _slots$default;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return createVNode(VDefaultsProvider, {
            "root": true
          }, {
            default: () => [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, ...args)]
          });
        }
      }));
      return forwardRefs({
        id
      }, overlay);
    }
  });

  // node_modules/vuetify/lib/components/VField/VFieldLabel.mjs
  var VFieldLabel = defineComponent2({
    name: "VFieldLabel",
    props: {
      floating: Boolean
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      useRender(() => createVNode(VLabel, {
        "class": ["v-field-label", {
          "v-field-label--floating": props.floating
        }],
        "aria-hidden": props.floating || void 0
      }, slots));
      return {};
    }
  });

  // node_modules/vuetify/lib/composables/focus.mjs
  var makeFocusProps = propsFactory({
    focused: Boolean
  }, "focus");
  function useFocus(props) {
    let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
    const isFocused = useProxiedModel(props, "focused");
    const focusClasses = computed2(() => {
      return {
        [`${name}--focused`]: isFocused.value
      };
    });
    function focus() {
      isFocused.value = true;
    }
    function blur() {
      isFocused.value = false;
    }
    return {
      focusClasses,
      isFocused,
      focus,
      blur
    };
  }

  // node_modules/vuetify/lib/components/VField/VField.mjs
  var allowedVariants2 = ["underlined", "outlined", "filled", "solo", "plain"];
  var makeVFieldProps = propsFactory({
    appendInnerIcon: IconValue,
    bgColor: String,
    clearable: Boolean,
    clearIcon: {
      type: IconValue,
      default: "$clear"
    },
    active: Boolean,
    color: String,
    dirty: Boolean,
    disabled: Boolean,
    error: Boolean,
    label: String,
    persistentClear: Boolean,
    prependInnerIcon: IconValue,
    reverse: Boolean,
    singleLine: Boolean,
    variant: {
      type: String,
      default: "filled",
      validator: (v) => allowedVariants2.includes(v)
    },
    "onClick:clear": EventProp,
    "onClick:appendInner": EventProp,
    "onClick:prependInner": EventProp,
    ...makeThemeProps(),
    ...makeLoaderProps()
  }, "v-field");
  var VField = genericComponent()({
    name: "VField",
    inheritAttrs: false,
    props: {
      id: String,
      ...makeFocusProps(),
      ...makeVFieldProps()
    },
    emits: {
      "click:control": (e) => true,
      "update:focused": (focused) => true,
      "update:modelValue": (val) => true
    },
    setup(props, _ref) {
      let {
        attrs,
        emit: emit2,
        slots
      } = _ref;
      const {
        themeClasses
      } = provideTheme(props);
      const {
        loaderClasses
      } = useLoader(props);
      const {
        focusClasses,
        isFocused,
        focus,
        blur
      } = useFocus(props);
      const {
        InputIcon
      } = useInputIcon(props);
      const isActive = computed2(() => props.dirty || props.active);
      const hasLabel = computed2(() => !props.singleLine && !!(props.label || slots.label));
      const uid2 = getUid();
      const id = computed2(() => props.id || `input-${uid2}`);
      const labelRef = ref();
      const floatingLabelRef = ref();
      const controlRef = ref();
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(toRef(props, "bgColor"));
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(computed2(() => {
        return isActive.value && isFocused.value && !props.error && !props.disabled ? props.color : void 0;
      }));
      watch(isActive, (val) => {
        if (hasLabel.value) {
          const el = labelRef.value.$el;
          const targetEl = floatingLabelRef.value.$el;
          const rect = nullifyTransforms(el);
          const targetRect = targetEl.getBoundingClientRect();
          const x = targetRect.x - rect.x;
          const y = targetRect.y - rect.y - (rect.height / 2 - targetRect.height / 2);
          const targetWidth = targetRect.width / 0.75;
          const width = Math.abs(targetWidth - rect.width) > 1 ? {
            maxWidth: convertToUnit(targetWidth)
          } : void 0;
          const style = getComputedStyle(el);
          const targetStyle = getComputedStyle(targetEl);
          const duration = parseFloat(style.transitionDuration) * 1e3 || 150;
          const scale = parseFloat(targetStyle.getPropertyValue("--v-field-label-scale"));
          const color = targetStyle.getPropertyValue("color");
          el.style.visibility = "visible";
          targetEl.style.visibility = "hidden";
          animate(el, {
            transform: `translate(${x}px, ${y}px) scale(${scale})`,
            color,
            ...width
          }, {
            duration,
            easing: standardEasing,
            direction: val ? "normal" : "reverse"
          }).finished.then(() => {
            el.style.removeProperty("visibility");
            targetEl.style.removeProperty("visibility");
          });
        }
      }, {
        flush: "post"
      });
      const slotProps = computed2(() => ({
        isActive,
        isFocused,
        controlRef,
        blur,
        focus
      }));
      function onClick(e) {
        if (e.target !== document.activeElement) {
          e.preventDefault();
        }
        emit2("click:control", e);
      }
      useRender(() => {
        var _slots$prependInner, _slots$default, _slots$appendInner;
        const isOutlined = props.variant === "outlined";
        const hasPrepend = slots["prepend-inner"] || props.prependInnerIcon;
        const hasClear = !!(props.clearable || slots.clear);
        const hasAppend = !!(slots["append-inner"] || props.appendInnerIcon || hasClear);
        const label = slots.label ? slots.label({
          label: props.label,
          props: {
            for: id.value
          }
        }) : props.label;
        return createVNode("div", mergeProps({
          "class": ["v-field", {
            "v-field--active": isActive.value,
            "v-field--appended": hasAppend,
            "v-field--disabled": props.disabled,
            "v-field--dirty": props.dirty,
            "v-field--error": props.error,
            "v-field--has-background": !!props.bgColor,
            "v-field--persistent-clear": props.persistentClear,
            "v-field--prepended": hasPrepend,
            "v-field--reverse": props.reverse,
            "v-field--single-line": props.singleLine,
            "v-field--no-label": !label,
            [`v-field--variant-${props.variant}`]: true
          }, themeClasses.value, backgroundColorClasses.value, focusClasses.value, loaderClasses.value],
          "style": [backgroundColorStyles.value, textColorStyles.value],
          "onClick": onClick
        }, attrs), [createVNode("div", {
          "class": "v-field__overlay"
        }, null), createVNode(LoaderSlot, {
          "name": "v-field",
          "active": props.loading,
          "color": props.error ? "error" : props.color
        }, {
          default: slots.loader
        }), hasPrepend && createVNode("div", {
          "key": "prepend",
          "class": "v-field__prepend-inner"
        }, [props.prependInnerIcon && createVNode(InputIcon, {
          "key": "prepend-icon",
          "name": "prependInner"
        }, null), (_slots$prependInner = slots["prepend-inner"]) == null ? void 0 : _slots$prependInner.call(slots, slotProps.value)]), createVNode("div", {
          "class": "v-field__field",
          "data-no-activator": ""
        }, [["solo", "filled"].includes(props.variant) && hasLabel.value && createVNode(VFieldLabel, {
          "key": "floating-label",
          "ref": floatingLabelRef,
          "class": [textColorClasses.value],
          "floating": true,
          "for": id.value
        }, {
          default: () => [label]
        }), createVNode(VFieldLabel, {
          "ref": labelRef,
          "for": id.value
        }, {
          default: () => [label]
        }), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
          ...slotProps.value,
          props: {
            id: id.value,
            class: "v-field__input"
          },
          focus,
          blur
        })]), hasClear && createVNode(VExpandXTransition, {
          "key": "clear"
        }, {
          default: () => [withDirectives(createVNode("div", {
            "class": "v-field__clearable"
          }, [slots.clear ? slots.clear() : createVNode(InputIcon, {
            "name": "clear"
          }, null)]), [[vShow, props.dirty]])]
        }), hasAppend && createVNode("div", {
          "key": "append",
          "class": "v-field__append-inner"
        }, [(_slots$appendInner = slots["append-inner"]) == null ? void 0 : _slots$appendInner.call(slots, slotProps.value), props.appendInnerIcon && createVNode(InputIcon, {
          "key": "append-icon",
          "name": "appendInner"
        }, null)]), createVNode("div", {
          "class": ["v-field__outline", textColorClasses.value]
        }, [isOutlined && createVNode(Fragment, null, [createVNode("div", {
          "class": "v-field__outline__start"
        }, null), hasLabel.value && createVNode("div", {
          "class": "v-field__outline__notch"
        }, [createVNode(VFieldLabel, {
          "ref": floatingLabelRef,
          "floating": true,
          "for": id.value
        }, {
          default: () => [label]
        })]), createVNode("div", {
          "class": "v-field__outline__end"
        }, null)]), ["plain", "underlined"].includes(props.variant) && hasLabel.value && createVNode(VFieldLabel, {
          "ref": floatingLabelRef,
          "floating": true,
          "for": id.value
        }, {
          default: () => [label]
        })])]);
      });
      return {
        controlRef
      };
    }
  });
  function filterFieldProps(attrs) {
    const keys2 = Object.keys(VField.props).filter((k) => !isOn2(k));
    return pick(attrs, keys2);
  }

  // node_modules/vuetify/lib/components/VCounter/VCounter.mjs
  var VCounter = defineComponent2({
    name: "VCounter",
    functional: true,
    props: {
      active: Boolean,
      max: [Number, String],
      value: {
        type: [Number, String],
        default: 0
      },
      ...makeTransitionProps({
        transition: {
          component: VSlideYTransition
        }
      })
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const counter = computed2(() => {
        return props.max ? `${props.value} / ${props.max}` : String(props.value);
      });
      useRender(() => createVNode(MaybeTransition, {
        "transition": props.transition
      }, {
        default: () => [withDirectives(createVNode("div", {
          "class": "v-counter"
        }, [slots.default ? slots.default({
          counter: counter.value,
          max: props.max,
          value: props.value
        }) : counter.value]), [[vShow, props.active]])]
      }));
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VTextField/VTextField.mjs
  var activeTypes = ["color", "file", "time", "date", "datetime-local", "week", "month"];
  var VTextField = genericComponent()({
    name: "VTextField",
    directives: {
      Intersect: intersect_default
    },
    inheritAttrs: false,
    props: {
      autofocus: Boolean,
      counter: [Boolean, Number, String],
      counterValue: Function,
      hint: String,
      persistentHint: Boolean,
      prefix: String,
      placeholder: String,
      persistentPlaceholder: Boolean,
      persistentCounter: Boolean,
      suffix: String,
      type: {
        type: String,
        default: "text"
      },
      ...makeVInputProps(),
      ...makeVFieldProps()
    },
    emits: {
      "click:control": (e) => true,
      "click:input": (e) => true,
      "update:modelValue": (val) => true
    },
    setup(props, _ref) {
      let {
        attrs,
        emit: emit2,
        slots
      } = _ref;
      const model = useProxiedModel(props, "modelValue");
      const counterValue = computed2(() => {
        return typeof props.counterValue === "function" ? props.counterValue(model.value) : (model.value ?? "").toString().length;
      });
      const max = computed2(() => {
        if (attrs.maxlength)
          return attrs.maxlength;
        if (!props.counter || typeof props.counter !== "number" && typeof props.counter !== "string")
          return void 0;
        return props.counter;
      });
      function onIntersect(isIntersecting, entries) {
        var _entries$0$target, _entries$0$target$foc;
        if (!props.autofocus || !isIntersecting)
          return;
        (_entries$0$target = entries[0].target) == null ? void 0 : (_entries$0$target$foc = _entries$0$target.focus) == null ? void 0 : _entries$0$target$foc.call(_entries$0$target);
      }
      const vInputRef = ref();
      const vFieldRef = ref();
      const isFocused = ref(false);
      const inputRef = ref();
      const isActive = computed2(() => activeTypes.includes(props.type) || props.persistentPlaceholder || isFocused.value);
      const messages = computed2(() => {
        return props.messages.length ? props.messages : isFocused.value || props.persistentHint ? props.hint : "";
      });
      function onFocus() {
        if (inputRef.value !== document.activeElement) {
          var _inputRef$value;
          (_inputRef$value = inputRef.value) == null ? void 0 : _inputRef$value.focus();
        }
        if (!isFocused.value)
          isFocused.value = true;
      }
      function onControlClick(e) {
        onFocus();
        emit2("click:control", e);
      }
      function onClear(e) {
        e.stopPropagation();
        onFocus();
        nextTick(() => {
          model.value = "";
          callEvent(props["onClick:clear"], e);
        });
      }
      useRender(() => {
        const hasCounter = !!(slots.counter || props.counter || props.counterValue);
        const hasDetails = !!(hasCounter || slots.details);
        const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
        const [{
          modelValue: _,
          ...inputProps
        }] = filterInputProps(props);
        const [fieldProps] = filterFieldProps(props);
        return createVNode(VInput, mergeProps({
          "ref": vInputRef,
          "modelValue": model.value,
          "onUpdate:modelValue": ($event) => model.value = $event,
          "class": ["v-text-field", {
            "v-text-field--prefixed": props.prefix,
            "v-text-field--suffixed": props.suffix,
            "v-text-field--flush-details": ["plain", "underlined"].includes(props.variant)
          }],
          "onClick:prepend": props["onClick:prepend"],
          "onClick:append": props["onClick:append"]
        }, rootAttrs, inputProps, {
          "messages": messages.value
        }), {
          ...slots,
          default: (_ref2) => {
            let {
              id,
              isDisabled,
              isDirty,
              isReadonly: isReadonly2,
              isValid
            } = _ref2;
            return createVNode(VField, mergeProps({
              "ref": vFieldRef,
              "onMousedown": (e) => {
                if (e.target === inputRef.value)
                  return;
                e.preventDefault();
              },
              "onClick:control": onControlClick,
              "onClick:clear": onClear,
              "onClick:prependInner": props["onClick:prependInner"],
              "onClick:appendInner": props["onClick:appendInner"],
              "role": "textbox"
            }, fieldProps, {
              "id": id.value,
              "active": isActive.value || isDirty.value,
              "dirty": isDirty.value || props.dirty,
              "focused": isFocused.value,
              "error": isValid.value === false
            }), {
              ...slots,
              default: (_ref3) => {
                let {
                  props: {
                    class: fieldClass,
                    ...slotProps
                  }
                } = _ref3;
                const inputNode = withDirectives(createVNode("input", mergeProps({
                  "ref": inputRef,
                  "onUpdate:modelValue": ($event) => model.value = $event,
                  "autofocus": props.autofocus,
                  "readonly": isReadonly2.value,
                  "disabled": isDisabled.value,
                  "name": props.name,
                  "placeholder": props.placeholder,
                  "size": 1,
                  "type": props.type,
                  "onFocus": onFocus,
                  "onBlur": () => isFocused.value = false
                }, slotProps, inputAttrs), null), [[vModelDynamic, model.value], [resolveDirective("intersect"), {
                  handler: onIntersect
                }, null, {
                  once: true
                }]]);
                return createVNode(Fragment, null, [props.prefix && createVNode("span", {
                  "class": "v-text-field__prefix"
                }, [props.prefix]), slots.default ? createVNode("div", {
                  "class": fieldClass,
                  "onClick": (e) => emit2("click:input", e),
                  "data-no-activator": ""
                }, [slots.default(), inputNode]) : cloneVNode(inputNode, {
                  class: fieldClass
                }), props.suffix && createVNode("span", {
                  "class": "v-text-field__suffix"
                }, [props.suffix])]);
              }
            });
          },
          details: hasDetails ? (slotProps) => {
            var _slots$details;
            return createVNode(Fragment, null, [(_slots$details = slots.details) == null ? void 0 : _slots$details.call(slots, slotProps), hasCounter && createVNode(Fragment, null, [createVNode("span", null, null), createVNode(VCounter, {
              "active": props.persistentCounter || isFocused.value,
              "value": counterValue.value,
              "max": max.value
            }, slots.counter)])]);
          } : void 0
        });
      });
      return forwardRefs({}, vInputRef, vFieldRef, inputRef);
    }
  });

  // node_modules/vuetify/lib/components/VSelect/VSelect.mjs
  var makeSelectProps = propsFactory({
    chips: Boolean,
    closableChips: Boolean,
    eager: Boolean,
    hideNoData: Boolean,
    hideSelected: Boolean,
    menu: Boolean,
    menuIcon: {
      type: IconValue,
      default: "$dropdown"
    },
    menuProps: {
      type: Object
    },
    modelValue: {
      type: null,
      default: () => []
    },
    multiple: Boolean,
    noDataText: {
      type: String,
      default: "$vuetify.noDataText"
    },
    openOnClear: Boolean,
    readonly: Boolean,
    ...makeItemsProps({
      itemChildren: false
    })
  }, "select");
  var VSelect = genericComponent()({
    name: "VSelect",
    props: {
      ...makeSelectProps(),
      ...makeTransitionProps({
        transition: {
          component: VDialogTransition
        }
      })
    },
    emits: {
      "update:modelValue": (val) => true,
      "update:menu": (val) => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        t
      } = useLocale();
      const vTextFieldRef = ref();
      const menu = useProxiedModel(props, "menu");
      const {
        items,
        transformIn,
        transformOut
      } = useItems(props);
      const model = useProxiedModel(props, "modelValue", [], (v) => transformIn(wrapInArray(v)), (v) => {
        const transformed = transformOut(v);
        return props.multiple ? transformed : transformed[0] ?? null;
      });
      const selections = computed2(() => {
        return model.value.map((v) => {
          return items.value.find((item) => item.value === v.value) || v;
        });
      });
      const selected = computed2(() => selections.value.map((selection) => selection.props.value));
      function onClear(e) {
        model.value = [];
        if (props.openOnClear) {
          menu.value = true;
        }
      }
      function onClickControl() {
        if (props.hideNoData && !items.value.length || props.readonly)
          return;
        menu.value = !menu.value;
      }
      function onKeydown(e) {
        if (props.readonly)
          return;
        if (["Enter", "ArrowDown", " "].includes(e.key)) {
          menu.value = true;
        }
        if (["Escape", "Tab"].includes(e.key)) {
          menu.value = false;
        }
      }
      function select(item) {
        if (props.multiple) {
          const index = selected.value.findIndex((selection) => selection === item.value);
          if (index === -1) {
            model.value = [...model.value, item];
          } else {
            const value = [...model.value];
            value.splice(index, 1);
            model.value = value;
          }
        } else {
          model.value = [item];
          menu.value = false;
        }
      }
      useRender(() => {
        const hasChips = !!(props.chips || slots.chip);
        return createVNode(VTextField, {
          "ref": vTextFieldRef,
          "modelValue": model.value.map((v) => v.props.value).join(", "),
          "onUpdate:modelValue": (v) => {
            if (v == null)
              model.value = [];
          },
          "validationValue": model.externalValue,
          "dirty": model.value.length > 0,
          "class": ["v-select", {
            "v-select--active-menu": menu.value,
            "v-select--chips": !!props.chips,
            [`v-select--${props.multiple ? "multiple" : "single"}`]: true,
            "v-select--selected": model.value.length
          }],
          "appendInnerIcon": props.menuIcon,
          "readonly": true,
          "onClick:clear": onClear,
          "onClick:control": onClickControl,
          "onBlur": () => menu.value = false,
          "onKeydown": onKeydown
        }, {
          ...slots,
          default: () => {
            var _slots$noData, _slots$prependItem, _slots$appendItem;
            return createVNode(Fragment, null, [createVNode(VMenu, mergeProps({
              "modelValue": menu.value,
              "onUpdate:modelValue": ($event) => menu.value = $event,
              "activator": "parent",
              "contentClass": "v-select__content",
              "eager": props.eager,
              "openOnClick": false,
              "closeOnContentClick": false,
              "transition": props.transition
            }, props.menuProps), {
              default: () => [createVNode(VList, {
                "selected": selected.value,
                "selectStrategy": props.multiple ? "independent" : "single-independent",
                "onMousedown": (e) => e.preventDefault()
              }, {
                default: () => [!items.value.length && !props.hideNoData && (((_slots$noData = slots["no-data"]) == null ? void 0 : _slots$noData.call(slots)) ?? createVNode(VListItem, {
                  "title": t(props.noDataText)
                }, null)), (_slots$prependItem = slots["prepend-item"]) == null ? void 0 : _slots$prependItem.call(slots), items.value.map((item, index) => {
                  var _slots$item;
                  return ((_slots$item = slots.item) == null ? void 0 : _slots$item.call(slots, {
                    item,
                    index,
                    props: mergeProps(item.props, {
                      onClick: () => select(item)
                    })
                  })) ?? createVNode(VListItem, mergeProps({
                    "key": index
                  }, item.props, {
                    "onClick": () => select(item)
                  }), {
                    prepend: (_ref2) => {
                      let {
                        isSelected
                      } = _ref2;
                      return props.multiple && !props.hideSelected ? createVNode(VCheckboxBtn, {
                        "modelValue": isSelected,
                        "ripple": false
                      }, null) : void 0;
                    }
                  });
                }), (_slots$appendItem = slots["append-item"]) == null ? void 0 : _slots$appendItem.call(slots)]
              })]
            }), selections.value.map((item, index) => {
              function onChipClose(e) {
                e.stopPropagation();
                e.preventDefault();
                select(item);
              }
              const slotProps = {
                "onClick:close": onChipClose,
                modelValue: true
              };
              return createVNode("div", {
                "key": index,
                "class": "v-select__selection"
              }, [hasChips ? createVNode(VDefaultsProvider, {
                "defaults": {
                  VChip: {
                    closable: props.closableChips,
                    size: "small",
                    text: item.title
                  }
                }
              }, {
                default: () => [slots.chip ? slots.chip({
                  item,
                  index,
                  props: slotProps
                }) : createVNode(VChip, slotProps, null)]
              }) : slots.selection ? slots.selection({
                item,
                index
              }) : createVNode("span", {
                "class": "v-select__selection-text"
              }, [item.title, props.multiple && index < selections.value.length - 1 && createVNode("span", {
                "class": "v-select__selection-comma"
              }, [createTextVNode(",")])])]);
            })]);
          }
        });
      });
      return forwardRefs({
        menu,
        select
      }, vTextFieldRef);
    }
  });

  // node_modules/vuetify/lib/composables/filter.mjs
  var defaultFilter = (value, query, item) => {
    if (value == null || query == null)
      return -1;
    return value.toString().toLocaleLowerCase().indexOf(query.toString().toLocaleLowerCase());
  };
  var makeFilterProps = propsFactory({
    customFilter: Function,
    customKeyFilter: Object,
    filterKeys: [Array, String],
    filterMode: {
      type: String,
      default: "intersection"
    },
    noFilter: Boolean
  }, "filter");
  function filterItems(items, query, options) {
    const array = [];
    const filter = (options == null ? void 0 : options.default) ?? defaultFilter;
    const keys2 = options != null && options.filterKeys ? wrapInArray(options.filterKeys) : false;
    const customFiltersLength = Object.keys((options == null ? void 0 : options.customKeyFilter) ?? {}).length;
    if (!(items != null && items.length))
      return array;
    loop:
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const customMatches = {};
        const defaultMatches = {};
        let match = -1;
        if (query && !(options != null && options.noFilter)) {
          if (typeof item === "object") {
            const filterKeys = keys2 || Object.keys(item);
            for (const key of filterKeys) {
              var _options$customKeyFil;
              const value = getPropertyFromItem(item, key, item);
              const keyFilter = options == null ? void 0 : (_options$customKeyFil = options.customKeyFilter) == null ? void 0 : _options$customKeyFil[key];
              match = keyFilter ? keyFilter(value, query, item) : filter(value, query, item);
              if (match !== -1 && match !== false) {
                if (keyFilter)
                  customMatches[key] = match;
                else
                  defaultMatches[key] = match;
              } else if ((options == null ? void 0 : options.filterMode) === "every") {
                continue loop;
              }
            }
          } else {
            match = filter(item, query, item);
            if (match !== -1 && match !== false) {
              defaultMatches.title = match;
            }
          }
          const defaultMatchesLength = Object.keys(defaultMatches).length;
          const customMatchesLength = Object.keys(customMatches).length;
          if (!defaultMatchesLength && !customMatchesLength)
            continue;
          if ((options == null ? void 0 : options.filterMode) === "union" && customMatchesLength !== customFiltersLength && !defaultMatchesLength)
            continue;
          if ((options == null ? void 0 : options.filterMode) === "intersection" && (customMatchesLength !== customFiltersLength || !defaultMatchesLength))
            continue;
        }
        array.push({
          index: i,
          matches: {
            ...defaultMatches,
            ...customMatches
          }
        });
      }
    return array;
  }
  function useFilter(props, items, query) {
    const strQuery = computed2(() => typeof (query == null ? void 0 : query.value) !== "string" && typeof (query == null ? void 0 : query.value) !== "number" ? "" : String(query.value));
    const filteredItems = computed2(() => {
      const transformedItems = unref(items);
      const matches = filterItems(transformedItems, strQuery.value, {
        customKeyFilter: props.customKeyFilter,
        default: props.customFilter,
        filterKeys: props.filterKeys,
        filterMode: props.filterMode,
        noFilter: props.noFilter
      });
      return matches.map((_ref) => {
        let {
          index,
          matches: matches2
        } = _ref;
        return {
          item: transformedItems[index],
          matches: matches2
        };
      });
    });
    return {
      filteredItems
    };
  }

  // node_modules/vuetify/lib/components/VAutocomplete/VAutocomplete.mjs
  function highlightResult(text, matches, length) {
    if (Array.isArray(matches))
      throw new Error("Multiple matches is not implemented");
    return typeof matches === "number" && ~matches ? createVNode(Fragment, null, [createVNode("span", {
      "class": "v-autocomplete__unmask"
    }, [text.substr(0, matches)]), createVNode("span", {
      "class": "v-autocomplete__mask"
    }, [text.substr(matches, length)]), createVNode("span", {
      "class": "v-autocomplete__unmask"
    }, [text.substr(matches + length)])]) : text;
  }
  var VAutocomplete = genericComponent()({
    name: "VAutocomplete",
    props: {
      search: String,
      ...makeFilterProps({
        filterKeys: ["title"]
      }),
      ...makeSelectProps(),
      ...makeTransitionProps({
        transition: false
      })
    },
    emits: {
      "update:search": (val) => true,
      "update:modelValue": (val) => true,
      "update:menu": (val) => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        t
      } = useLocale();
      const vTextFieldRef = ref();
      const isFocused = ref(false);
      const isPristine = ref(true);
      const menu = useProxiedModel(props, "menu");
      const {
        items,
        transformIn,
        transformOut
      } = useItems(props);
      const search = useProxiedModel(props, "search", "");
      const model = useProxiedModel(props, "modelValue", [], (v) => transformIn(wrapInArray(v)), (v) => {
        const transformed = transformOut(v);
        return props.multiple ? transformed : transformed[0] ?? null;
      });
      const {
        filteredItems
      } = useFilter(props, items, computed2(() => isPristine.value ? void 0 : search.value));
      const selections = computed2(() => {
        return model.value.map((v) => {
          return items.value.find((item) => item.value === v.value) || v;
        });
      });
      const selected = computed2(() => selections.value.map((selection) => selection.props.value));
      function onClear(e) {
        model.value = [];
        if (props.openOnClear) {
          menu.value = true;
        }
        search.value = "";
      }
      function onClickControl() {
        if (props.hideNoData && !items.value.length || props.readonly)
          return;
        menu.value = true;
      }
      function onKeydown(e) {
        if (props.readonly)
          return;
        if (["Enter", "ArrowDown"].includes(e.key)) {
          menu.value = true;
        }
        if (["Escape"].includes(e.key)) {
          menu.value = false;
        }
        if (["Enter", "Escape", "Tab"].includes(e.key)) {
          isPristine.value = true;
        }
      }
      function onInput(e) {
        search.value = e.target.value;
      }
      function onAfterLeave() {
        if (isFocused.value)
          isPristine.value = true;
      }
      const isSelecting = ref(false);
      function select(item) {
        if (props.multiple) {
          const index = selected.value.findIndex((selection) => selection === item.value);
          if (index === -1) {
            model.value = [...model.value, item];
            search.value = "";
          } else {
            const value = [...model.value];
            value.splice(index, 1);
            model.value = value;
          }
        } else {
          model.value = [item];
          isSelecting.value = true;
          search.value = item.title;
          menu.value = false;
          isPristine.value = true;
          nextTick(() => isSelecting.value = false);
        }
      }
      watch(isFocused, (val) => {
        if (val) {
          var _selections$value$at;
          isSelecting.value = true;
          search.value = props.multiple ? "" : String(((_selections$value$at = selections.value.at(-1)) == null ? void 0 : _selections$value$at.props.title) ?? "");
          isPristine.value = true;
          nextTick(() => isSelecting.value = false);
        } else {
          menu.value = false;
          search.value = "";
        }
      });
      watch(search, (val) => {
        if (!isFocused.value || isSelecting.value)
          return;
        if (val)
          menu.value = true;
        isPristine.value = !val;
      });
      useRender(() => {
        const hasChips = !!(props.chips || slots.chip);
        return createVNode(VTextField, {
          "ref": vTextFieldRef,
          "modelValue": search.value,
          "onUpdate:modelValue": (v) => {
            if (v == null)
              model.value = [];
          },
          "validationValue": model.externalValue,
          "dirty": model.value.length > 0,
          "onInput": onInput,
          "class": ["v-autocomplete", {
            "v-autocomplete--active-menu": menu.value,
            "v-autocomplete--chips": !!props.chips,
            [`v-autocomplete--${props.multiple ? "multiple" : "single"}`]: true
          }],
          "appendInnerIcon": props.menuIcon,
          "readonly": props.readonly,
          "onClick:clear": onClear,
          "onClick:control": onClickControl,
          "onClick:input": onClickControl,
          "onFocus": () => isFocused.value = true,
          "onBlur": () => isFocused.value = false,
          "onKeydown": onKeydown
        }, {
          ...slots,
          default: () => {
            var _slots$noData;
            return createVNode(Fragment, null, [createVNode(VMenu, mergeProps({
              "modelValue": menu.value,
              "onUpdate:modelValue": ($event) => menu.value = $event,
              "activator": "parent",
              "contentClass": "v-autocomplete__content",
              "eager": props.eager,
              "openOnClick": false,
              "closeOnContentClick": false,
              "transition": props.transition,
              "onAfterLeave": onAfterLeave
            }, props.menuProps), {
              default: () => [createVNode(VList, {
                "selected": selected.value,
                "selectStrategy": props.multiple ? "independent" : "single-independent",
                "onMousedown": (e) => e.preventDefault()
              }, {
                default: () => [!filteredItems.value.length && !props.hideNoData && (((_slots$noData = slots["no-data"]) == null ? void 0 : _slots$noData.call(slots)) ?? createVNode(VListItem, {
                  "title": t(props.noDataText)
                }, null)), filteredItems.value.map((_ref2, index) => {
                  var _slots$item;
                  let {
                    item,
                    matches
                  } = _ref2;
                  return ((_slots$item = slots.item) == null ? void 0 : _slots$item.call(slots, {
                    item,
                    index,
                    props: mergeProps(item.props, {
                      onClick: () => select(item)
                    })
                  })) ?? createVNode(VListItem, mergeProps({
                    "key": index
                  }, item.props, {
                    "onClick": () => select(item)
                  }), {
                    prepend: (_ref3) => {
                      let {
                        isSelected
                      } = _ref3;
                      return props.multiple && !props.hideSelected ? createVNode(VCheckboxBtn, {
                        "modelValue": isSelected,
                        "ripple": false
                      }, null) : void 0;
                    },
                    title: () => {
                      var _search$value;
                      return isPristine.value ? item.title : highlightResult(item.title, matches.title, ((_search$value = search.value) == null ? void 0 : _search$value.length) ?? 0);
                    }
                  });
                })]
              })]
            }), selections.value.map((item, index) => {
              function onChipClose(e) {
                e.stopPropagation();
                e.preventDefault();
                select(item);
              }
              const slotProps = {
                "onClick:close": onChipClose,
                modelValue: true
              };
              return createVNode("div", {
                "key": index,
                "class": "v-autocomplete__selection"
              }, [hasChips ? createVNode(VDefaultsProvider, {
                "defaults": {
                  VChip: {
                    closable: props.closableChips,
                    size: "small",
                    text: item.title
                  }
                }
              }, {
                default: () => [slots.chip ? slots.chip({
                  item,
                  index,
                  props: slotProps
                }) : createVNode(VChip, slotProps, null)]
              }) : slots.selection ? slots.selection({
                item,
                index
              }) : createVNode("span", {
                "class": "v-autocomplete__selection-text"
              }, [item.title, props.multiple && index < selections.value.length - 1 && createVNode("span", {
                "class": "v-autocomplete__selection-comma"
              }, [createTextVNode(",")])])]);
            })]);
          }
        });
      });
      return forwardRefs({
        isFocused,
        isPristine,
        menu,
        search,
        filteredItems,
        select
      }, vTextFieldRef);
    }
  });

  // node_modules/vuetify/lib/components/VBadge/VBadge.mjs
  var VBadge = defineComponent2({
    name: "VBadge",
    inheritAttrs: false,
    props: {
      bordered: Boolean,
      color: String,
      content: [Number, String],
      dot: Boolean,
      floating: Boolean,
      icon: IconValue,
      inline: Boolean,
      label: {
        type: String,
        default: "$vuetify.badge"
      },
      max: [Number, String],
      modelValue: {
        type: Boolean,
        default: true
      },
      offsetX: [Number, String],
      offsetY: [Number, String],
      textColor: String,
      ...makeLocationProps({
        location: "top end"
      }),
      ...makeRoundedProps(),
      ...makeTagProps(),
      ...makeThemeProps(),
      ...makeTransitionProps({
        transition: "scale-rotate-transition"
      })
    },
    setup(props, ctx) {
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(toRef(props, "color"));
      const {
        roundedClasses
      } = useRounded(props);
      const {
        t
      } = useLocale();
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(toRef(props, "textColor"));
      const {
        themeClasses
      } = useTheme();
      const {
        locationStyles
      } = useLocation(props, true, (side) => {
        const base = props.floating ? props.dot ? 2 : 4 : props.dot ? 8 : 12;
        return base + (["top", "bottom"].includes(side) ? +(props.offsetY ?? 0) : ["left", "right"].includes(side) ? +(props.offsetX ?? 0) : 0);
      });
      useRender(() => {
        var _ctx$slots$default, _ctx$slots, _ctx$slots$badge, _ctx$slots2;
        const value = Number(props.content);
        const content = !props.max || isNaN(value) ? props.content : value <= props.max ? value : `${props.max}+`;
        const [badgeAttrs, attrs] = pick(ctx.attrs, ["aria-atomic", "aria-label", "aria-live", "role", "title"]);
        return createVNode(props.tag, mergeProps({
          "class": ["v-badge", {
            "v-badge--bordered": props.bordered,
            "v-badge--dot": props.dot,
            "v-badge--floating": props.floating,
            "v-badge--inline": props.inline
          }]
        }, attrs), {
          default: () => [createVNode("div", {
            "class": "v-badge__wrapper"
          }, [(_ctx$slots$default = (_ctx$slots = ctx.slots).default) == null ? void 0 : _ctx$slots$default.call(_ctx$slots), createVNode(MaybeTransition, {
            "transition": props.transition
          }, {
            default: () => [withDirectives(createVNode("span", mergeProps({
              "class": ["v-badge__badge", themeClasses.value, backgroundColorClasses.value, roundedClasses.value, textColorClasses.value],
              "style": [backgroundColorStyles.value, textColorStyles.value, props.inline ? {} : locationStyles.value],
              "aria-atomic": "true",
              "aria-label": t(props.label, value),
              "aria-live": "polite",
              "role": "status"
            }, badgeAttrs), [props.dot ? void 0 : ctx.slots.badge ? (_ctx$slots$badge = (_ctx$slots2 = ctx.slots).badge) == null ? void 0 : _ctx$slots$badge.call(_ctx$slots2) : props.icon ? createVNode(VIcon, {
              "icon": props.icon
            }, null) : content]), [[vShow, props.modelValue]])]
          })])]
        });
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VBanner/VBannerActions.mjs
  var VBannerActions = defineComponent2({
    name: "VBannerActions",
    props: {
      color: String,
      density: String
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      provideDefaults({
        VBtn: {
          color: props.color,
          density: props.density,
          variant: "text"
        }
      });
      useRender(() => {
        var _slots$default;
        return createVNode("div", {
          "class": "v-banner-actions"
        }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]);
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VBanner/VBannerText.mjs
  var VBannerText = createSimpleFunctional("v-banner-text");

  // node_modules/vuetify/lib/components/VBanner/VBanner.mjs
  var VBanner = defineComponent2({
    name: "VBanner",
    props: {
      avatar: String,
      color: String,
      icon: IconValue,
      lines: String,
      stacked: Boolean,
      sticky: Boolean,
      text: String,
      ...makeBorderProps(),
      ...makeDensityProps(),
      ...makeDimensionProps(),
      ...makeElevationProps(),
      ...makeLocationProps(),
      ...makePositionProps(),
      ...makeRoundedProps(),
      ...makeTagProps(),
      ...makeThemeProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        borderClasses
      } = useBorder(props);
      const {
        densityClasses
      } = useDensity(props);
      const {
        mobile
      } = useDisplay();
      const {
        dimensionStyles
      } = useDimension(props);
      const {
        elevationClasses
      } = useElevation(props);
      const {
        locationStyles
      } = useLocation(props);
      const {
        positionClasses
      } = usePosition(props);
      const {
        roundedClasses
      } = useRounded(props);
      const {
        themeClasses
      } = provideTheme(props);
      const color = toRef(props, "color");
      const density = toRef(props, "density");
      provideDefaults({
        VBannerActions: {
          color,
          density
        }
      });
      useRender(() => {
        var _slots$default;
        const hasText = !!(props.text || slots.text);
        const hasPrepend = !!(slots.prepend || props.avatar || props.icon);
        return createVNode(props.tag, {
          "class": ["v-banner", {
            "v-banner--stacked": props.stacked || mobile.value,
            "v-banner--sticky": props.sticky,
            [`v-banner--${props.lines}-line`]: !!props.lines
          }, borderClasses.value, densityClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, themeClasses.value],
          "style": [dimensionStyles.value, locationStyles.value],
          "role": "banner"
        }, {
          default: () => [hasPrepend && createVNode(VDefaultsProvider, {
            "key": "prepend",
            "defaults": {
              VAvatar: {
                color: color.value,
                density: density.value,
                icon: props.icon,
                image: props.avatar
              }
            }
          }, {
            default: () => [createVNode("div", {
              "class": "v-banner__prepend"
            }, [slots.prepend ? slots.prepend() : (props.avatar || props.icon) && createVNode(VAvatar, null, null)])]
          }), createVNode("div", {
            "class": "v-banner__content"
          }, [hasText && createVNode(VBannerText, {
            "key": "text"
          }, {
            default: () => [slots.text ? slots.text() : props.text]
          }), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]), slots.actions && createVNode(VBannerActions, null, {
            default: () => [slots.actions()]
          })]
        });
      });
    }
  });

  // node_modules/vuetify/lib/components/VBottomNavigation/VBottomNavigation.mjs
  var VBottomNavigation = defineComponent2({
    name: "VBottomNavigation",
    props: {
      bgColor: String,
      color: String,
      grow: Boolean,
      mode: {
        type: String,
        validator: (v) => !v || ["horizontal", "shift"].includes(v)
      },
      height: {
        type: [Number, String],
        default: 56
      },
      ...makeBorderProps(),
      ...makeDensityProps(),
      ...makeElevationProps(),
      ...makeRoundedProps(),
      ...makeLayoutItemProps({
        name: "bottom-navigation"
      }),
      ...makeTagProps({
        tag: "header"
      }),
      ...makeGroupProps({
        modelValue: true,
        selectedClass: "v-btn--selected"
      }),
      ...makeThemeProps()
    },
    emits: {
      "update:modelValue": (value) => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        themeClasses
      } = useTheme();
      const {
        borderClasses
      } = useBorder(props);
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(toRef(props, "bgColor"));
      const {
        densityClasses
      } = useDensity(props);
      const {
        elevationClasses
      } = useElevation(props);
      const {
        roundedClasses
      } = useRounded(props);
      const height = computed2(() => Number(props.height) - (props.density === "comfortable" ? 8 : 0) - (props.density === "compact" ? 16 : 0));
      const isActive = useProxiedModel(props, "modelValue", props.modelValue);
      const {
        layoutItemStyles
      } = useLayoutItem({
        id: props.name,
        order: computed2(() => parseInt(props.order, 10)),
        position: computed2(() => "bottom"),
        layoutSize: computed2(() => isActive.value ? height.value : 0),
        elementSize: height,
        active: isActive,
        absolute: toRef(props, "absolute")
      });
      useGroup(props, VBtnToggleSymbol);
      provideDefaults({
        VBtn: {
          color: toRef(props, "color"),
          density: toRef(props, "density"),
          stacked: computed2(() => props.mode !== "horizontal"),
          variant: "text"
        }
      }, {
        scoped: true
      });
      useRender(() => {
        return createVNode(props.tag, {
          "class": ["v-bottom-navigation", {
            "v-bottom-navigation--active": isActive.value,
            "v-bottom-navigation--grow": props.grow,
            "v-bottom-navigation--shift": props.mode === "shift"
          }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value],
          "style": [backgroundColorStyles.value, layoutItemStyles.value, {
            height: convertToUnit(height.value),
            transform: `translateY(${convertToUnit(!isActive.value ? 100 : 0, "%")})`
          }]
        }, {
          default: () => [slots.default && createVNode("div", {
            "class": "v-bottom-navigation__content"
          }, [slots.default()])]
        });
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VBreadcrumbs/VBreadcrumbsDivider.mjs
  var VBreadcrumbsDivider = createSimpleFunctional("v-breadcrumbs-divider", "li");

  // node_modules/vuetify/lib/components/VBreadcrumbs/VBreadcrumbsItem.mjs
  var VBreadcrumbsItem = defineComponent2({
    name: "VBreadcrumbsItem",
    props: {
      active: Boolean,
      activeClass: String,
      activeColor: String,
      color: String,
      disabled: Boolean,
      title: String,
      ...makeRouterProps(),
      ...makeTagProps({
        tag: "li"
      })
    },
    setup(props, _ref) {
      let {
        slots,
        attrs
      } = _ref;
      const link = useLink(props, attrs);
      const isActive = computed2(() => {
        var _link$isActive;
        return props.active || ((_link$isActive = link.isActive) == null ? void 0 : _link$isActive.value);
      });
      const color = computed2(() => isActive.value ? props.activeColor : props.color);
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(color);
      useRender(() => {
        var _slots$default;
        const Tag = link.isLink.value ? "a" : props.tag;
        return createVNode(Tag, {
          "class": ["v-breadcrumbs-item", {
            "v-breadcrumbs-item--active": isActive.value,
            "v-breadcrumbs-item--disabled": props.disabled,
            "v-breadcrumbs-item--link": link.isLink.value,
            [`${props.activeClass}`]: isActive.value && props.activeClass
          }, textColorClasses.value],
          "style": [textColorStyles.value],
          "href": link.href.value,
          "aria-current": isActive.value ? "page" : void 0,
          "onClick": link.navigate
        }, {
          default: () => [((_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)) ?? props.title]
        });
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VBreadcrumbs/VBreadcrumbs.mjs
  var VBreadcrumbs = genericComponent()({
    name: "VBreadcrumbs",
    props: {
      activeClass: String,
      activeColor: String,
      bgColor: String,
      color: String,
      disabled: Boolean,
      divider: {
        type: String,
        default: "/"
      },
      icon: IconValue,
      items: {
        type: Array,
        default: () => []
      },
      ...makeDensityProps(),
      ...makeRoundedProps(),
      ...makeTagProps({
        tag: "ul"
      })
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(toRef(props, "bgColor"));
      const {
        densityClasses
      } = useDensity(props);
      const {
        roundedClasses
      } = useRounded(props);
      provideDefaults({
        VBreadcrumbsItem: {
          activeClass: toRef(props, "activeClass"),
          activeColor: toRef(props, "activeColor"),
          color: toRef(props, "color"),
          disabled: toRef(props, "disabled")
        }
      });
      useRender(() => {
        var _slots$default;
        const hasPrepend = !!(slots.prepend || props.icon);
        return createVNode(props.tag, {
          "class": ["v-breadcrumbs", backgroundColorClasses.value, densityClasses.value, roundedClasses.value],
          "style": backgroundColorStyles.value
        }, {
          default: () => [hasPrepend && createVNode(VDefaultsProvider, {
            "key": "prepend",
            "defaults": {
              VIcon: {
                icon: props.icon,
                start: true
              }
            }
          }, {
            default: () => [createVNode("div", {
              "class": "v-breadcrumbs__prepend"
            }, [slots.prepend ? slots.prepend() : props.icon && createVNode(VIcon, null, null)])]
          }), props.items.map((item, index, array) => {
            var _slots$divider;
            return createVNode(Fragment, null, [createVNode(VBreadcrumbsItem, mergeProps({
              "key": index,
              "disabled": index >= array.length - 1
            }, typeof item === "string" ? {
              title: item
            } : item), {
              default: slots.title ? () => {
                var _slots$title;
                return (_slots$title = slots.title) == null ? void 0 : _slots$title.call(slots, {
                  item,
                  index
                });
              } : void 0
            }), index < array.length - 1 && createVNode(VBreadcrumbsDivider, null, {
              default: () => [((_slots$divider = slots.divider) == null ? void 0 : _slots$divider.call(slots, {
                item,
                index
              })) ?? props.divider]
            })]);
          }), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]
        });
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VCard/VCardActions.mjs
  var VCardActions = defineComponent2({
    name: "VCardActions",
    setup(_, _ref) {
      let {
        slots
      } = _ref;
      provideDefaults({
        VBtn: {
          variant: "text"
        }
      });
      useRender(() => {
        var _slots$default;
        return createVNode("div", {
          "class": "v-card-actions"
        }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]);
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VCard/VCardSubtitle.mjs
  var VCardSubtitle = createSimpleFunctional("v-card-subtitle");

  // node_modules/vuetify/lib/components/VCard/VCardTitle.mjs
  var VCardTitle = createSimpleFunctional("v-card-title");

  // node_modules/vuetify/lib/components/VCard/VCardItem.mjs
  var VCardItem = defineComponent({
    name: "VCardItem",
    props: {
      appendAvatar: String,
      appendIcon: IconValue,
      prependAvatar: String,
      prependIcon: IconValue,
      subtitle: String,
      title: String,
      ...makeDensityProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      useRender(() => {
        var _slots$prepend, _slots$title, _slots$subtitle, _slots$default, _slots$append;
        const hasPrepend = !!(props.prependAvatar || props.prependIcon || slots.prepend);
        const hasAppend = !!(props.appendAvatar || props.appendIcon || slots.append);
        const hasTitle = !!(props.title || slots.title);
        const hasSubtitle = !!(props.subtitle || slots.subtitle);
        return createVNode("div", {
          "class": "v-card-item"
        }, [hasPrepend && createVNode(VDefaultsProvider, {
          "key": "prepend",
          "defaults": {
            VAvatar: {
              density: props.density,
              icon: props.prependIcon,
              image: props.prependAvatar
            },
            VIcon: {
              density: props.density,
              icon: props.prependIcon
            }
          }
        }, {
          default: () => [createVNode("div", {
            "class": "v-card-item__prepend"
          }, [((_slots$prepend = slots.prepend) == null ? void 0 : _slots$prepend.call(slots)) ?? createVNode(VAvatar, null, null)])]
        }), createVNode("div", {
          "class": "v-card-item__content"
        }, [hasTitle && createVNode(VCardTitle, {
          "key": "title"
        }, {
          default: () => [((_slots$title = slots.title) == null ? void 0 : _slots$title.call(slots)) ?? props.title]
        }), hasSubtitle && createVNode(VCardSubtitle, {
          "key": "subtitle"
        }, {
          default: () => [((_slots$subtitle = slots.subtitle) == null ? void 0 : _slots$subtitle.call(slots)) ?? props.subtitle]
        }), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]), hasAppend && createVNode(VDefaultsProvider, {
          "key": "append",
          "defaults": {
            VAvatar: {
              density: props.density,
              icon: props.appendIcon,
              image: props.appendAvatar
            },
            VIcon: {
              density: props.density,
              icon: props.appendIcon
            }
          }
        }, {
          default: () => [createVNode("div", {
            "class": "v-card-item__append"
          }, [((_slots$append = slots.append) == null ? void 0 : _slots$append.call(slots)) ?? createVNode(VAvatar, null, null)])]
        })]);
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VCard/VCardText.mjs
  var VCardText = createSimpleFunctional("v-card-text");

  // node_modules/vuetify/lib/components/VCard/VCard.mjs
  var VCard = defineComponent2({
    name: "VCard",
    directives: {
      Ripple
    },
    props: {
      appendAvatar: String,
      appendIcon: IconValue,
      disabled: Boolean,
      flat: Boolean,
      hover: Boolean,
      image: String,
      link: {
        type: Boolean,
        default: void 0
      },
      prependAvatar: String,
      prependIcon: IconValue,
      ripple: Boolean,
      subtitle: String,
      text: String,
      title: String,
      ...makeThemeProps(),
      ...makeBorderProps(),
      ...makeDensityProps(),
      ...makeDimensionProps(),
      ...makeElevationProps(),
      ...makeLoaderProps(),
      ...makeLocationProps(),
      ...makePositionProps(),
      ...makeRoundedProps(),
      ...makeRouterProps(),
      ...makeTagProps(),
      ...makeVariantProps({
        variant: "elevated"
      })
    },
    setup(props, _ref) {
      let {
        attrs,
        slots
      } = _ref;
      const {
        themeClasses
      } = provideTheme(props);
      const {
        borderClasses
      } = useBorder(props);
      const {
        colorClasses,
        colorStyles,
        variantClasses
      } = useVariant(props);
      const {
        densityClasses
      } = useDensity(props);
      const {
        dimensionStyles
      } = useDimension(props);
      const {
        elevationClasses
      } = useElevation(props);
      const {
        loaderClasses
      } = useLoader(props);
      const {
        locationStyles
      } = useLocation(props);
      const {
        positionClasses
      } = usePosition(props);
      const {
        roundedClasses
      } = useRounded(props);
      const link = useLink(props, attrs);
      const isLink = computed2(() => props.link !== false && link.isLink.value);
      const isClickable = computed2(() => !props.disabled && props.link !== false && (props.link || link.isClickable.value));
      useRender(() => {
        var _slots$image, _slots$text, _slots$default;
        const Tag = isLink.value ? "a" : props.tag;
        const hasTitle = !!(slots.title || props.title);
        const hasSubtitle = !!(slots.subtitle || props.subtitle);
        const hasHeader = hasTitle || hasSubtitle;
        const hasAppend = !!(slots.append || props.appendAvatar || props.appendIcon);
        const hasPrepend = !!(slots.prepend || props.prependAvatar || props.prependIcon);
        const hasImage = !!(slots.image || props.image);
        const hasCardItem = hasHeader || hasPrepend || hasAppend;
        const hasText = !!(slots.text || props.text);
        return withDirectives(createVNode(Tag, {
          "class": ["v-card", {
            "v-card--disabled": props.disabled,
            "v-card--flat": props.flat,
            "v-card--hover": props.hover && !(props.disabled || props.flat),
            "v-card--link": isClickable.value
          }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, loaderClasses.value, positionClasses.value, roundedClasses.value, variantClasses.value],
          "style": [colorStyles.value, dimensionStyles.value, locationStyles.value],
          "href": link.href.value,
          "onClick": isClickable.value && link.navigate
        }, {
          default: () => [hasImage && createVNode(VDefaultsProvider, {
            "key": "image",
            "defaults": {
              VImg: {
                cover: true,
                src: props.image
              }
            }
          }, {
            default: () => [createVNode("div", {
              "class": "v-card__image"
            }, [((_slots$image = slots.image) == null ? void 0 : _slots$image.call(slots)) ?? createVNode(VImg, null, null)])]
          }), createVNode(LoaderSlot, {
            "name": "v-card",
            "active": !!props.loading,
            "color": typeof props.loading === "boolean" ? void 0 : props.loading
          }, {
            default: slots.loader
          }), hasCardItem && createVNode(VCardItem, {
            "key": "item",
            "prependAvatar": props.prependAvatar,
            "prependIcon": props.prependIcon,
            "title": props.title,
            "subtitle": props.subtitle,
            "appendAvatar": props.appendAvatar,
            "appendIcon": props.appendIcon
          }, {
            default: slots.item,
            prepend: slots.prepend,
            title: slots.title,
            subtitle: slots.subtitle,
            append: slots.append
          }), hasText && createVNode(VCardText, {
            "key": "text"
          }, {
            default: () => [((_slots$text = slots.text) == null ? void 0 : _slots$text.call(slots)) ?? props.text]
          }), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots), slots.actions && createVNode(VCardActions, null, {
            default: slots.actions
          }), genOverlays(isClickable.value, "v-card")]
        }), [[resolveDirective("ripple"), isClickable.value]]);
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/directives/touch/index.mjs
  var handleGesture = (wrapper) => {
    const {
      touchstartX,
      touchendX,
      touchstartY,
      touchendY
    } = wrapper;
    const dirRatio = 0.5;
    const minDistance = 16;
    wrapper.offsetX = touchendX - touchstartX;
    wrapper.offsetY = touchendY - touchstartY;
    if (Math.abs(wrapper.offsetY) < dirRatio * Math.abs(wrapper.offsetX)) {
      wrapper.left && touchendX < touchstartX - minDistance && wrapper.left(wrapper);
      wrapper.right && touchendX > touchstartX + minDistance && wrapper.right(wrapper);
    }
    if (Math.abs(wrapper.offsetX) < dirRatio * Math.abs(wrapper.offsetY)) {
      wrapper.up && touchendY < touchstartY - minDistance && wrapper.up(wrapper);
      wrapper.down && touchendY > touchstartY + minDistance && wrapper.down(wrapper);
    }
  };
  function touchstart(event, wrapper) {
    var _wrapper$start;
    const touch = event.changedTouches[0];
    wrapper.touchstartX = touch.clientX;
    wrapper.touchstartY = touch.clientY;
    (_wrapper$start = wrapper.start) == null ? void 0 : _wrapper$start.call(wrapper, {
      originalEvent: event,
      ...wrapper
    });
  }
  function touchend(event, wrapper) {
    var _wrapper$end;
    const touch = event.changedTouches[0];
    wrapper.touchendX = touch.clientX;
    wrapper.touchendY = touch.clientY;
    (_wrapper$end = wrapper.end) == null ? void 0 : _wrapper$end.call(wrapper, {
      originalEvent: event,
      ...wrapper
    });
    handleGesture(wrapper);
  }
  function touchmove(event, wrapper) {
    var _wrapper$move;
    const touch = event.changedTouches[0];
    wrapper.touchmoveX = touch.clientX;
    wrapper.touchmoveY = touch.clientY;
    (_wrapper$move = wrapper.move) == null ? void 0 : _wrapper$move.call(wrapper, {
      originalEvent: event,
      ...wrapper
    });
  }
  function createHandlers() {
    let value = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const wrapper = {
      touchstartX: 0,
      touchstartY: 0,
      touchendX: 0,
      touchendY: 0,
      touchmoveX: 0,
      touchmoveY: 0,
      offsetX: 0,
      offsetY: 0,
      left: value.left,
      right: value.right,
      up: value.up,
      down: value.down,
      start: value.start,
      move: value.move,
      end: value.end
    };
    return {
      touchstart: (e) => touchstart(e, wrapper),
      touchend: (e) => touchend(e, wrapper),
      touchmove: (e) => touchmove(e, wrapper)
    };
  }
  function mounted3(el, binding) {
    var _binding$instance;
    const value = binding.value;
    const target = value != null && value.parent ? el.parentElement : el;
    const options = (value == null ? void 0 : value.options) ?? {
      passive: true
    };
    const uid2 = (_binding$instance = binding.instance) == null ? void 0 : _binding$instance.$.uid;
    if (!target || !uid2)
      return;
    const handlers = createHandlers(binding.value);
    target._touchHandlers = target._touchHandlers ?? /* @__PURE__ */ Object.create(null);
    target._touchHandlers[uid2] = handlers;
    keys(handlers).forEach((eventName) => {
      target.addEventListener(eventName, handlers[eventName], options);
    });
  }
  function unmounted3(el, binding) {
    var _binding$value, _binding$instance2;
    const target = (_binding$value = binding.value) != null && _binding$value.parent ? el.parentElement : el;
    const uid2 = (_binding$instance2 = binding.instance) == null ? void 0 : _binding$instance2.$.uid;
    if (!(target != null && target._touchHandlers) || !uid2)
      return;
    const handlers = target._touchHandlers[uid2];
    keys(handlers).forEach((eventName) => {
      target.removeEventListener(eventName, handlers[eventName]);
    });
    delete target._touchHandlers[uid2];
  }
  var Touch = {
    mounted: mounted3,
    unmounted: unmounted3
  };
  var touch_default = Touch;

  // node_modules/vuetify/lib/components/VWindow/VWindow.mjs
  var VWindowSymbol = Symbol.for("vuetify:v-window");
  var VWindowGroupSymbol = Symbol.for("vuetify:v-window-group");
  var VWindow = genericComponent()({
    name: "VWindow",
    directives: {
      Touch
    },
    props: {
      continuous: Boolean,
      nextIcon: {
        type: [Boolean, String, Function, Object],
        default: "$next"
      },
      prevIcon: {
        type: [Boolean, String, Function, Object],
        default: "$prev"
      },
      reverse: Boolean,
      showArrows: {
        type: [Boolean, String],
        validator: (v) => typeof v === "boolean" || v === "hover"
      },
      touch: {
        type: [Object, Boolean],
        default: void 0
      },
      direction: {
        type: String,
        default: "horizontal"
      },
      modelValue: null,
      disabled: Boolean,
      selectedClass: {
        type: String,
        default: "v-window-item--active"
      },
      mandatory: {
        default: "force"
      },
      ...makeTagProps(),
      ...makeThemeProps()
    },
    emits: {
      "update:modelValue": (v) => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        themeClasses
      } = provideTheme(props);
      const {
        isRtl
      } = useRtl();
      const {
        t
      } = useLocale();
      const group = useGroup(props, VWindowGroupSymbol);
      const rootRef = ref();
      const isRtlReverse = computed2(() => isRtl.value ? !props.reverse : props.reverse);
      const isReversed = ref(false);
      const transition = computed2(() => {
        const axis = props.direction === "vertical" ? "y" : "x";
        const reverse = isRtlReverse.value ? !isReversed.value : isReversed.value;
        const direction = reverse ? "-reverse" : "";
        return `v-window-${axis}${direction}-transition`;
      });
      const transitionCount = ref(0);
      const transitionHeight = ref(void 0);
      const activeIndex = computed2(() => {
        return group.items.value.findIndex((item) => group.selected.value.includes(item.id));
      });
      watch(activeIndex, (newVal, oldVal) => {
        const itemsLength = group.items.value.length;
        const lastIndex = itemsLength - 1;
        if (itemsLength <= 2) {
          isReversed.value = newVal < oldVal;
        } else if (newVal === lastIndex && oldVal === 0) {
          isReversed.value = true;
        } else if (newVal === 0 && oldVal === lastIndex) {
          isReversed.value = false;
        } else {
          isReversed.value = newVal < oldVal;
        }
      });
      provide(VWindowSymbol, {
        transition,
        isReversed,
        transitionCount,
        transitionHeight,
        rootRef
      });
      const canMoveBack = computed2(() => props.continuous || activeIndex.value !== 0);
      const canMoveForward = computed2(() => props.continuous || activeIndex.value !== group.items.value.length - 1);
      function prev() {
        canMoveBack.value && group.prev();
      }
      function next() {
        canMoveForward.value && group.next();
      }
      const arrows = computed2(() => {
        const arrows2 = [];
        const prevProps = {
          icon: isRtl.value ? props.nextIcon : props.prevIcon,
          class: `v-window__${isRtlReverse.value ? "right" : "left"}`,
          onClick: group.prev,
          ariaLabel: t("$vuetify.carousel.prev")
        };
        arrows2.push(canMoveBack.value ? slots.prev ? slots.prev({
          props: prevProps
        }) : createVNode(VBtn, prevProps, null) : createVNode("div", null, null));
        const nextProps = {
          icon: isRtl.value ? props.prevIcon : props.nextIcon,
          class: `v-window__${isRtlReverse.value ? "left" : "right"}`,
          onClick: group.next,
          ariaLabel: t("$vuetify.carousel.next")
        };
        arrows2.push(canMoveForward.value ? slots.next ? slots.next({
          props: nextProps
        }) : createVNode(VBtn, nextProps, null) : createVNode("div", null, null));
        return arrows2;
      });
      const touchOptions = computed2(() => {
        if (props.touch === false)
          return props.touch;
        const options = {
          left: () => {
            isRtlReverse.value ? prev() : next();
          },
          right: () => {
            isRtlReverse.value ? next() : prev();
          },
          start: (_ref2) => {
            let {
              originalEvent
            } = _ref2;
            originalEvent.stopPropagation();
          }
        };
        return {
          ...options,
          ...props.touch === true ? {} : props.touch
        };
      });
      useRender(() => {
        var _slots$default, _slots$additional;
        return withDirectives(createVNode(props.tag, {
          "ref": rootRef,
          "class": ["v-window", {
            "v-window--show-arrows-on-hover": props.showArrows === "hover"
          }, themeClasses.value]
        }, {
          default: () => [createVNode("div", {
            "class": "v-window__container",
            "style": {
              height: transitionHeight.value
            }
          }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
            group
          }), props.showArrows !== false && createVNode("div", {
            "class": "v-window__controls"
          }, [arrows.value])]), (_slots$additional = slots.additional) == null ? void 0 : _slots$additional.call(slots, {
            group
          })]
        }), [[resolveDirective("touch"), touchOptions.value]]);
      });
      return {
        group
      };
    }
  });

  // node_modules/vuetify/lib/composables/ssrBoot.mjs
  function useSsrBoot() {
    const isBooted = ref(false);
    onMounted(() => {
      window.requestAnimationFrame(() => {
        isBooted.value = true;
      });
    });
    const ssrBootStyles = computed2(() => !isBooted.value ? {
      transition: "none !important"
    } : void 0);
    return {
      ssrBootStyles,
      isBooted: readonly(isBooted)
    };
  }

  // node_modules/vuetify/lib/components/VWindow/VWindowItem.mjs
  var VWindowItem = defineComponent2({
    name: "VWindowItem",
    directives: {
      Touch: touch_default
    },
    props: {
      reverseTransition: {
        type: [Boolean, String],
        default: void 0
      },
      transition: {
        type: [Boolean, String],
        default: void 0
      },
      ...makeGroupItemProps(),
      ...makeLazyProps()
    },
    emits: {
      "group:selected": (val) => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const window2 = inject(VWindowSymbol);
      const groupItem = useGroupItem(props, VWindowGroupSymbol);
      const {
        isBooted
      } = useSsrBoot();
      if (!window2 || !groupItem)
        throw new Error("[Vuetify] VWindowItem must be used inside VWindow");
      const isTransitioning = ref(false);
      const hasTransition = computed2(() => window2.isReversed.value ? props.reverseTransition !== false : props.transition !== false);
      function onAfterTransition() {
        if (!isTransitioning.value || !window2) {
          return;
        }
        isTransitioning.value = false;
        if (window2.transitionCount.value > 0) {
          window2.transitionCount.value -= 1;
          if (window2.transitionCount.value === 0) {
            window2.transitionHeight.value = void 0;
          }
        }
      }
      function onBeforeTransition() {
        if (isTransitioning.value || !window2) {
          return;
        }
        isTransitioning.value = true;
        if (window2.transitionCount.value === 0) {
          var _window$rootRef$value;
          window2.transitionHeight.value = convertToUnit((_window$rootRef$value = window2.rootRef.value) == null ? void 0 : _window$rootRef$value.clientHeight);
        }
        window2.transitionCount.value += 1;
      }
      function onTransitionCancelled() {
        onAfterTransition();
      }
      function onEnterTransition(el) {
        if (!isTransitioning.value) {
          return;
        }
        nextTick(() => {
          if (!hasTransition.value || !isTransitioning.value || !window2) {
            return;
          }
          window2.transitionHeight.value = convertToUnit(el.clientHeight);
        });
      }
      const transition = computed2(() => {
        const name = window2.isReversed.value ? props.reverseTransition : props.transition;
        return !hasTransition.value ? false : {
          name: typeof name !== "string" ? window2.transition.value : name,
          onBeforeEnter: onBeforeTransition,
          onAfterEnter: onAfterTransition,
          onEnterCancelled: onTransitionCancelled,
          onBeforeLeave: onBeforeTransition,
          onAfterLeave: onAfterTransition,
          onLeaveCancelled: onTransitionCancelled,
          onEnter: onEnterTransition
        };
      });
      const {
        hasContent
      } = useLazy(props, groupItem.isSelected);
      useRender(() => {
        var _slots$default;
        return createVNode(MaybeTransition, {
          "transition": isBooted.value && transition.value
        }, {
          default: () => [withDirectives(createVNode("div", {
            "class": ["v-window-item", groupItem.selectedClass.value]
          }, [hasContent.value && ((_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots))]), [[vShow, groupItem.isSelected.value]])]
        });
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VCarousel/VCarousel.mjs
  var VCarousel = defineComponent2({
    name: "VCarousel",
    props: {
      color: String,
      cycle: Boolean,
      delimiterIcon: {
        type: IconValue,
        default: "$delimiter"
      },
      height: {
        type: [Number, String],
        default: 500
      },
      hideDelimiters: Boolean,
      hideDelimiterBackground: Boolean,
      interval: {
        type: [Number, String],
        default: 6e3,
        validator: (value) => value > 0
      },
      modelValue: null,
      progress: [Boolean, String],
      showArrows: {
        type: [Boolean, String],
        default: true,
        validator: (v) => typeof v === "boolean" || v === "hover"
      },
      verticalDelimiters: [Boolean, String]
    },
    emits: {
      "update:modelValue": (val) => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const model = useProxiedModel(props, "modelValue");
      const {
        t
      } = useLocale();
      const windowRef = ref();
      let slideTimeout = -1;
      watch(model, restartTimeout);
      watch(() => props.interval, restartTimeout);
      watch(() => props.cycle, (val) => {
        if (val)
          restartTimeout();
        else
          window.clearTimeout(slideTimeout);
      });
      onMounted(startTimeout);
      function startTimeout() {
        if (!props.cycle || !windowRef.value)
          return;
        slideTimeout = window.setTimeout(windowRef.value.group.next, +props.interval > 0 ? +props.interval : 6e3);
      }
      function restartTimeout() {
        window.clearTimeout(slideTimeout);
        window.requestAnimationFrame(startTimeout);
      }
      useRender(() => createVNode(VWindow, {
        "ref": windowRef,
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-carousel", {
          "v-carousel--hide-delimiter-background": props.hideDelimiterBackground,
          "v-carousel--vertical-delimiters": props.verticalDelimiters
        }],
        "style": {
          height: convertToUnit(props.height)
        },
        "continuous": true,
        "mandatory": "force",
        "showArrows": props.showArrows
      }, {
        default: slots.default,
        additional: (_ref2) => {
          let {
            group
          } = _ref2;
          return createVNode(Fragment, null, [!props.hideDelimiters && createVNode("div", {
            "class": "v-carousel__controls",
            "style": {
              left: props.verticalDelimiters === "left" && props.verticalDelimiters ? 0 : "auto",
              right: props.verticalDelimiters === "right" ? 0 : "auto"
            }
          }, [group.items.value.length > 0 && createVNode(VDefaultsProvider, {
            "defaults": {
              VBtn: {
                color: props.color,
                icon: props.delimiterIcon,
                size: "x-small",
                variant: "text"
              }
            },
            "scoped": true
          }, {
            default: () => [group.items.value.map((item, index) => {
              const props2 = {
                "aria-label": t("$vuetify.carousel.ariaLabel.delimiter", index + 1, group.items.value.length),
                class: [group.isSelected(item.id) && "v-btn--active"],
                onClick: () => group.select(item.id, true)
              };
              return slots.item ? slots.item({
                props: props2,
                item
              }) : createVNode(VBtn, mergeProps(item, props2), null);
            })]
          })]), props.progress && createVNode(VProgressLinear, {
            "class": "v-carousel__progress",
            "color": typeof props.progress === "string" ? props.progress : void 0,
            "modelValue": (group.getItemIndex(model.value) + 1) / group.items.value.length * 100
          }, null)]);
        },
        prev: slots.prev,
        next: slots.next
      }));
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VCarousel/VCarouselItem.mjs
  var VCarouselItem = defineComponent2({
    name: "VCarouselItem",
    inheritAttrs: false,
    props: {
      value: null
    },
    setup(props, _ref) {
      let {
        slots,
        attrs
      } = _ref;
      useRender(() => createVNode(VWindowItem, {
        "class": "v-carousel-item",
        "value": props.value
      }, {
        default: () => [createVNode(VImg, attrs, slots)]
      }));
    }
  });

  // node_modules/vuetify/lib/components/VCode/index.mjs
  var VCode = createSimpleFunctional("v-code");

  // node_modules/vuetify/lib/components/VColorPicker/VColorPickerCanvas.mjs
  var VColorPickerCanvas = defineComponent2({
    name: "VColorPickerCanvas",
    props: {
      color: {
        type: Object
      },
      disabled: Boolean,
      dotSize: {
        type: [Number, String],
        default: 10
      },
      height: {
        type: [Number, String],
        default: 150
      },
      width: {
        type: [Number, String],
        default: 300
      }
    },
    emits: {
      "update:color": (color) => true,
      "update:position": (hue) => true
    },
    setup(props, _ref) {
      let {
        emit: emit2
      } = _ref;
      const isInteracting = ref(false);
      const isOutsideUpdate = ref(false);
      const dotPosition = ref({
        x: 0,
        y: 0
      });
      const dotStyles = computed2(() => {
        const {
          x,
          y
        } = dotPosition.value;
        const radius = parseInt(props.dotSize, 10) / 2;
        return {
          width: convertToUnit(props.dotSize),
          height: convertToUnit(props.dotSize),
          transform: `translate(${convertToUnit(x - radius)}, ${convertToUnit(y - radius)})`
        };
      });
      const canvasRef = ref();
      function updateDotPosition(x, y, rect) {
        const {
          left,
          top,
          width,
          height
        } = rect;
        dotPosition.value = {
          x: clamp(x - left, 0, width),
          y: clamp(y - top, 0, height)
        };
      }
      function handleClick(e) {
        if (props.disabled || !canvasRef.value)
          return;
        updateDotPosition(e.clientX, e.clientY, canvasRef.value.getBoundingClientRect());
      }
      function handleMouseDown(e) {
        e.preventDefault();
        if (props.disabled)
          return;
        isInteracting.value = true;
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("touchmove", handleMouseMove);
        window.addEventListener("touchend", handleMouseUp);
      }
      function handleMouseMove(e) {
        if (props.disabled || !canvasRef.value)
          return;
        isInteracting.value = true;
        const coords = getEventCoordinates(e);
        updateDotPosition(coords.clientX, coords.clientY, canvasRef.value.getBoundingClientRect());
      }
      function handleMouseUp() {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("touchmove", handleMouseMove);
        window.removeEventListener("touchend", handleMouseUp);
      }
      watch(dotPosition, () => {
        var _props$color, _props$color2;
        if (isOutsideUpdate.value) {
          isOutsideUpdate.value = false;
          return;
        }
        if (!canvasRef.value)
          return;
        const {
          width,
          height
        } = canvasRef.value.getBoundingClientRect();
        const {
          x,
          y
        } = dotPosition.value;
        emit2("update:color", {
          h: ((_props$color = props.color) == null ? void 0 : _props$color.h) ?? 0,
          s: clamp(x, 0, width) / width,
          v: 1 - clamp(y, 0, height) / height,
          a: ((_props$color2 = props.color) == null ? void 0 : _props$color2.a) ?? 1
        });
      });
      function updateCanvas() {
        var _props$color3;
        if (!canvasRef.value)
          return;
        const canvas = canvasRef.value;
        const ctx = canvas.getContext("2d");
        if (!ctx)
          return;
        const saturationGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        saturationGradient.addColorStop(0, "hsla(0, 0%, 100%, 1)");
        saturationGradient.addColorStop(1, `hsla(${((_props$color3 = props.color) == null ? void 0 : _props$color3.h) ?? 0}, 100%, 50%, 1)`);
        ctx.fillStyle = saturationGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const valueGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        valueGradient.addColorStop(0, "hsla(0, 0%, 100%, 0)");
        valueGradient.addColorStop(1, "hsla(0, 0%, 0%, 1)");
        ctx.fillStyle = valueGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      watch(() => {
        var _props$color4;
        return (_props$color4 = props.color) == null ? void 0 : _props$color4.h;
      }, updateCanvas, {
        immediate: true
      });
      watch(() => props.color, () => {
        if (isInteracting.value) {
          isInteracting.value = false;
          return;
        }
        if (!props.color)
          return;
        isOutsideUpdate.value = true;
        dotPosition.value = {
          x: props.color.s * parseInt(props.width, 10),
          y: (1 - props.color.v) * parseInt(props.height, 10)
        };
      }, {
        deep: true,
        immediate: true
      });
      onMounted(() => updateCanvas());
      useRender(() => createVNode("div", {
        "class": "v-color-picker-canvas",
        "style": {
          width: convertToUnit(props.width),
          height: convertToUnit(props.height)
        },
        "onClick": handleClick,
        "onMousedown": handleMouseDown,
        "onTouchstart": handleMouseDown
      }, [createVNode("canvas", {
        "ref": canvasRef,
        "width": props.width,
        "height": props.height
      }, null), createVNode("div", {
        "class": ["v-color-picker-canvas__dot", {
          "v-color-picker-canvas__dot--disabled": props.disabled
        }],
        "style": dotStyles.value
      }, null)]));
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VColorPicker/util/index.mjs
  var _rgba$inputs;
  function has2(obj, key) {
    return key.every((k) => obj.hasOwnProperty(k));
  }
  function parseColor(color) {
    if (!color)
      return null;
    let hsva = null;
    if (typeof color === "string") {
      const hex2 = parseHex(color);
      hsva = HexToHSVA(hex2);
    }
    if (typeof color === "object") {
      if (has2(color, ["r", "g", "b"])) {
        hsva = RGBAtoHSVA(color);
      } else if (has2(color, ["h", "s", "l"])) {
        hsva = HSLAtoHSVA(color);
      } else if (has2(color, ["h", "s", "v"])) {
        hsva = color;
      }
    }
    return hsva != null ? {
      ...hsva,
      a: hsva.a ?? 1
    } : null;
  }
  function stripAlpha(color, stripAlpha2) {
    if (stripAlpha2) {
      const {
        a,
        ...rest
      } = color;
      return rest;
    }
    return color;
  }
  function extractColor(color, input) {
    if (input == null || typeof input === "string") {
      const hex2 = HSVAtoHex(color);
      if (color.a === 1)
        return hex2.slice(0, 7);
      else
        return hex2;
    }
    if (typeof input === "object") {
      let converted;
      if (has2(input, ["r", "g", "b"]))
        converted = HSVAtoRGBA(color);
      else if (has2(input, ["h", "s", "l"]))
        converted = HSVAtoHSLA(color);
      else if (has2(input, ["h", "s", "v"]))
        converted = color;
      return stripAlpha(converted, !has2(input, ["a"]));
    }
    return color;
  }
  var nullColor = {
    h: 0,
    s: 0,
    v: 1,
    a: 1
  };
  var rgba = {
    inputProps: {
      type: "number",
      min: 0
    },
    inputs: [{
      label: "R",
      max: 255,
      step: 1,
      getValue: (c) => Math.round(c.r),
      getColor: (c, v) => ({
        ...c,
        r: Number(v)
      })
    }, {
      label: "G",
      max: 255,
      step: 1,
      getValue: (c) => Math.round(c.g),
      getColor: (c, v) => ({
        ...c,
        g: Number(v)
      })
    }, {
      label: "B",
      max: 255,
      step: 1,
      getValue: (c) => Math.round(c.b),
      getColor: (c, v) => ({
        ...c,
        b: Number(v)
      })
    }, {
      label: "A",
      max: 1,
      step: 0.01,
      getValue: (c) => Math.round(c.a * 100) / 100,
      getColor: (c, v) => ({
        ...c,
        a: Number(v)
      })
    }],
    to: HSVAtoRGBA,
    from: RGBAtoHSVA
  };
  var rgb = {
    ...rgba,
    inputs: (_rgba$inputs = rgba.inputs) == null ? void 0 : _rgba$inputs.slice(0, 3)
  };
  var hsla = {
    inputProps: {
      type: "number",
      min: 0
    },
    inputs: [{
      label: "H",
      max: 360,
      step: 1,
      getValue: (c) => Math.round(c.h),
      getColor: (c, v) => ({
        ...c,
        h: Number(v)
      })
    }, {
      label: "S",
      max: 1,
      step: 0.01,
      getValue: (c) => Math.round(c.s * 100) / 100,
      getColor: (c, v) => ({
        ...c,
        s: Number(v)
      })
    }, {
      label: "L",
      max: 1,
      step: 0.01,
      getValue: (c) => Math.round(c.l * 100) / 100,
      getColor: (c, v) => ({
        ...c,
        l: Number(v)
      })
    }, {
      label: "A",
      max: 1,
      step: 0.01,
      getValue: (c) => Math.round(c.a * 100) / 100,
      getColor: (c, v) => ({
        ...c,
        a: Number(v)
      })
    }],
    to: HSVAtoHSLA,
    from: HSLAtoHSVA
  };
  var hsl = {
    ...hsla,
    inputs: hsla.inputs.slice(0, 3)
  };
  var hexa = {
    inputProps: {
      type: "text"
    },
    inputs: [{
      label: "HEXA",
      getValue: (c) => c,
      getColor: (c, v) => v
    }],
    to: HSVAtoHex,
    from: HexToHSVA
  };
  var hex = {
    ...hexa,
    inputs: [{
      label: "HEX",
      getValue: (c) => c.slice(0, 7),
      getColor: (c, v) => v
    }]
  };
  var modes = {
    rgb,
    rgba,
    hsl,
    hsla,
    hex,
    hexa
  };

  // node_modules/vuetify/lib/components/VColorPicker/VColorPickerEdit.mjs
  var VColorPickerInput = (_ref) => {
    let {
      label,
      ...rest
    } = _ref;
    return createVNode("div", {
      "class": "v-color-picker-edit__input"
    }, [createVNode("input", rest, null), createVNode("span", null, [label])]);
  };
  var VColorPickerEdit = defineComponent2({
    name: "VColorPickerEdit",
    props: {
      color: Object,
      disabled: Boolean,
      mode: {
        type: String,
        default: "rgba",
        validator: (v) => Object.keys(modes).includes(v)
      },
      modes: {
        type: Array,
        default: () => Object.keys(modes),
        validator: (v) => Array.isArray(v) && v.every((m) => Object.keys(modes).includes(m))
      }
    },
    emits: {
      "update:color": (color) => true,
      "update:mode": (mode) => true
    },
    setup(props, _ref2) {
      let {
        emit: emit2
      } = _ref2;
      const enabledModes = computed2(() => {
        return props.modes.map((key) => ({
          ...modes[key],
          name: key
        }));
      });
      const inputs = computed2(() => {
        var _mode$inputs;
        const mode = enabledModes.value.find((m) => m.name === props.mode);
        if (!mode)
          return [];
        const color = props.color ? mode.to(props.color) : {};
        return (_mode$inputs = mode.inputs) == null ? void 0 : _mode$inputs.map((_ref3) => {
          let {
            getValue: getValue2,
            getColor,
            ...inputProps
          } = _ref3;
          return {
            ...mode.inputProps,
            ...inputProps,
            disabled: props.disabled,
            value: getValue2(color),
            onChange: (e) => {
              const target = e.target;
              if (!target)
                return;
              emit2("update:color", mode.from(getColor(color, target.value)));
            }
          };
        });
      });
      useRender(() => {
        var _inputs$value;
        return createVNode("div", {
          "class": "v-color-picker-edit"
        }, [(_inputs$value = inputs.value) == null ? void 0 : _inputs$value.map((props2) => createVNode(VColorPickerInput, props2, null)), enabledModes.value.length > 1 && createVNode(VBtn, {
          "icon": "$unfold",
          "size": "x-small",
          "variant": "plain",
          "onClick": () => {
            const mi = enabledModes.value.findIndex((m) => m.name === props.mode);
            emit2("update:mode", enabledModes.value[(mi + 1) % enabledModes.value.length].name);
          }
        }, null)]);
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VSlider/slider.mjs
  var VSliderSymbol = Symbol.for("vuetify:v-slider");
  function getOffset2(e, el, direction) {
    const vertical = direction === "vertical";
    const rect = el.getBoundingClientRect();
    const touch = "touches" in e ? e.touches[0] : e;
    return vertical ? touch.clientY - (rect.top + rect.height / 2) : touch.clientX - (rect.left + rect.width / 2);
  }
  function getPosition(e, position) {
    if ("touches" in e && e.touches.length)
      return e.touches[0][position];
    else if ("changedTouches" in e && e.changedTouches.length)
      return e.changedTouches[0][position];
    else
      return e[position];
  }
  var makeSliderProps = propsFactory({
    disabled: Boolean,
    error: Boolean,
    readonly: Boolean,
    max: {
      type: [Number, String],
      default: 100
    },
    min: {
      type: [Number, String],
      default: 0
    },
    step: {
      type: [Number, String],
      default: 0
    },
    thumbColor: String,
    thumbLabel: {
      type: [Boolean, String],
      default: void 0,
      validator: (v) => typeof v === "boolean" || v === "always"
    },
    thumbSize: {
      type: [Number, String],
      default: 20
    },
    showTicks: {
      type: [Boolean, String],
      default: false,
      validator: (v) => typeof v === "boolean" || v === "always"
    },
    ticks: {
      type: [Array, Object]
    },
    tickSize: {
      type: [Number, String],
      default: 2
    },
    color: String,
    trackColor: String,
    trackFillColor: String,
    trackSize: {
      type: [Number, String],
      default: 4
    },
    direction: {
      type: String,
      default: "horizontal",
      validator: (v) => ["vertical", "horizontal"].includes(v)
    },
    reverse: Boolean,
    ...makeRoundedProps(),
    ...makeElevationProps({
      elevation: 2
    })
  }, "slider");
  var useSlider = (_ref) => {
    let {
      props,
      handleSliderMouseUp,
      handleMouseMove,
      getActiveThumb
    } = _ref;
    const {
      isRtl
    } = useRtl();
    const isReversed = computed2(() => isRtl.value !== props.reverse);
    const horizontalDirection = computed2(() => {
      let hd = isRtl.value ? "rtl" : "ltr";
      if (props.reverse) {
        hd = hd === "rtl" ? "ltr" : "rtl";
      }
      return hd;
    });
    const min = computed2(() => parseFloat(props.min));
    const max = computed2(() => parseFloat(props.max));
    const step = computed2(() => props.step > 0 ? parseFloat(props.step) : 0);
    const decimals = computed2(() => {
      const trimmedStep = step.value.toString().trim();
      return trimmedStep.includes(".") ? trimmedStep.length - trimmedStep.indexOf(".") - 1 : 0;
    });
    const thumbSize = computed2(() => parseInt(props.thumbSize, 10));
    const tickSize = computed2(() => parseInt(props.tickSize, 10));
    const trackSize = computed2(() => parseInt(props.trackSize, 10));
    const numTicks = computed2(() => (max.value - min.value) / step.value);
    const disabled = toRef(props, "disabled");
    const vertical = computed2(() => props.direction === "vertical");
    const thumbColor = computed2(() => props.error || props.disabled ? void 0 : props.thumbColor ?? props.color);
    const trackColor = computed2(() => props.error || props.disabled ? void 0 : props.trackColor ?? props.color);
    const trackFillColor = computed2(() => props.error || props.disabled ? void 0 : props.trackFillColor ?? props.color);
    const mousePressed = ref(false);
    const startOffset = ref(0);
    const trackContainerRef = ref();
    const activeThumbRef = ref();
    function roundValue(value) {
      if (step.value <= 0)
        return value;
      const clamped = clamp(value, min.value, max.value);
      const offset = min.value % step.value;
      const newValue = Math.round((clamped - offset) / step.value) * step.value + offset;
      return parseFloat(Math.min(newValue, max.value).toFixed(decimals.value));
    }
    function parseMouseMove(e) {
      var _trackContainerRef$va;
      const vertical2 = props.direction === "vertical";
      const start = vertical2 ? "top" : "left";
      const length = vertical2 ? "height" : "width";
      const position2 = vertical2 ? "clientY" : "clientX";
      const {
        [start]: trackStart,
        [length]: trackLength
      } = (_trackContainerRef$va = trackContainerRef.value) == null ? void 0 : _trackContainerRef$va.$el.getBoundingClientRect();
      const clickOffset = getPosition(e, position2);
      let clickPos = Math.min(Math.max((clickOffset - trackStart - startOffset.value) / trackLength, 0), 1) || 0;
      if (vertical2 || isReversed.value)
        clickPos = 1 - clickPos;
      return roundValue(min.value + clickPos * (max.value - min.value));
    }
    let thumbMoved = false;
    const handleStop = (e) => {
      if (!thumbMoved) {
        startOffset.value = 0;
        handleSliderMouseUp(parseMouseMove(e));
      }
      mousePressed.value = false;
      thumbMoved = false;
      startOffset.value = 0;
    };
    const handleStart = (e) => {
      activeThumbRef.value = getActiveThumb(e);
      if (!activeThumbRef.value)
        return;
      activeThumbRef.value.focus();
      mousePressed.value = true;
      if (activeThumbRef.value.contains(e.target)) {
        thumbMoved = true;
        startOffset.value = getOffset2(e, activeThumbRef.value, props.direction);
      } else {
        startOffset.value = 0;
        handleMouseMove(parseMouseMove(e));
      }
    };
    const moveListenerOptions = {
      passive: true,
      capture: true
    };
    function onMouseMove(e) {
      thumbMoved = true;
      handleMouseMove(parseMouseMove(e));
    }
    function onSliderMouseUp(e) {
      e.stopPropagation();
      e.preventDefault();
      handleStop(e);
      window.removeEventListener("mousemove", onMouseMove, moveListenerOptions);
      window.removeEventListener("mouseup", onSliderMouseUp);
    }
    function onSliderTouchend(e) {
      var _e$target;
      handleStop(e);
      window.removeEventListener("touchmove", onMouseMove, moveListenerOptions);
      (_e$target = e.target) == null ? void 0 : _e$target.removeEventListener("touchend", onSliderTouchend);
    }
    function onSliderTouchstart(e) {
      var _e$target2;
      handleStart(e);
      window.addEventListener("touchmove", onMouseMove, moveListenerOptions);
      (_e$target2 = e.target) == null ? void 0 : _e$target2.addEventListener("touchend", onSliderTouchend, {
        passive: false
      });
    }
    function onSliderMousedown(e) {
      e.preventDefault();
      handleStart(e);
      window.addEventListener("mousemove", onMouseMove, moveListenerOptions);
      window.addEventListener("mouseup", onSliderMouseUp, {
        passive: false
      });
    }
    const position = (val) => {
      const percentage = (val - min.value) / (max.value - min.value) * 100;
      return clamp(isNaN(percentage) ? 0 : percentage, 0, 100);
    };
    const parsedTicks = computed2(() => {
      if (!props.ticks) {
        return numTicks.value !== Infinity ? createRange(numTicks.value + 1).map((t) => {
          const value = min.value + t * step.value;
          return {
            value,
            position: position(value)
          };
        }) : [];
      }
      if (Array.isArray(props.ticks))
        return props.ticks.map((t) => ({
          value: t,
          position: position(t),
          label: t.toString()
        }));
      return Object.keys(props.ticks).map((key) => ({
        value: parseFloat(key),
        position: position(parseFloat(key)),
        label: props.ticks[key]
      }));
    });
    const hasLabels = computed2(() => parsedTicks.value.some((_ref2) => {
      let {
        label
      } = _ref2;
      return !!label;
    }));
    const data = {
      activeThumbRef,
      color: toRef(props, "color"),
      decimals,
      disabled,
      direction: toRef(props, "direction"),
      elevation: toRef(props, "elevation"),
      hasLabels,
      horizontalDirection,
      isReversed,
      min,
      max,
      mousePressed,
      numTicks,
      onSliderMousedown,
      onSliderTouchstart,
      parsedTicks,
      parseMouseMove,
      position,
      readonly: toRef(props, "readonly"),
      rounded: toRef(props, "rounded"),
      roundValue,
      showTicks: toRef(props, "showTicks"),
      startOffset,
      step,
      thumbSize,
      thumbColor,
      thumbLabel: toRef(props, "thumbLabel"),
      ticks: toRef(props, "ticks"),
      tickSize,
      trackColor,
      trackContainerRef,
      trackFillColor,
      trackSize,
      vertical
    };
    provide(VSliderSymbol, data);
    return data;
  };

  // node_modules/vuetify/lib/components/VSlider/VSliderThumb.mjs
  var VSliderThumb = defineComponent2({
    name: "VSliderThumb",
    directives: {
      Ripple: ripple_default
    },
    props: {
      focused: Boolean,
      max: {
        type: Number,
        required: true
      },
      min: {
        type: Number,
        required: true
      },
      modelValue: {
        type: Number,
        required: true
      },
      position: {
        type: Number,
        required: true
      }
    },
    emits: {
      "update:modelValue": (v) => true
    },
    setup(props, _ref) {
      let {
        slots,
        emit: emit2
      } = _ref;
      const slider = inject(VSliderSymbol);
      if (!slider)
        throw new Error("[Vuetify] v-slider-thumb must be used inside v-slider or v-range-slider");
      const {
        thumbColor,
        step,
        vertical,
        disabled,
        thumbSize,
        thumbLabel,
        direction,
        readonly: readonly2,
        elevation,
        isReversed,
        horizontalDirection,
        mousePressed,
        decimals
      } = slider;
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(thumbColor);
      const {
        pageup,
        pagedown,
        end,
        home,
        left,
        right,
        down,
        up
      } = keyValues;
      const relevantKeys = [pageup, pagedown, end, home, left, right, down, up];
      const multipliers = computed2(() => {
        if (step.value)
          return [1, 2, 3];
        else
          return [1, 5, 10];
      });
      function parseKeydown(e, value) {
        if (!relevantKeys.includes(e.key))
          return;
        e.preventDefault();
        const _step = step.value || 0.1;
        const steps = (props.max - props.min) / _step;
        if ([left, right, down, up].includes(e.key)) {
          const increase = isReversed.value ? [left, up] : [right, up];
          const direction2 = increase.includes(e.key) ? 1 : -1;
          const multiplier = e.shiftKey ? 2 : e.ctrlKey ? 1 : 0;
          value = value + direction2 * _step * multipliers.value[multiplier];
        } else if (e.key === home) {
          value = props.min;
        } else if (e.key === end) {
          value = props.max;
        } else {
          const direction2 = e.key === pagedown ? 1 : -1;
          value = value - direction2 * _step * (steps > 100 ? steps / 10 : 10);
        }
        return Math.max(props.min, Math.min(props.max, value));
      }
      function onKeydown(e) {
        const newValue = parseKeydown(e, props.modelValue);
        newValue != null && emit2("update:modelValue", newValue);
      }
      useRender(() => {
        var _slots$thumbLabel;
        const positionPercentage = convertToUnit(vertical.value ? 100 - props.position : props.position, "%");
        const inset = vertical.value ? "block" : "inline";
        const {
          elevationClasses
        } = useElevation(computed2(() => !disabled.value ? elevation.value : void 0));
        return createVNode("div", {
          "class": ["v-slider-thumb", {
            "v-slider-thumb--focused": props.focused,
            "v-slider-thumb--pressed": props.focused && mousePressed.value
          }],
          "style": {
            [`inset-${inset}-start`]: `calc(${positionPercentage} - var(--v-slider-thumb-size) / 2)`,
            "--v-slider-thumb-size": convertToUnit(thumbSize.value),
            direction: !vertical.value ? horizontalDirection.value : void 0
          },
          "role": "slider",
          "tabindex": disabled.value ? -1 : 0,
          "aria-valuemin": props.min,
          "aria-valuemax": props.max,
          "aria-valuenow": props.modelValue,
          "aria-readonly": readonly2.value,
          "aria-orientation": direction.value,
          "onKeydown": !readonly2.value ? onKeydown : void 0
        }, [createVNode("div", {
          "class": ["v-slider-thumb__surface", textColorClasses.value, elevationClasses.value],
          "style": {
            ...textColorStyles.value
          }
        }, null), withDirectives(createVNode("div", {
          "class": ["v-slider-thumb__ripple", textColorClasses.value],
          "style": textColorStyles.value
        }, null), [[resolveDirective("ripple"), true, null, {
          circle: true,
          center: true
        }]]), createVNode(VScaleTransition, {
          "origin": "bottom center"
        }, {
          default: () => [withDirectives(createVNode("div", {
            "class": "v-slider-thumb__label-container"
          }, [createVNode("div", {
            "class": ["v-slider-thumb__label"]
          }, [createVNode("div", null, [((_slots$thumbLabel = slots["thumb-label"]) == null ? void 0 : _slots$thumbLabel.call(slots, {
            modelValue: props.modelValue
          })) ?? props.modelValue.toFixed(step.value ? decimals.value : 1)])])]), [[vShow, thumbLabel.value && props.focused || thumbLabel.value === "always"]])]
        })]);
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VSlider/VSliderTrack.mjs
  var VSliderTrack = defineComponent2({
    name: "VSliderTrack",
    props: {
      start: {
        type: Number,
        required: true
      },
      stop: {
        type: Number,
        required: true
      }
    },
    emits: {},
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const slider = inject(VSliderSymbol);
      if (!slider)
        throw new Error("[Vuetify] v-slider-track must be inside v-slider or v-range-slider");
      const {
        color,
        horizontalDirection,
        parsedTicks,
        rounded,
        showTicks,
        tickSize,
        trackColor,
        trackFillColor,
        trackSize,
        vertical,
        min,
        max
      } = slider;
      const {
        roundedClasses
      } = useRounded(rounded);
      const {
        backgroundColorClasses: trackFillColorClasses,
        backgroundColorStyles: trackFillColorStyles
      } = useBackgroundColor(trackFillColor);
      const {
        backgroundColorClasses: trackColorClasses,
        backgroundColorStyles: trackColorStyles
      } = useBackgroundColor(trackColor);
      const startDir = computed2(() => `inset-${vertical.value ? "block-end" : "inline-start"}`);
      const endDir = computed2(() => vertical.value ? "height" : "width");
      const backgroundStyles = computed2(() => {
        return {
          [startDir.value]: "0%",
          [endDir.value]: "100%"
        };
      });
      const trackFillWidth = computed2(() => props.stop - props.start);
      const trackFillStyles = computed2(() => {
        return {
          [startDir.value]: convertToUnit(props.start, "%"),
          [endDir.value]: convertToUnit(trackFillWidth.value, "%")
        };
      });
      const computedTicks = computed2(() => {
        const ticks = vertical.value ? parsedTicks.value.slice().reverse() : parsedTicks.value;
        return ticks.map((tick, index) => {
          var _slots$tickLabel;
          const directionProperty = vertical.value ? "bottom" : "margin-inline-start";
          const directionValue = tick.value !== min.value && tick.value !== max.value ? convertToUnit(tick.position, "%") : void 0;
          return createVNode("div", {
            "key": tick.value,
            "class": ["v-slider-track__tick", {
              "v-slider-track__tick--filled": tick.position >= props.start && tick.position <= props.stop,
              "v-slider-track__tick--first": tick.value === min.value,
              "v-slider-track__tick--last": tick.value === max.value
            }],
            "style": {
              [directionProperty]: directionValue
            }
          }, [(tick.label || slots["tick-label"]) && createVNode("div", {
            "class": "v-slider-track__tick-label"
          }, [((_slots$tickLabel = slots["tick-label"]) == null ? void 0 : _slots$tickLabel.call(slots, {
            tick,
            index
          })) ?? tick.label])]);
        });
      });
      useRender(() => {
        return createVNode("div", {
          "class": ["v-slider-track", roundedClasses.value],
          "style": {
            "--v-slider-track-size": convertToUnit(trackSize.value),
            "--v-slider-tick-size": convertToUnit(tickSize.value),
            direction: !vertical.value ? horizontalDirection.value : void 0
          }
        }, [createVNode("div", {
          "class": ["v-slider-track__background", trackColorClasses.value, {
            "v-slider-track__background--opacity": !!color.value || !trackFillColor.value
          }],
          "style": {
            ...backgroundStyles.value,
            ...trackColorStyles.value
          }
        }, null), createVNode("div", {
          "class": ["v-slider-track__fill", trackFillColorClasses.value],
          "style": {
            ...trackFillStyles.value,
            ...trackFillColorStyles.value
          }
        }, null), showTicks.value && createVNode("div", {
          "class": ["v-slider-track__ticks", {
            "v-slider-track__ticks--always-show": showTicks.value === "always"
          }]
        }, [computedTicks.value])]);
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VSlider/VSlider.mjs
  var VSlider = defineComponent2({
    name: "VSlider",
    props: {
      ...makeFocusProps(),
      ...makeSliderProps(),
      ...makeVInputProps(),
      modelValue: {
        type: [Number, String],
        default: 0
      }
    },
    emits: {
      "update:focused": (value) => true,
      "update:modelValue": (v) => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const thumbContainerRef = ref();
      const {
        min,
        max,
        mousePressed,
        roundValue,
        onSliderMousedown,
        onSliderTouchstart,
        trackContainerRef,
        position,
        hasLabels,
        readonly: readonly2
      } = useSlider({
        props,
        handleSliderMouseUp: (newValue) => model.value = roundValue(newValue),
        handleMouseMove: (newValue) => model.value = roundValue(newValue),
        getActiveThumb: () => {
          var _thumbContainerRef$va;
          return (_thumbContainerRef$va = thumbContainerRef.value) == null ? void 0 : _thumbContainerRef$va.$el;
        }
      });
      const model = useProxiedModel(props, "modelValue", void 0, (v) => {
        const value = typeof v === "string" ? parseFloat(v) : v == null ? min.value : v;
        return roundValue(value);
      });
      const {
        isFocused,
        focus,
        blur
      } = useFocus(props);
      const trackStop = computed2(() => position(model.value));
      useRender(() => {
        const [inputProps, _] = filterInputProps(props);
        const hasPrepend = !!(props.label || slots.label || slots.prepend);
        return createVNode(VInput, mergeProps({
          "class": ["v-slider", {
            "v-slider--has-labels": !!slots["tick-label"] || hasLabels.value,
            "v-slider--focused": isFocused.value,
            "v-slider--pressed": mousePressed.value,
            "v-slider--disabled": props.disabled
          }]
        }, inputProps, {
          "focused": isFocused.value
        }), {
          ...slots,
          prepend: hasPrepend ? (slotProps) => {
            var _slots$label, _slots$prepend;
            return createVNode(Fragment, null, [((_slots$label = slots.label) == null ? void 0 : _slots$label.call(slots, slotProps)) ?? props.label ? createVNode(VLabel, {
              "class": "v-slider__label",
              "text": props.label
            }, null) : void 0, (_slots$prepend = slots.prepend) == null ? void 0 : _slots$prepend.call(slots, slotProps)]);
          } : void 0,
          default: (_ref2) => {
            let {
              id
            } = _ref2;
            return createVNode("div", {
              "class": "v-slider__container",
              "onMousedown": !readonly2.value ? onSliderMousedown : void 0,
              "onTouchstartPassive": !readonly2.value ? onSliderTouchstart : void 0
            }, [createVNode("input", {
              "id": id.value,
              "name": props.name || id.value,
              "disabled": props.disabled,
              "readonly": props.readonly,
              "tabindex": "-1",
              "value": model.value
            }, null), createVNode(VSliderTrack, {
              "ref": trackContainerRef,
              "start": 0,
              "stop": trackStop.value
            }, {
              "tick-label": slots["tick-label"]
            }), createVNode(VSliderThumb, {
              "ref": thumbContainerRef,
              "focused": isFocused.value,
              "min": min.value,
              "max": max.value,
              "modelValue": model.value,
              "onUpdate:modelValue": (v) => model.value = v,
              "position": trackStop.value,
              "elevation": props.elevation,
              "onFocus": focus,
              "onBlur": blur
            }, {
              "thumb-label": slots["thumb-label"]
            })]);
          }
        });
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VColorPicker/VColorPickerPreview.mjs
  var VColorPickerPreview = defineComponent2({
    name: "VColorPickerPreview",
    props: {
      color: {
        type: Object
      },
      disabled: Boolean,
      hideAlpha: Boolean
    },
    emits: {
      "update:color": (color) => true
    },
    setup(props, _ref) {
      let {
        emit: emit2
      } = _ref;
      useRender(() => {
        var _props$color, _props$color2;
        return createVNode("div", {
          "class": ["v-color-picker-preview", {
            "v-color-picker-preview--hide-alpha": props.hideAlpha
          }]
        }, [createVNode("div", {
          "class": "v-color-picker-preview__dot"
        }, [createVNode("div", {
          "style": {
            background: HSVAtoCSS(props.color ?? nullColor)
          }
        }, null)]), createVNode("div", {
          "class": "v-color-picker-preview__sliders"
        }, [createVNode(VSlider, {
          "class": "v-color-picker-preview__track v-color-picker-preview__hue",
          "modelValue": (_props$color = props.color) == null ? void 0 : _props$color.h,
          "onUpdate:modelValue": (h2) => emit2("update:color", {
            ...props.color ?? nullColor,
            h: h2
          }),
          "step": 0,
          "min": 0,
          "max": 360,
          "disabled": props.disabled,
          "thumbSize": 14,
          "trackSize": 8,
          "trackFillColor": "white",
          "hideDetails": true
        }, null), !props.hideAlpha && createVNode(VSlider, {
          "class": "v-color-picker-preview__track v-color-picker-preview__alpha",
          "modelValue": (_props$color2 = props.color) == null ? void 0 : _props$color2.a,
          "onUpdate:modelValue": (a) => emit2("update:color", {
            ...props.color ?? nullColor,
            a
          }),
          "step": 0,
          "min": 0,
          "max": 1,
          "disabled": props.disabled,
          "thumbSize": 14,
          "trackSize": 8,
          "trackFillColor": "white",
          "hideDetails": true
        }, null)])]);
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/util/colors.mjs
  var red = Object.freeze({
    base: "#f44336",
    lighten5: "#ffebee",
    lighten4: "#ffcdd2",
    lighten3: "#ef9a9a",
    lighten2: "#e57373",
    lighten1: "#ef5350",
    darken1: "#e53935",
    darken2: "#d32f2f",
    darken3: "#c62828",
    darken4: "#b71c1c",
    accent1: "#ff8a80",
    accent2: "#ff5252",
    accent3: "#ff1744",
    accent4: "#d50000"
  });
  var pink = Object.freeze({
    base: "#e91e63",
    lighten5: "#fce4ec",
    lighten4: "#f8bbd0",
    lighten3: "#f48fb1",
    lighten2: "#f06292",
    lighten1: "#ec407a",
    darken1: "#d81b60",
    darken2: "#c2185b",
    darken3: "#ad1457",
    darken4: "#880e4f",
    accent1: "#ff80ab",
    accent2: "#ff4081",
    accent3: "#f50057",
    accent4: "#c51162"
  });
  var purple = Object.freeze({
    base: "#9c27b0",
    lighten5: "#f3e5f5",
    lighten4: "#e1bee7",
    lighten3: "#ce93d8",
    lighten2: "#ba68c8",
    lighten1: "#ab47bc",
    darken1: "#8e24aa",
    darken2: "#7b1fa2",
    darken3: "#6a1b9a",
    darken4: "#4a148c",
    accent1: "#ea80fc",
    accent2: "#e040fb",
    accent3: "#d500f9",
    accent4: "#aa00ff"
  });
  var deepPurple = Object.freeze({
    base: "#673ab7",
    lighten5: "#ede7f6",
    lighten4: "#d1c4e9",
    lighten3: "#b39ddb",
    lighten2: "#9575cd",
    lighten1: "#7e57c2",
    darken1: "#5e35b1",
    darken2: "#512da8",
    darken3: "#4527a0",
    darken4: "#311b92",
    accent1: "#b388ff",
    accent2: "#7c4dff",
    accent3: "#651fff",
    accent4: "#6200ea"
  });
  var indigo = Object.freeze({
    base: "#3f51b5",
    lighten5: "#e8eaf6",
    lighten4: "#c5cae9",
    lighten3: "#9fa8da",
    lighten2: "#7986cb",
    lighten1: "#5c6bc0",
    darken1: "#3949ab",
    darken2: "#303f9f",
    darken3: "#283593",
    darken4: "#1a237e",
    accent1: "#8c9eff",
    accent2: "#536dfe",
    accent3: "#3d5afe",
    accent4: "#304ffe"
  });
  var blue = Object.freeze({
    base: "#2196f3",
    lighten5: "#e3f2fd",
    lighten4: "#bbdefb",
    lighten3: "#90caf9",
    lighten2: "#64b5f6",
    lighten1: "#42a5f5",
    darken1: "#1e88e5",
    darken2: "#1976d2",
    darken3: "#1565c0",
    darken4: "#0d47a1",
    accent1: "#82b1ff",
    accent2: "#448aff",
    accent3: "#2979ff",
    accent4: "#2962ff"
  });
  var lightBlue = Object.freeze({
    base: "#03a9f4",
    lighten5: "#e1f5fe",
    lighten4: "#b3e5fc",
    lighten3: "#81d4fa",
    lighten2: "#4fc3f7",
    lighten1: "#29b6f6",
    darken1: "#039be5",
    darken2: "#0288d1",
    darken3: "#0277bd",
    darken4: "#01579b",
    accent1: "#80d8ff",
    accent2: "#40c4ff",
    accent3: "#00b0ff",
    accent4: "#0091ea"
  });
  var cyan = Object.freeze({
    base: "#00bcd4",
    lighten5: "#e0f7fa",
    lighten4: "#b2ebf2",
    lighten3: "#80deea",
    lighten2: "#4dd0e1",
    lighten1: "#26c6da",
    darken1: "#00acc1",
    darken2: "#0097a7",
    darken3: "#00838f",
    darken4: "#006064",
    accent1: "#84ffff",
    accent2: "#18ffff",
    accent3: "#00e5ff",
    accent4: "#00b8d4"
  });
  var teal = Object.freeze({
    base: "#009688",
    lighten5: "#e0f2f1",
    lighten4: "#b2dfdb",
    lighten3: "#80cbc4",
    lighten2: "#4db6ac",
    lighten1: "#26a69a",
    darken1: "#00897b",
    darken2: "#00796b",
    darken3: "#00695c",
    darken4: "#004d40",
    accent1: "#a7ffeb",
    accent2: "#64ffda",
    accent3: "#1de9b6",
    accent4: "#00bfa5"
  });
  var green = Object.freeze({
    base: "#4caf50",
    lighten5: "#e8f5e9",
    lighten4: "#c8e6c9",
    lighten3: "#a5d6a7",
    lighten2: "#81c784",
    lighten1: "#66bb6a",
    darken1: "#43a047",
    darken2: "#388e3c",
    darken3: "#2e7d32",
    darken4: "#1b5e20",
    accent1: "#b9f6ca",
    accent2: "#69f0ae",
    accent3: "#00e676",
    accent4: "#00c853"
  });
  var lightGreen = Object.freeze({
    base: "#8bc34a",
    lighten5: "#f1f8e9",
    lighten4: "#dcedc8",
    lighten3: "#c5e1a5",
    lighten2: "#aed581",
    lighten1: "#9ccc65",
    darken1: "#7cb342",
    darken2: "#689f38",
    darken3: "#558b2f",
    darken4: "#33691e",
    accent1: "#ccff90",
    accent2: "#b2ff59",
    accent3: "#76ff03",
    accent4: "#64dd17"
  });
  var lime = Object.freeze({
    base: "#cddc39",
    lighten5: "#f9fbe7",
    lighten4: "#f0f4c3",
    lighten3: "#e6ee9c",
    lighten2: "#dce775",
    lighten1: "#d4e157",
    darken1: "#c0ca33",
    darken2: "#afb42b",
    darken3: "#9e9d24",
    darken4: "#827717",
    accent1: "#f4ff81",
    accent2: "#eeff41",
    accent3: "#c6ff00",
    accent4: "#aeea00"
  });
  var yellow = Object.freeze({
    base: "#ffeb3b",
    lighten5: "#fffde7",
    lighten4: "#fff9c4",
    lighten3: "#fff59d",
    lighten2: "#fff176",
    lighten1: "#ffee58",
    darken1: "#fdd835",
    darken2: "#fbc02d",
    darken3: "#f9a825",
    darken4: "#f57f17",
    accent1: "#ffff8d",
    accent2: "#ffff00",
    accent3: "#ffea00",
    accent4: "#ffd600"
  });
  var amber = Object.freeze({
    base: "#ffc107",
    lighten5: "#fff8e1",
    lighten4: "#ffecb3",
    lighten3: "#ffe082",
    lighten2: "#ffd54f",
    lighten1: "#ffca28",
    darken1: "#ffb300",
    darken2: "#ffa000",
    darken3: "#ff8f00",
    darken4: "#ff6f00",
    accent1: "#ffe57f",
    accent2: "#ffd740",
    accent3: "#ffc400",
    accent4: "#ffab00"
  });
  var orange = Object.freeze({
    base: "#ff9800",
    lighten5: "#fff3e0",
    lighten4: "#ffe0b2",
    lighten3: "#ffcc80",
    lighten2: "#ffb74d",
    lighten1: "#ffa726",
    darken1: "#fb8c00",
    darken2: "#f57c00",
    darken3: "#ef6c00",
    darken4: "#e65100",
    accent1: "#ffd180",
    accent2: "#ffab40",
    accent3: "#ff9100",
    accent4: "#ff6d00"
  });
  var deepOrange = Object.freeze({
    base: "#ff5722",
    lighten5: "#fbe9e7",
    lighten4: "#ffccbc",
    lighten3: "#ffab91",
    lighten2: "#ff8a65",
    lighten1: "#ff7043",
    darken1: "#f4511e",
    darken2: "#e64a19",
    darken3: "#d84315",
    darken4: "#bf360c",
    accent1: "#ff9e80",
    accent2: "#ff6e40",
    accent3: "#ff3d00",
    accent4: "#dd2c00"
  });
  var brown = Object.freeze({
    base: "#795548",
    lighten5: "#efebe9",
    lighten4: "#d7ccc8",
    lighten3: "#bcaaa4",
    lighten2: "#a1887f",
    lighten1: "#8d6e63",
    darken1: "#6d4c41",
    darken2: "#5d4037",
    darken3: "#4e342e",
    darken4: "#3e2723"
  });
  var blueGrey = Object.freeze({
    base: "#607d8b",
    lighten5: "#eceff1",
    lighten4: "#cfd8dc",
    lighten3: "#b0bec5",
    lighten2: "#90a4ae",
    lighten1: "#78909c",
    darken1: "#546e7a",
    darken2: "#455a64",
    darken3: "#37474f",
    darken4: "#263238"
  });
  var grey = Object.freeze({
    base: "#9e9e9e",
    lighten5: "#fafafa",
    lighten4: "#f5f5f5",
    lighten3: "#eeeeee",
    lighten2: "#e0e0e0",
    lighten1: "#bdbdbd",
    darken1: "#757575",
    darken2: "#616161",
    darken3: "#424242",
    darken4: "#212121"
  });
  var shades = Object.freeze({
    black: "#000000",
    white: "#ffffff",
    transparent: "#ffffff00"
  });
  var colors_default = Object.freeze({
    red,
    pink,
    purple,
    deepPurple,
    indigo,
    blue,
    lightBlue,
    cyan,
    teal,
    green,
    lightGreen,
    lime,
    yellow,
    amber,
    orange,
    deepOrange,
    brown,
    blueGrey,
    grey,
    shades
  });

  // node_modules/vuetify/lib/components/VColorPicker/VColorPickerSwatches.mjs
  function parseDefaultColors(colors) {
    return Object.keys(colors).map((key) => {
      const color = colors[key];
      return color.base ? [color.base, color.darken4, color.darken3, color.darken2, color.darken1, color.lighten1, color.lighten2, color.lighten3, color.lighten4, color.lighten5] : [color.black, color.white, color.transparent];
    });
  }
  var VColorPickerSwatches = defineComponent2({
    name: "VColorPickerSwatches",
    props: {
      swatches: {
        type: Array,
        default: () => parseDefaultColors(colors_default)
      },
      disabled: Boolean,
      color: Object,
      maxHeight: [Number, String]
    },
    emits: {
      "update:color": (color) => true
    },
    setup(props, _ref) {
      let {
        emit: emit2
      } = _ref;
      useRender(() => createVNode("div", {
        "class": "v-color-picker-swatches",
        "style": {
          maxHeight: convertToUnit(props.maxHeight)
        }
      }, [createVNode("div", null, [props.swatches.map((swatch) => createVNode("div", {
        "class": "v-color-picker-swatches__swatch"
      }, [swatch.map((color) => {
        const hsva = parseColor(color);
        return createVNode("div", {
          "class": "v-color-picker-swatches__color",
          "onClick": () => hsva && emit2("update:color", hsva)
        }, [createVNode("div", {
          "style": {
            background: color
          }
        }, [props.color && deepEqual(props.color, hsva) ? createVNode(VIcon, {
          "size": "x-small",
          "icon": "$success",
          "color": getContrast(color, "#FFFFFF") > 2 ? "white" : "black"
        }, null) : void 0])]);
      })]))])]));
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VSheet/VSheet.mjs
  var VSheet = defineComponent2({
    name: "VSheet",
    props: {
      color: String,
      ...makeBorderProps(),
      ...makeDimensionProps(),
      ...makeElevationProps(),
      ...makeLocationProps(),
      ...makePositionProps(),
      ...makeRoundedProps(),
      ...makeTagProps(),
      ...makeThemeProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        themeClasses
      } = provideTheme(props);
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(toRef(props, "color"));
      const {
        borderClasses
      } = useBorder(props);
      const {
        dimensionStyles
      } = useDimension(props);
      const {
        elevationClasses
      } = useElevation(props);
      const {
        locationStyles
      } = useLocation(props);
      const {
        positionClasses
      } = usePosition(props);
      const {
        roundedClasses
      } = useRounded(props);
      return () => createVNode(props.tag, {
        "class": ["v-sheet", themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value],
        "style": [backgroundColorStyles.value, dimensionStyles.value, locationStyles.value]
      }, slots);
    }
  });

  // node_modules/vuetify/lib/components/VColorPicker/VColorPicker.mjs
  var VColorPicker = defineComponent2({
    name: "VColorPicker",
    inheritAttrs: false,
    props: {
      canvasHeight: {
        type: [String, Number],
        default: 150
      },
      disabled: Boolean,
      dotSize: {
        type: [Number, String],
        default: 10
      },
      hideCanvas: Boolean,
      hideSliders: Boolean,
      hideInputs: Boolean,
      mode: {
        type: String,
        default: "rgba",
        validator: (v) => Object.keys(modes).includes(v)
      },
      modes: {
        type: Array,
        default: () => Object.keys(modes),
        validator: (v) => Array.isArray(v) && v.every((m) => Object.keys(modes).includes(m))
      },
      showSwatches: Boolean,
      swatches: Array,
      swatchesMaxHeight: {
        type: [Number, String],
        default: 150
      },
      modelValue: {
        type: [Object, String]
      },
      width: {
        type: [Number, String],
        default: 300
      },
      ...makeElevationProps(),
      ...makeRoundedProps(),
      ...makeThemeProps()
    },
    emits: {
      "update:modelValue": (color) => true,
      "update:mode": (mode) => true
    },
    setup(props) {
      const mode = useProxiedModel(props, "mode");
      const lastPickedColor = ref(null);
      const currentColor = useProxiedModel(props, "modelValue", void 0, (v) => {
        let c = parseColor(v);
        if (!c)
          return null;
        if (lastPickedColor.value) {
          c = {
            ...c,
            h: lastPickedColor.value.h
          };
          lastPickedColor.value = null;
        }
        return c;
      }, (v) => {
        if (!v)
          return null;
        return extractColor(v, props.modelValue);
      });
      const updateColor = (hsva) => {
        currentColor.value = hsva;
        lastPickedColor.value = hsva;
      };
      onMounted(() => {
        if (!props.modes.includes(mode.value))
          mode.value = props.modes[0];
      });
      useRender(() => createVNode(VSheet, {
        "rounded": props.rounded,
        "elevation": props.elevation,
        "theme": props.theme,
        "class": ["v-color-picker"],
        "style": {
          "--v-color-picker-color-hsv": HSVAtoCSS({
            ...currentColor.value ?? nullColor,
            a: 1
          })
        },
        "maxWidth": props.width
      }, {
        default: () => [!props.hideCanvas && createVNode(VColorPickerCanvas, {
          "key": "canvas",
          "color": currentColor.value,
          "onUpdate:color": updateColor,
          "disabled": props.disabled,
          "dotSize": props.dotSize,
          "width": props.width,
          "height": props.canvasHeight
        }, null), (!props.hideSliders || !props.hideInputs) && createVNode("div", {
          "key": "controls",
          "class": "v-color-picker__controls"
        }, [!props.hideSliders && createVNode(VColorPickerPreview, {
          "key": "preview",
          "color": currentColor.value,
          "onUpdate:color": updateColor,
          "hideAlpha": !mode.value.endsWith("a"),
          "disabled": props.disabled
        }, null), !props.hideInputs && createVNode(VColorPickerEdit, {
          "key": "edit",
          "modes": props.modes,
          "mode": mode.value,
          "onUpdate:mode": (m) => mode.value = m,
          "color": currentColor.value,
          "onUpdate:color": updateColor,
          "disabled": props.disabled
        }, null)]), props.showSwatches && createVNode(VColorPickerSwatches, {
          "key": "swatches",
          "color": currentColor.value,
          "onUpdate:color": updateColor,
          "maxHeight": props.swatchesMaxHeight,
          "swatches": props.swatches,
          "disabled": props.disabled
        }, null)]
      }));
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VCombobox/VCombobox.mjs
  function highlightResult2(text, matches, length) {
    if (Array.isArray(matches))
      throw new Error("Multiple matches is not implemented");
    return typeof matches === "number" && ~matches ? createVNode(Fragment, null, [createVNode("span", {
      "class": "v-combobox__unmask"
    }, [text.substr(0, matches)]), createVNode("span", {
      "class": "v-combobox__mask"
    }, [text.substr(matches, length)]), createVNode("span", {
      "class": "v-combobox__unmask"
    }, [text.substr(matches + length)])]) : text;
  }
  var VCombobox = genericComponent()({
    name: "VCombobox",
    props: {
      delimiters: Array,
      ...makeFilterProps({
        filterKeys: ["title"]
      }),
      ...makeSelectProps({
        hideNoData: true,
        returnObject: true
      }),
      ...makeTransitionProps({
        transition: false
      })
    },
    emits: {
      "update:modelValue": (val) => true,
      "update:searchInput": (val) => true,
      "update:menu": (val) => true
    },
    setup(props, _ref) {
      let {
        emit: emit2,
        slots
      } = _ref;
      const {
        t
      } = useLocale();
      const vTextFieldRef = ref();
      const isFocused = ref(false);
      const isPristine = ref(true);
      const menu = useProxiedModel(props, "menu");
      const selectionIndex = ref(-1);
      const color = computed2(() => {
        var _vTextFieldRef$value;
        return (_vTextFieldRef$value = vTextFieldRef.value) == null ? void 0 : _vTextFieldRef$value.color;
      });
      const {
        items,
        transformIn,
        transformOut
      } = useItems(props);
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(color);
      const model = useProxiedModel(props, "modelValue", [], (v) => transformIn(wrapInArray(v || [])), (v) => {
        const transformed = transformOut(v);
        return props.multiple ? transformed : transformed[0] ?? null;
      });
      const _search = ref("");
      const search = computed2({
        get: () => {
          return _search.value;
        },
        set: (val) => {
          var _props$delimiters;
          _search.value = val;
          if (!props.multiple) {
            model.value = [transformItem(props, val)];
          }
          if (val && props.multiple && (_props$delimiters = props.delimiters) != null && _props$delimiters.length) {
            const values = val.split(new RegExp(`(?:${props.delimiters.join("|")})+`));
            if (values.length > 1) {
              values.forEach((v) => {
                v = v.trim();
                if (v)
                  select(transformItem(props, v));
              });
              _search.value = "";
            }
          }
          if (!val)
            selectionIndex.value = -1;
          if (isFocused.value)
            menu.value = true;
          isPristine.value = !val;
        }
      });
      watch(_search, (value) => {
        emit2("update:searchInput", value);
      });
      const {
        filteredItems
      } = useFilter(props, items, computed2(() => isPristine.value ? void 0 : search.value));
      const selections = computed2(() => {
        return model.value.map((v) => {
          return items.value.find((item) => item.value === v.value) || v;
        });
      });
      const selected = computed2(() => selections.value.map((selection2) => selection2.props.value));
      const selection = computed2(() => selections.value[selectionIndex.value]);
      function onClear(e) {
        model.value = [];
        if (props.openOnClear) {
          menu.value = true;
        }
      }
      function onClickControl() {
        if (props.hideNoData && !items.value.length || props.readonly)
          return;
        menu.value = true;
      }
      function onKeydown(e) {
        if (props.readonly)
          return;
        const selectionStart = vTextFieldRef.value.selectionStart;
        const length = selected.value.length;
        if (selectionIndex.value > -1)
          e.preventDefault();
        if (["Enter", "ArrowDown"].includes(e.key)) {
          menu.value = true;
        }
        if (["Escape"].includes(e.key)) {
          menu.value = false;
        }
        if (["Enter", "Escape", "Tab"].includes(e.key)) {
          isPristine.value = true;
        }
        if (!props.multiple)
          return;
        if (["Backspace", "Delete"].includes(e.key)) {
          if (selectionIndex.value < 0) {
            if (e.key === "Backspace" && !search.value) {
              selectionIndex.value = length - 1;
            }
            return;
          }
          select(selection.value);
          nextTick(() => !selection.value && (selectionIndex.value = length - 2));
        }
        if (e.key === "ArrowLeft") {
          if (selectionIndex.value < 0 && selectionStart > 0)
            return;
          const prev = selectionIndex.value > -1 ? selectionIndex.value - 1 : length - 1;
          if (selections.value[prev]) {
            selectionIndex.value = prev;
          } else {
            selectionIndex.value = -1;
            vTextFieldRef.value.setSelectionRange(search.value.length, search.value.length);
          }
        }
        if (e.key === "ArrowRight") {
          if (selectionIndex.value < 0)
            return;
          const next = selectionIndex.value + 1;
          if (selections.value[next]) {
            selectionIndex.value = next;
          } else {
            selectionIndex.value = -1;
            vTextFieldRef.value.setSelectionRange(0, 0);
          }
        }
        if (e.key === "Enter") {
          select(transformItem(props, search.value));
          search.value = "";
        }
      }
      function onAfterLeave() {
        if (isFocused.value)
          isPristine.value = true;
      }
      function select(item) {
        if (props.multiple) {
          const index = selected.value.findIndex((selection2) => selection2 === item.value);
          if (index === -1) {
            model.value = [...model.value, item];
          } else {
            const value = [...model.value];
            value.splice(index, 1);
            model.value = value;
          }
          search.value = "";
        } else {
          search.value = item.title;
          nextTick(() => {
            menu.value = false;
            isPristine.value = true;
          });
        }
      }
      watch(filteredItems, (val) => {
        if (!val.length && props.hideNoData)
          menu.value = false;
      });
      watch(isFocused, (val) => {
        if (val) {
          selectionIndex.value = -1;
        } else {
          menu.value = false;
          if (!props.multiple || !search.value)
            return;
          model.value = [...model.value, transformItem(props, search.value)];
          search.value = "";
        }
      });
      useRender(() => {
        const hasChips = !!(props.chips || slots.chip);
        return createVNode(VTextField, {
          "ref": vTextFieldRef,
          "modelValue": search.value,
          "onUpdate:modelValue": [($event) => search.value = $event, (v) => {
            if (v == null)
              model.value = [];
          }],
          "validationValue": model.externalValue,
          "dirty": model.value.length > 0,
          "class": ["v-combobox", {
            "v-combobox--active-menu": menu.value,
            "v-combobox--chips": !!props.chips,
            "v-combobox--selecting-index": selectionIndex.value > -1,
            [`v-combobox--${props.multiple ? "multiple" : "single"}`]: true
          }],
          "appendInnerIcon": props.items.length ? props.menuIcon : void 0,
          "readonly": props.readonly,
          "onClick:clear": onClear,
          "onClick:control": onClickControl,
          "onClick:input": onClickControl,
          "onFocus": () => isFocused.value = true,
          "onBlur": () => isFocused.value = false,
          "onKeydown": onKeydown
        }, {
          ...slots,
          default: () => {
            var _slots$noData;
            return createVNode(Fragment, null, [createVNode(VMenu, mergeProps({
              "modelValue": menu.value,
              "onUpdate:modelValue": ($event) => menu.value = $event,
              "activator": "parent",
              "contentClass": "v-combobox__content",
              "eager": props.eager,
              "openOnClick": false,
              "closeOnContentClick": false,
              "transition": props.transition,
              "onAfterLeave": onAfterLeave
            }, props.menuProps), {
              default: () => [createVNode(VList, {
                "selected": selected.value,
                "selectStrategy": props.multiple ? "independent" : "single-independent",
                "onMousedown": (e) => e.preventDefault()
              }, {
                default: () => [!filteredItems.value.length && !props.hideNoData && (((_slots$noData = slots["no-data"]) == null ? void 0 : _slots$noData.call(slots)) ?? createVNode(VListItem, {
                  "title": t(props.noDataText)
                }, null)), filteredItems.value.map((_ref2, index) => {
                  var _slots$item;
                  let {
                    item,
                    matches
                  } = _ref2;
                  return ((_slots$item = slots.item) == null ? void 0 : _slots$item.call(slots, {
                    item,
                    index,
                    props: mergeProps(item.props, {
                      onClick: () => select(item)
                    })
                  })) ?? createVNode(VListItem, mergeProps({
                    "key": index
                  }, item.props, {
                    "onClick": () => select(item)
                  }), {
                    prepend: (_ref3) => {
                      let {
                        isSelected
                      } = _ref3;
                      return props.multiple && !props.hideSelected ? createVNode(VCheckboxBtn, {
                        "modelValue": isSelected,
                        "ripple": false
                      }, null) : void 0;
                    },
                    title: () => {
                      var _search$value;
                      return isPristine.value ? item.title : highlightResult2(item.title, matches.title, ((_search$value = search.value) == null ? void 0 : _search$value.length) ?? 0);
                    }
                  });
                })]
              })]
            }), selections.value.map((item, index) => {
              function onChipClose(e) {
                e.stopPropagation();
                e.preventDefault();
                select(item);
              }
              const slotProps = {
                "onClick:close": onChipClose,
                modelValue: true
              };
              return createVNode("div", {
                "key": index,
                "class": ["v-combobox__selection", index === selectionIndex.value && ["v-combobox__selection--selected", textColorClasses.value]],
                "style": index === selectionIndex.value ? textColorStyles.value : {}
              }, [hasChips ? createVNode(VDefaultsProvider, {
                "defaults": {
                  VChip: {
                    closable: props.closableChips,
                    size: "small",
                    text: item.title
                  }
                }
              }, {
                default: () => [slots.chip ? slots.chip({
                  item,
                  index,
                  props: slotProps
                }) : createVNode(VChip, slotProps, null)]
              }) : slots.selection ? slots.selection({
                item,
                index
              }) : createVNode("span", {
                "class": "v-combobox__selection-text"
              }, [item.title, props.multiple && index < selections.value.length - 1 && createVNode("span", {
                "class": "v-combobox__selection-comma"
              }, [createTextVNode(",")])])]);
            })]);
          }
        });
      });
      return forwardRefs({
        isFocused,
        isPristine,
        menu,
        search,
        selectionIndex,
        filteredItems,
        select
      }, vTextFieldRef);
    }
  });

  // node_modules/vuetify/lib/components/VDialog/VDialog.mjs
  var VDialog = genericComponent()({
    name: "VDialog",
    inheritAttrs: false,
    props: {
      fullscreen: Boolean,
      origin: {
        type: String,
        default: "center center"
      },
      retainFocus: {
        type: Boolean,
        default: true
      },
      scrollable: Boolean,
      modelValue: Boolean,
      ...makeTransitionProps({
        transition: {
          component: VDialogTransition
        }
      })
    },
    emits: {
      "update:modelValue": (value) => true
    },
    setup(props, _ref) {
      let {
        attrs,
        slots
      } = _ref;
      const isActive = useProxiedModel(props, "modelValue");
      const {
        scopeId
      } = useScopeId();
      const overlay = ref();
      function onFocusin(e) {
        var _overlay$value, _overlay$value2;
        const before = e.relatedTarget;
        const after = e.target;
        if (before !== after && (_overlay$value = overlay.value) != null && _overlay$value.contentEl && (_overlay$value2 = overlay.value) != null && _overlay$value2.globalTop && ![document, overlay.value.contentEl].includes(after) && !overlay.value.contentEl.contains(after)) {
          const focusable = [...overlay.value.contentEl.querySelectorAll('button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])')].filter((el) => !el.hasAttribute("disabled") && !el.matches('[tabindex="-1"]'));
          if (!focusable.length)
            return;
          const firstElement = focusable[0];
          const lastElement = focusable[focusable.length - 1];
          if (before === firstElement) {
            lastElement.focus();
          } else {
            firstElement.focus();
          }
        }
      }
      if (IN_BROWSER) {
        watch(() => isActive.value && props.retainFocus, (val) => {
          val ? document.addEventListener("focusin", onFocusin) : document.removeEventListener("focusin", onFocusin);
        }, {
          immediate: true
        });
      }
      watch(isActive, async (val) => {
        await nextTick();
        if (val) {
          var _contentEl;
          (_contentEl = overlay.value.contentEl) == null ? void 0 : _contentEl.focus({
            preventScroll: true
          });
        } else {
          var _activatorEl;
          (_activatorEl = overlay.value.activatorEl) == null ? void 0 : _activatorEl.focus({
            preventScroll: true
          });
        }
      });
      useRender(() => createVNode(VOverlay, mergeProps({
        "modelValue": isActive.value,
        "onUpdate:modelValue": ($event) => isActive.value = $event,
        "class": ["v-dialog", {
          "v-dialog--fullscreen": props.fullscreen,
          "v-dialog--scrollable": props.scrollable
        }],
        "transition": props.transition,
        "scrollStrategy": "block",
        "ref": overlay,
        "aria-role": "dialog",
        "aria-modal": "true",
        "activatorProps": {
          "aria-haspopup": "dialog",
          "aria-expanded": String(isActive.value)
        },
        "z-index": 2400
      }, scopeId, attrs), {
        activator: slots.activator,
        default: function() {
          var _slots$default;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return createVNode(VDefaultsProvider, {
            "root": true
          }, {
            default: () => [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, ...args)]
          });
        }
      }));
      return forwardRefs({}, overlay);
    }
  });

  // node_modules/vuetify/lib/components/VExpansionPanel/VExpansionPanels.mjs
  var VExpansionPanelSymbol = Symbol.for("vuetify:v-expansion-panel");
  var allowedVariants3 = ["default", "accordion", "inset", "popout"];
  var VExpansionPanels = defineComponent2({
    name: "VExpansionPanels",
    props: {
      color: String,
      variant: {
        type: String,
        default: "default",
        validator: (v) => allowedVariants3.includes(v)
      },
      readonly: Boolean,
      ...makeGroupProps(),
      ...makeTagProps(),
      ...makeThemeProps()
    },
    emits: {
      "update:modelValue": (val) => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      useGroup(props, VExpansionPanelSymbol);
      const {
        themeClasses
      } = provideTheme(props);
      const variantClass = computed2(() => props.variant && `v-expansion-panels--variant-${props.variant}`);
      provideDefaults({
        VExpansionPanel: {
          color: toRef(props, "color")
        },
        VExpansionPanelTitle: {
          readonly: toRef(props, "readonly")
        }
      });
      useRender(() => createVNode(props.tag, {
        "class": ["v-expansion-panels", themeClasses.value, variantClass.value]
      }, slots));
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VExpansionPanel/VExpansionPanelTitle.mjs
  var makeVExpansionPanelTitleProps = propsFactory({
    color: String,
    expandIcon: {
      type: IconValue,
      default: "$expand"
    },
    collapseIcon: {
      type: IconValue,
      default: "$collapse"
    },
    hideActions: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: false
    },
    readonly: Boolean
  });
  var VExpansionPanelTitle = defineComponent2({
    name: "VExpansionPanelTitle",
    directives: {
      Ripple
    },
    props: {
      ...makeVExpansionPanelTitleProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const expansionPanel = inject(VExpansionPanelSymbol);
      if (!expansionPanel)
        throw new Error("[Vuetify] v-expansion-panel-title needs to be placed inside v-expansion-panel");
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(props, "color");
      const slotProps = computed2(() => ({
        collapseIcon: props.collapseIcon,
        disabled: expansionPanel.disabled.value,
        expanded: expansionPanel.isSelected.value,
        expandIcon: props.expandIcon,
        readonly: props.readonly
      }));
      useRender(() => {
        var _slots$default;
        return withDirectives(createVNode("button", {
          "class": ["v-expansion-panel-title", {
            "v-expansion-panel-title--active": expansionPanel.isSelected.value
          }, backgroundColorClasses.value],
          "style": backgroundColorStyles.value,
          "type": "button",
          "tabindex": expansionPanel.disabled.value ? -1 : void 0,
          "disabled": expansionPanel.disabled.value,
          "aria-expanded": expansionPanel.isSelected.value,
          "onClick": !props.readonly ? expansionPanel.toggle : void 0
        }, [createVNode("span", {
          "class": "v-expansion-panel-title__overlay"
        }, null), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, slotProps.value), !props.hideActions && createVNode("span", {
          "class": "v-expansion-panel-title__icon"
        }, [slots.actions ? slots.actions(slotProps.value) : createVNode(VIcon, {
          "icon": expansionPanel.isSelected.value ? props.collapseIcon : props.expandIcon
        }, null)])]), [[resolveDirective("ripple"), props.ripple]]);
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VExpansionPanel/VExpansionPanelText.mjs
  var VExpansionPanelText = defineComponent2({
    name: "VExpansionPanelText",
    props: {
      ...makeLazyProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const expansionPanel = inject(VExpansionPanelSymbol);
      if (!expansionPanel)
        throw new Error("[Vuetify] v-expansion-panel-text needs to be placed inside v-expansion-panel");
      const {
        hasContent,
        onAfterLeave
      } = useLazy(props, expansionPanel.isSelected);
      useRender(() => {
        var _slots$default;
        return createVNode(VExpandTransition, {
          "onAfterLeave": onAfterLeave
        }, {
          default: () => [withDirectives(createVNode("div", {
            "class": "v-expansion-panel-text"
          }, [slots.default && hasContent.value && createVNode("div", {
            "class": "v-expansion-panel-text__wrapper"
          }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)])]), [[vShow, expansionPanel.isSelected.value]])]
        });
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VExpansionPanel/VExpansionPanel.mjs
  var VExpansionPanel = defineComponent2({
    name: "VExpansionPanel",
    props: {
      title: String,
      text: String,
      bgColor: String,
      ...makeElevationProps(),
      ...makeGroupItemProps(),
      ...makeLazyProps(),
      ...makeRoundedProps(),
      ...makeTagProps(),
      ...makeVExpansionPanelTitleProps()
    },
    emits: {
      "group:selected": (val) => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const groupItem = useGroupItem(props, VExpansionPanelSymbol);
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(props, "bgColor");
      const {
        elevationClasses
      } = useElevation(props);
      const {
        roundedClasses
      } = useRounded(props);
      const isDisabled = computed2(() => (groupItem == null ? void 0 : groupItem.disabled.value) || props.disabled);
      const selectedIndices = computed2(() => groupItem.group.items.value.reduce((arr, item, index) => {
        if (groupItem.group.selected.value.includes(item.id))
          arr.push(index);
        return arr;
      }, []));
      const isBeforeSelected = computed2(() => {
        const index = groupItem.group.items.value.findIndex((item) => item.id === groupItem.id);
        return !groupItem.isSelected.value && selectedIndices.value.some((selectedIndex) => selectedIndex - index === 1);
      });
      const isAfterSelected = computed2(() => {
        const index = groupItem.group.items.value.findIndex((item) => item.id === groupItem.id);
        return !groupItem.isSelected.value && selectedIndices.value.some((selectedIndex) => selectedIndex - index === -1);
      });
      provide(VExpansionPanelSymbol, groupItem);
      useRender(() => {
        var _slots$default;
        const hasText = !!(slots.text || props.text);
        const hasTitle = !!(slots.title || props.title);
        return createVNode(props.tag, {
          "class": ["v-expansion-panel", {
            "v-expansion-panel--active": groupItem.isSelected.value,
            "v-expansion-panel--before-active": isBeforeSelected.value,
            "v-expansion-panel--after-active": isAfterSelected.value,
            "v-expansion-panel--disabled": isDisabled.value
          }, roundedClasses.value, backgroundColorClasses.value],
          "style": backgroundColorStyles.value,
          "aria-expanded": groupItem.isSelected.value
        }, {
          default: () => [createVNode("div", {
            "class": ["v-expansion-panel__shadow", ...elevationClasses.value]
          }, null), hasTitle && createVNode(VExpansionPanelTitle, {
            "key": "title",
            "collapseIcon": props.collapseIcon,
            "color": props.color,
            "expandIcon": props.expandIcon,
            "hideActions": props.hideActions,
            "ripple": props.ripple
          }, {
            default: () => [slots.title ? slots.title() : props.title]
          }), hasText && createVNode(VExpansionPanelText, {
            "key": "text",
            "eager": props.eager
          }, {
            default: () => [slots.text ? slots.text() : props.text]
          }), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]
        });
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VFileInput/VFileInput.mjs
  var VFileInput = defineComponent2({
    name: "VFileInput",
    inheritAttrs: false,
    props: {
      chips: Boolean,
      counter: Boolean,
      counterSizeString: {
        type: String,
        default: "$vuetify.fileInput.counterSize"
      },
      counterString: {
        type: String,
        default: "$vuetify.fileInput.counter"
      },
      multiple: Boolean,
      hint: String,
      persistentHint: Boolean,
      placeholder: String,
      showSize: {
        type: [Boolean, Number],
        default: false,
        validator: (v) => {
          return typeof v === "boolean" || [1e3, 1024].includes(v);
        }
      },
      ...makeVInputProps({
        prependIcon: "$file"
      }),
      modelValue: {
        type: Array,
        default: () => [],
        validator: (val) => {
          return wrapInArray(val).every((v) => v != null && typeof v === "object");
        }
      },
      ...makeVFieldProps({
        clearable: true
      })
    },
    emits: {
      "click:control": (e) => true,
      "update:modelValue": (files) => true
    },
    setup(props, _ref) {
      let {
        attrs,
        emit: emit2,
        slots
      } = _ref;
      const {
        t
      } = useLocale();
      const model = useProxiedModel(props, "modelValue");
      const base = computed2(() => typeof props.showSize !== "boolean" ? props.showSize : void 0);
      const totalBytes = computed2(() => (model.value ?? []).reduce((bytes, _ref2) => {
        let {
          size: size2 = 0
        } = _ref2;
        return bytes + size2;
      }, 0));
      const totalBytesReadable = computed2(() => humanReadableFileSize(totalBytes.value, base.value));
      const fileNames = computed2(() => (model.value ?? []).map((file) => {
        const {
          name = "",
          size: size2 = 0
        } = file;
        return !props.showSize ? name : `${name} (${humanReadableFileSize(size2, base.value)})`;
      }));
      const counterValue = computed2(() => {
        var _model$value;
        const fileCount = ((_model$value = model.value) == null ? void 0 : _model$value.length) ?? 0;
        if (props.showSize)
          return t(props.counterSizeString, fileCount, totalBytesReadable.value);
        else
          return t(props.counterString, fileCount);
      });
      const vInputRef = ref();
      const vFieldRef = ref();
      const isFocused = ref(false);
      const inputRef = ref();
      const messages = computed2(() => {
        return props.messages.length ? props.messages : props.persistentHint ? props.hint : "";
      });
      function onFocus() {
        if (inputRef.value !== document.activeElement) {
          var _inputRef$value;
          (_inputRef$value = inputRef.value) == null ? void 0 : _inputRef$value.focus();
        }
        if (!isFocused.value) {
          isFocused.value = true;
        }
      }
      function onClickPrepend(e) {
        callEvent(props["onClick:prepend"], e);
        onControlClick(e);
      }
      function onControlClick(e) {
        var _inputRef$value2;
        (_inputRef$value2 = inputRef.value) == null ? void 0 : _inputRef$value2.click();
        emit2("click:control", e);
      }
      function onClear(e) {
        e.stopPropagation();
        onFocus();
        nextTick(() => {
          model.value = [];
          if (inputRef != null && inputRef.value) {
            inputRef.value.value = "";
          }
          callEvent(props["onClick:clear"], e);
        });
      }
      useRender(() => {
        const hasCounter = !!(slots.counter || props.counter);
        const hasDetails = !!(hasCounter || slots.details);
        const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
        const [{
          modelValue: _,
          ...inputProps
        }] = filterInputProps(props);
        const [fieldProps] = filterFieldProps(props);
        return createVNode(VInput, mergeProps({
          "ref": vInputRef,
          "modelValue": model.value,
          "onUpdate:modelValue": ($event) => model.value = $event,
          "class": "v-file-input",
          "onClick:prepend": onClickPrepend,
          "onClick:append": props["onClick:append"]
        }, rootAttrs, inputProps, {
          "messages": messages.value
        }), {
          ...slots,
          default: (_ref3) => {
            let {
              isDisabled,
              isDirty,
              isReadonly: isReadonly2,
              isValid
            } = _ref3;
            return createVNode(VField, mergeProps({
              "ref": vFieldRef,
              "prepend-icon": props.prependIcon,
              "onClick:control": onControlClick,
              "onClick:clear": onClear,
              "onClick:prependInner": props["onClick:prependInner"],
              "onClick:appendInner": props["onClick:appendInner"]
            }, fieldProps, {
              "active": isDirty.value || isFocused.value,
              "dirty": isDirty.value,
              "focused": isFocused.value,
              "error": isValid.value === false
            }), {
              ...slots,
              default: (_ref4) => {
                let {
                  props: {
                    class: fieldClass,
                    ...slotProps
                  }
                } = _ref4;
                return createVNode(Fragment, null, [createVNode("input", mergeProps({
                  "ref": inputRef,
                  "type": "file",
                  "readonly": isReadonly2.value,
                  "disabled": isDisabled.value,
                  "multiple": props.multiple,
                  "name": props.name,
                  "onClick": (e) => {
                    e.stopPropagation();
                    onFocus();
                  },
                  "onChange": (e) => {
                    if (!e.target)
                      return;
                    const target = e.target;
                    model.value = [...target.files ?? []];
                  },
                  "onFocus": onFocus,
                  "onBlur": () => isFocused.value = false
                }, slotProps, inputAttrs), null), createVNode("div", {
                  "class": fieldClass
                }, [model.value.length > 0 && (slots.selection ? slots.selection({
                  fileNames: fileNames.value,
                  totalBytes: totalBytes.value,
                  totalBytesReadable: totalBytesReadable.value
                }) : props.chips ? fileNames.value.map((text) => createVNode(VChip, {
                  "key": text,
                  "size": "small",
                  "color": props.color
                }, {
                  default: () => [text]
                })) : fileNames.value.join(", "))])]);
              }
            });
          },
          details: hasDetails ? (slotProps) => {
            var _slots$details;
            return createVNode(Fragment, null, [(_slots$details = slots.details) == null ? void 0 : _slots$details.call(slots, slotProps), hasCounter && createVNode(Fragment, null, [createVNode("span", null, null), createVNode(VCounter, {
              "active": !!model.value.length,
              "value": counterValue.value
            }, slots.counter)])]);
          } : void 0
        });
      });
      return forwardRefs({}, vInputRef, vFieldRef, inputRef);
    }
  });

  // node_modules/vuetify/lib/components/VFooter/VFooter.mjs
  var VFooter = defineComponent2({
    name: "VFooter",
    props: {
      app: Boolean,
      color: String,
      height: {
        type: [Number, String],
        default: "auto"
      },
      ...makeBorderProps(),
      ...makeElevationProps(),
      ...makeLayoutItemProps(),
      ...makeRoundedProps(),
      ...makeTagProps({
        tag: "footer"
      }),
      ...makeThemeProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        themeClasses
      } = provideTheme(props);
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(toRef(props, "color"));
      const {
        borderClasses
      } = useBorder(props);
      const {
        elevationClasses
      } = useElevation(props);
      const {
        roundedClasses
      } = useRounded(props);
      const autoHeight = ref(32);
      const {
        resizeRef
      } = useResizeObserver((entries) => {
        if (!entries.length)
          return;
        autoHeight.value = entries[0].target.clientHeight;
      });
      const height = computed2(() => props.height === "auto" ? autoHeight.value : parseInt(props.height, 10));
      const {
        layoutItemStyles
      } = useLayoutItem({
        id: props.name,
        order: computed2(() => parseInt(props.order, 10)),
        position: computed2(() => "bottom"),
        layoutSize: height,
        elementSize: computed2(() => props.height === "auto" ? void 0 : height.value),
        active: computed2(() => props.app),
        absolute: toRef(props, "absolute")
      });
      useRender(() => createVNode(props.tag, {
        "ref": resizeRef,
        "class": ["v-footer", themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value],
        "style": [backgroundColorStyles, props.app ? layoutItemStyles.value : void 0]
      }, slots));
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VForm/VForm.mjs
  var VForm = defineComponent2({
    name: "VForm",
    props: {
      ...makeFormProps()
    },
    emits: {
      "update:modelValue": (val) => true,
      submit: (e) => true
    },
    setup(props, _ref) {
      let {
        slots,
        emit: emit2
      } = _ref;
      const form = createForm(props);
      const formRef = ref();
      function onReset(e) {
        e.preventDefault();
        form.reset();
      }
      function onSubmit(_e) {
        const e = _e;
        const ready = form.validate();
        e.then = ready.then.bind(ready);
        e.catch = ready.catch.bind(ready);
        e.finally = ready.finally.bind(ready);
        emit2("submit", e);
        if (!e.defaultPrevented) {
          ready.then((_ref2) => {
            let {
              valid
            } = _ref2;
            if (valid) {
              var _formRef$value;
              (_formRef$value = formRef.value) == null ? void 0 : _formRef$value.submit();
            }
          });
        }
        e.preventDefault();
      }
      useRender(() => {
        var _slots$default;
        return createVNode("form", {
          "ref": formRef,
          "class": "v-form",
          "novalidate": true,
          "onReset": onReset,
          "onSubmit": onSubmit
        }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, form)]);
      });
      return forwardRefs(form, formRef);
    }
  });

  // node_modules/vuetify/lib/components/VGrid/VContainer.mjs
  var VContainer = defineComponent2({
    name: "VContainer",
    props: {
      fluid: {
        type: Boolean,
        default: false
      },
      ...makeTagProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      useRender(() => createVNode(props.tag, {
        "class": ["v-container", {
          "v-container--fluid": props.fluid
        }]
      }, slots));
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VGrid/VCol.mjs
  var breakpoints = ["sm", "md", "lg", "xl", "xxl"];
  var breakpointProps = (() => {
    return breakpoints.reduce((props, val) => {
      props[val] = {
        type: [Boolean, String, Number],
        default: false
      };
      return props;
    }, {});
  })();
  var offsetProps = (() => {
    return breakpoints.reduce((props, val) => {
      props["offset" + capitalize(val)] = {
        type: [String, Number],
        default: null
      };
      return props;
    }, {});
  })();
  var orderProps = (() => {
    return breakpoints.reduce((props, val) => {
      props["order" + capitalize(val)] = {
        type: [String, Number],
        default: null
      };
      return props;
    }, {});
  })();
  var propMap = {
    col: Object.keys(breakpointProps),
    offset: Object.keys(offsetProps),
    order: Object.keys(orderProps)
  };
  function breakpointClass(type, prop, val) {
    let className = type;
    if (val == null || val === false) {
      return void 0;
    }
    if (prop) {
      const breakpoint = prop.replace(type, "");
      className += `-${breakpoint}`;
    }
    if (type === "col") {
      className = "v-" + className;
    }
    if (type === "col" && (val === "" || val === true)) {
      return className.toLowerCase();
    }
    className += `-${val}`;
    return className.toLowerCase();
  }
  var ALIGN_SELF_VALUES = ["auto", "start", "end", "center", "baseline", "stretch"];
  var VCol = defineComponent2({
    name: "VCol",
    props: {
      cols: {
        type: [Boolean, String, Number],
        default: false
      },
      ...breakpointProps,
      offset: {
        type: [String, Number],
        default: null
      },
      ...offsetProps,
      order: {
        type: [String, Number],
        default: null
      },
      ...orderProps,
      alignSelf: {
        type: String,
        default: null,
        validator: (str) => ALIGN_SELF_VALUES.includes(str)
      },
      ...makeTagProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const classes = computed2(() => {
        const classList = [];
        let type;
        for (type in propMap) {
          propMap[type].forEach((prop) => {
            const value = props[prop];
            const className = breakpointClass(type, prop, value);
            if (className)
              classList.push(className);
          });
        }
        const hasColClasses = classList.some((className) => className.startsWith("v-col-"));
        classList.push({
          "v-col": !hasColClasses || !props.cols,
          [`v-col-${props.cols}`]: props.cols,
          [`offset-${props.offset}`]: props.offset,
          [`order-${props.order}`]: props.order,
          [`align-self-${props.alignSelf}`]: props.alignSelf
        });
        return classList;
      });
      return () => {
        var _slots$default;
        return h(props.tag, {
          class: classes.value
        }, (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots));
      };
    }
  });

  // node_modules/vuetify/lib/components/VGrid/VRow.mjs
  var breakpoints2 = ["sm", "md", "lg", "xl", "xxl"];
  var ALIGNMENT = ["start", "end", "center"];
  var SPACE = ["space-between", "space-around", "space-evenly"];
  function makeRowProps(prefix, def2) {
    return breakpoints2.reduce((props, val) => {
      props[prefix + capitalize(val)] = def2();
      return props;
    }, {});
  }
  var ALIGN_VALUES = [...ALIGNMENT, "baseline", "stretch"];
  var alignValidator = (str) => ALIGN_VALUES.includes(str);
  var alignProps = makeRowProps("align", () => ({
    type: String,
    default: null,
    validator: alignValidator
  }));
  var JUSTIFY_VALUES = [...ALIGNMENT, ...SPACE];
  var justifyValidator = (str) => JUSTIFY_VALUES.includes(str);
  var justifyProps = makeRowProps("justify", () => ({
    type: String,
    default: null,
    validator: justifyValidator
  }));
  var ALIGN_CONTENT_VALUES = [...ALIGNMENT, ...SPACE, "stretch"];
  var alignContentValidator = (str) => ALIGN_CONTENT_VALUES.includes(str);
  var alignContentProps = makeRowProps("alignContent", () => ({
    type: String,
    default: null,
    validator: alignContentValidator
  }));
  var propMap2 = {
    align: Object.keys(alignProps),
    justify: Object.keys(justifyProps),
    alignContent: Object.keys(alignContentProps)
  };
  var classMap = {
    align: "align",
    justify: "justify",
    alignContent: "align-content"
  };
  function breakpointClass2(type, prop, val) {
    let className = classMap[type];
    if (val == null) {
      return void 0;
    }
    if (prop) {
      const breakpoint = prop.replace(type, "");
      className += `-${breakpoint}`;
    }
    className += `-${val}`;
    return className.toLowerCase();
  }
  var VRow = defineComponent2({
    name: "VRow",
    props: {
      dense: Boolean,
      noGutters: Boolean,
      align: {
        type: String,
        default: null,
        validator: alignValidator
      },
      ...alignProps,
      justify: {
        type: String,
        default: null,
        validator: justifyValidator
      },
      ...justifyProps,
      alignContent: {
        type: String,
        default: null,
        validator: alignContentValidator
      },
      ...alignContentProps,
      ...makeTagProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const classes = computed2(() => {
        const classList = [];
        let type;
        for (type in propMap2) {
          propMap2[type].forEach((prop) => {
            const value = props[prop];
            const className = breakpointClass2(type, prop, value);
            if (className)
              classList.push(className);
          });
        }
        classList.push({
          "v-row--no-gutters": props.noGutters,
          "v-row--dense": props.dense,
          [`align-${props.align}`]: props.align,
          [`justify-${props.justify}`]: props.justify,
          [`align-content-${props.alignContent}`]: props.alignContent
        });
        return classList;
      });
      return () => {
        var _slots$default;
        return h(props.tag, {
          class: ["v-row", classes.value]
        }, (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots));
      };
    }
  });

  // node_modules/vuetify/lib/components/VGrid/VSpacer.mjs
  var VSpacer = createSimpleFunctional("flex-grow-1", "div", "VSpacer");

  // node_modules/vuetify/lib/components/VHover/VHover.mjs
  var VHover = defineComponent2({
    name: "VHover",
    props: {
      disabled: Boolean,
      modelValue: {
        type: Boolean,
        default: void 0
      },
      ...makeDelayProps()
    },
    emits: {
      "update:modelValue": (value) => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const isHovering = useProxiedModel(props, "modelValue");
      const {
        runOpenDelay,
        runCloseDelay
      } = useDelay(props, (value) => !props.disabled && (isHovering.value = value));
      return () => {
        var _slots$default;
        return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
          isHovering: isHovering.value,
          props: {
            onMouseenter: runOpenDelay,
            onMouseleave: runCloseDelay
          }
        });
      };
    }
  });

  // node_modules/vuetify/lib/components/VItemGroup/VItemGroup.mjs
  var VItemGroupSymbol = Symbol.for("vuetify:v-item-group");
  var VItemGroup = defineComponent2({
    name: "VItemGroup",
    props: {
      ...makeGroupProps({
        selectedClass: "v-item--selected"
      }),
      ...makeTagProps(),
      ...makeThemeProps()
    },
    emits: {
      "update:modelValue": (value) => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        themeClasses
      } = provideTheme(props);
      const {
        isSelected,
        select,
        next,
        prev,
        selected
      } = useGroup(props, VItemGroupSymbol);
      return () => {
        var _slots$default;
        return createVNode(props.tag, {
          "class": ["v-item-group", themeClasses.value]
        }, {
          default: () => [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
            isSelected,
            select,
            next,
            prev,
            selected: selected.value
          })]
        });
      };
    }
  });

  // node_modules/vuetify/lib/components/VItemGroup/VItem.mjs
  var VItem = genericComponent()({
    name: "VItem",
    props: makeGroupItemProps(),
    emits: {
      "group:selected": (val) => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        isSelected,
        select,
        toggle,
        selectedClass,
        value,
        disabled
      } = useGroupItem(props, VItemGroupSymbol);
      return () => {
        var _slots$default;
        return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
          isSelected: isSelected.value,
          selectedClass: selectedClass.value,
          select,
          toggle,
          value: value.value,
          disabled: disabled.value
        });
      };
    }
  });

  // node_modules/vuetify/lib/components/VKbd/index.mjs
  var VKbd = createSimpleFunctional("v-kbd");

  // node_modules/vuetify/lib/components/VLayout/VLayout.mjs
  var VLayout = defineComponent2({
    name: "VLayout",
    props: makeLayoutProps(),
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        layoutClasses,
        layoutStyles,
        getLayoutItem,
        items,
        layoutRef
      } = createLayout(props);
      useRender(() => {
        var _slots$default;
        return createVNode("div", {
          "ref": layoutRef,
          "class": layoutClasses.value,
          "style": layoutStyles.value
        }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]);
      });
      return {
        getLayoutItem,
        items
      };
    }
  });

  // node_modules/vuetify/lib/components/VLayout/VLayoutItem.mjs
  var VLayoutItem = defineComponent2({
    name: "VLayoutItem",
    props: {
      position: {
        type: String,
        required: true
      },
      size: {
        type: [Number, String],
        default: 300
      },
      modelValue: Boolean,
      ...makeLayoutItemProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        layoutItemStyles
      } = useLayoutItem({
        id: props.name,
        order: computed2(() => parseInt(props.order, 10)),
        position: toRef(props, "position"),
        elementSize: toRef(props, "size"),
        layoutSize: toRef(props, "size"),
        active: toRef(props, "modelValue"),
        absolute: toRef(props, "absolute")
      });
      return () => {
        var _slots$default;
        return createVNode("div", {
          "class": ["v-layout-item"],
          "style": layoutItemStyles.value
        }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]);
      };
    }
  });

  // node_modules/vuetify/lib/components/VLazy/VLazy.mjs
  var VLazy = defineComponent2({
    name: "VLazy",
    directives: {
      intersect: intersect_default
    },
    props: {
      modelValue: Boolean,
      options: {
        type: Object,
        default: () => ({
          root: void 0,
          rootMargin: void 0,
          threshold: void 0
        })
      },
      ...makeDimensionProps(),
      ...makeTagProps(),
      ...makeTransitionProps({
        transition: "fade-transition"
      })
    },
    emits: {
      "update:modelValue": (value) => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        dimensionStyles
      } = useDimension(props);
      const isActive = useProxiedModel(props, "modelValue");
      function onIntersect(isIntersecting) {
        if (isActive.value)
          return;
        isActive.value = isIntersecting;
      }
      useRender(() => {
        var _slots$default;
        return withDirectives(createVNode(props.tag, {
          "class": "v-lazy",
          "style": dimensionStyles.value
        }, {
          default: () => [isActive.value && createVNode(MaybeTransition, {
            "transition": props.transition
          }, {
            default: () => [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]
          })]
        }), [[resolveDirective("intersect"), onIntersect, props.options]]);
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VLocaleProvider/VLocaleProvider.mjs
  var VLocaleProvider = defineComponent2({
    name: "VLocaleProvider",
    props: {
      locale: String,
      fallbackLocale: String,
      messages: Object,
      rtl: {
        type: Boolean,
        default: void 0
      }
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const localeInstance = provideLocale(props);
      const {
        rtlClasses
      } = provideRtl(props, localeInstance);
      useRender(() => {
        var _slots$default;
        return createVNode("div", {
          "class": ["v-locale-provider", rtlClasses.value]
        }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]);
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VMain/VMain.mjs
  var VMain = defineComponent2({
    name: "VMain",
    props: {
      scrollable: Boolean,
      ...makeTagProps({
        tag: "main"
      })
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        mainStyles
      } = useLayout();
      const {
        ssrBootStyles
      } = useSsrBoot();
      useRender(() => {
        var _slots$default, _slots$default2;
        return createVNode(props.tag, {
          "class": ["v-main", {
            "v-main--scrollable": props.scrollable
          }],
          "style": [mainStyles.value, ssrBootStyles.value]
        }, {
          default: () => [props.scrollable ? createVNode("div", {
            "class": "v-main__scroller"
          }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]) : (_slots$default2 = slots.default) == null ? void 0 : _slots$default2.call(slots)]
        });
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VNavigationDrawer/sticky.mjs
  function useSticky(_ref) {
    let {
      rootEl,
      isSticky,
      layoutItemStyles
    } = _ref;
    const isStuck = ref(false);
    const stuckPosition = ref(0);
    const stickyStyles = computed2(() => {
      const side = typeof isStuck.value === "boolean" ? "top" : isStuck.value;
      return [isSticky.value ? {
        top: "auto",
        bottom: "auto",
        height: void 0
      } : void 0, isStuck.value ? {
        [side]: convertToUnit(stuckPosition.value)
      } : {
        top: layoutItemStyles.value.top
      }];
    });
    onMounted(() => {
      watch(isSticky, (val) => {
        if (val) {
          window.addEventListener("scroll", onScroll, {
            passive: true
          });
        } else {
          window.removeEventListener("scroll", onScroll);
        }
      }, {
        immediate: true
      });
    });
    onBeforeUnmount(() => {
      document.removeEventListener("scroll", onScroll);
    });
    let lastScrollTop = 0;
    function onScroll() {
      const direction = lastScrollTop > window.scrollY ? "up" : "down";
      const rect = rootEl.value.getBoundingClientRect();
      const layoutTop = parseFloat(layoutItemStyles.value.top ?? 0);
      const top = window.scrollY - Math.max(0, stuckPosition.value - layoutTop);
      const bottom = rect.height + Math.max(stuckPosition.value, layoutTop) - window.scrollY - window.innerHeight;
      if (rect.height < window.innerHeight - layoutTop) {
        isStuck.value = "top";
        stuckPosition.value = layoutTop;
      } else if (direction === "up" && isStuck.value === "bottom" || direction === "down" && isStuck.value === "top") {
        stuckPosition.value = window.scrollY + rect.top;
        isStuck.value = true;
      } else if (direction === "down" && bottom <= 0) {
        stuckPosition.value = 0;
        isStuck.value = "bottom";
      } else if (direction === "up" && top <= 0) {
        stuckPosition.value = rect.top + top;
        isStuck.value = "top";
      }
      lastScrollTop = window.scrollY;
    }
    return {
      isStuck,
      stickyStyles
    };
  }

  // node_modules/vuetify/lib/composables/touch.mjs
  var HORIZON = 100;
  var HISTORY = 20;
  function kineticEnergyToVelocity(work) {
    const sqrt2 = 1.41421356237;
    return (work < 0 ? -1 : 1) * Math.sqrt(Math.abs(work)) * sqrt2;
  }
  function calculateImpulseVelocity(samples) {
    if (samples.length < 2) {
      return 0;
    }
    if (samples.length === 2) {
      if (samples[1].t === samples[0].t) {
        return 0;
      }
      return (samples[1].d - samples[0].d) / (samples[1].t - samples[0].t);
    }
    let work = 0;
    for (let i = samples.length - 1; i > 0; i--) {
      if (samples[i].t === samples[i - 1].t) {
        continue;
      }
      const vprev = kineticEnergyToVelocity(work);
      const vcurr = (samples[i].d - samples[i - 1].d) / (samples[i].t - samples[i - 1].t);
      work += (vcurr - vprev) * Math.abs(vcurr);
      if (i === samples.length - 1) {
        work *= 0.5;
      }
    }
    return kineticEnergyToVelocity(work) * 1e3;
  }
  function useVelocity() {
    const touches = {};
    function addMovement(e) {
      Array.from(e.changedTouches).forEach((touch) => {
        const samples = touches[touch.identifier] ?? (touches[touch.identifier] = new CircularBuffer(HISTORY));
        samples.push([e.timeStamp, touch]);
      });
    }
    function endTouch(e) {
      Array.from(e.changedTouches).forEach((touch) => {
        delete touches[touch.identifier];
      });
    }
    function getVelocity(id) {
      var _touches$id;
      const samples = (_touches$id = touches[id]) == null ? void 0 : _touches$id.values().reverse();
      if (!samples) {
        throw new Error(`No samples for touch id ${id}`);
      }
      const newest = samples[0];
      const x = [];
      const y = [];
      for (const val of samples) {
        if (newest[0] - val[0] > HORIZON)
          break;
        x.push({
          t: val[0],
          d: val[1].clientX
        });
        y.push({
          t: val[0],
          d: val[1].clientY
        });
      }
      return {
        x: calculateImpulseVelocity(x),
        y: calculateImpulseVelocity(y),
        get direction() {
          const {
            x: x2,
            y: y2
          } = this;
          const [absX, absY] = [Math.abs(x2), Math.abs(y2)];
          return absX > absY && x2 >= 0 ? "right" : absX > absY && x2 <= 0 ? "left" : absY > absX && y2 >= 0 ? "down" : absY > absX && y2 <= 0 ? "up" : oops();
        }
      };
    }
    return {
      addMovement,
      endTouch,
      getVelocity
    };
  }
  function oops() {
    throw new Error();
  }

  // node_modules/vuetify/lib/components/VNavigationDrawer/touch.mjs
  function useTouch(_ref) {
    let {
      isActive,
      isTemporary,
      width,
      touchless,
      position
    } = _ref;
    onMounted(() => {
      window.addEventListener("touchstart", onTouchstart, {
        passive: true
      });
      window.addEventListener("touchmove", onTouchmove, {
        passive: false
      });
      window.addEventListener("touchend", onTouchend, {
        passive: true
      });
    });
    onBeforeUnmount(() => {
      window.removeEventListener("touchstart", onTouchstart);
      window.removeEventListener("touchmove", onTouchmove);
      window.removeEventListener("touchend", onTouchend);
    });
    const isHorizontal = computed2(() => position.value !== "bottom");
    const {
      addMovement,
      endTouch,
      getVelocity
    } = useVelocity();
    let maybeDragging = false;
    const isDragging = ref(false);
    const dragProgress = ref(0);
    const offset = ref(0);
    let start;
    function getOffset3(pos, active) {
      return (position.value === "left" ? pos : position.value === "right" ? document.documentElement.clientWidth - pos : position.value === "bottom" ? document.documentElement.clientHeight - pos : oops2()) - (active ? width.value : 0);
    }
    function getProgress(pos) {
      let limit = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      const progress = position.value === "left" ? (pos - offset.value) / width.value : position.value === "right" ? (document.documentElement.clientWidth - pos - offset.value) / width.value : position.value === "bottom" ? (document.documentElement.clientHeight - pos - offset.value) / width.value : oops2();
      return limit ? Math.max(0, Math.min(1, progress)) : progress;
    }
    function onTouchstart(e) {
      if (touchless.value)
        return;
      const touchX = e.changedTouches[0].clientX;
      const touchY = e.changedTouches[0].clientY;
      const touchZone = 25;
      const inTouchZone = position.value === "left" ? touchX < touchZone : position.value === "right" ? touchX > document.documentElement.clientWidth - touchZone : position.value === "bottom" ? touchY > document.documentElement.clientHeight - touchZone : oops2();
      const inElement = isActive.value && (position.value === "left" ? touchX < width.value : position.value === "right" ? touchX > document.documentElement.clientWidth - width.value : position.value === "bottom" ? touchY > document.documentElement.clientHeight - width.value : oops2());
      if (inTouchZone || inElement || isActive.value && isTemporary.value) {
        maybeDragging = true;
        start = [touchX, touchY];
        offset.value = getOffset3(isHorizontal.value ? touchX : touchY, isActive.value);
        dragProgress.value = getProgress(isHorizontal.value ? touchX : touchY);
        endTouch(e);
        addMovement(e);
      }
    }
    function onTouchmove(e) {
      const touchX = e.changedTouches[0].clientX;
      const touchY = e.changedTouches[0].clientY;
      if (maybeDragging) {
        if (!e.cancelable) {
          maybeDragging = false;
          return;
        }
        const dx = Math.abs(touchX - start[0]);
        const dy = Math.abs(touchY - start[1]);
        const thresholdMet = isHorizontal.value ? dx > dy && dx > 3 : dy > dx && dy > 3;
        if (thresholdMet) {
          isDragging.value = true;
          maybeDragging = false;
        } else if ((isHorizontal.value ? dy : dx) > 3) {
          maybeDragging = false;
        }
      }
      if (!isDragging.value)
        return;
      e.preventDefault();
      addMovement(e);
      const progress = getProgress(isHorizontal.value ? touchX : touchY, false);
      dragProgress.value = Math.max(0, Math.min(1, progress));
      if (progress > 1) {
        offset.value = getOffset3(isHorizontal.value ? touchX : touchY, true);
      } else if (progress < 0) {
        offset.value = getOffset3(isHorizontal.value ? touchX : touchY, false);
      }
    }
    function onTouchend(e) {
      maybeDragging = false;
      if (!isDragging.value)
        return;
      addMovement(e);
      isDragging.value = false;
      const velocity = getVelocity(e.changedTouches[0].identifier);
      const vx = Math.abs(velocity.x);
      const vy = Math.abs(velocity.y);
      const thresholdMet = isHorizontal.value ? vx > vy && vx > 400 : vy > vx && vy > 3;
      if (thresholdMet) {
        isActive.value = velocity.direction === ({
          left: "right",
          right: "left",
          bottom: "up"
        }[position.value] || oops2());
      } else {
        isActive.value = dragProgress.value > 0.5;
      }
    }
    const dragStyles = computed2(() => {
      return isDragging.value ? {
        transform: position.value === "left" ? `translateX(calc(-100% + ${dragProgress.value * width.value}px))` : position.value === "right" ? `translateX(calc(100% - ${dragProgress.value * width.value}px))` : position.value === "bottom" ? `translateY(calc(100% - ${dragProgress.value * width.value}px))` : oops2(),
        transition: "none"
      } : void 0;
    });
    return {
      isDragging,
      dragProgress,
      dragStyles
    };
  }
  function oops2() {
    throw new Error();
  }

  // node_modules/vuetify/lib/components/VNavigationDrawer/VNavigationDrawer.mjs
  var locations = ["start", "end", "left", "right", "bottom"];
  var VNavigationDrawer = defineComponent2({
    name: "VNavigationDrawer",
    props: {
      color: String,
      disableResizeWatcher: Boolean,
      disableRouteWatcher: Boolean,
      expandOnHover: Boolean,
      floating: Boolean,
      modelValue: {
        type: Boolean,
        default: null
      },
      permanent: Boolean,
      rail: Boolean,
      railWidth: {
        type: [Number, String],
        default: 56
      },
      scrim: {
        type: [String, Boolean],
        default: true
      },
      image: String,
      temporary: Boolean,
      touchless: Boolean,
      width: {
        type: [Number, String],
        default: 256
      },
      location: {
        type: String,
        default: "start",
        validator: (value) => locations.includes(value)
      },
      sticky: Boolean,
      ...makeBorderProps(),
      ...makeElevationProps(),
      ...makeLayoutItemProps(),
      ...makeRoundedProps(),
      ...makeTagProps({
        tag: "nav"
      }),
      ...makeThemeProps()
    },
    emits: {
      "update:modelValue": (val) => true
    },
    setup(props, _ref) {
      let {
        attrs,
        slots
      } = _ref;
      const {
        isRtl
      } = useRtl();
      const {
        themeClasses
      } = provideTheme(props);
      const {
        borderClasses
      } = useBorder(props);
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(toRef(props, "color"));
      const {
        elevationClasses
      } = useElevation(props);
      const {
        mobile
      } = useDisplay();
      const {
        roundedClasses
      } = useRounded(props);
      const router = useRouter();
      const isActive = useProxiedModel(props, "modelValue", null, (v) => !!v);
      const {
        ssrBootStyles
      } = useSsrBoot();
      const rootEl = ref();
      const isHovering = ref(false);
      const width = computed2(() => {
        return props.rail && props.expandOnHover && isHovering.value ? Number(props.width) : Number(props.rail ? props.railWidth : props.width);
      });
      const location = computed2(() => {
        return toPhysical(props.location, isRtl.value);
      });
      const isTemporary = computed2(() => !props.permanent && (mobile.value || props.temporary));
      const isSticky = computed2(() => props.sticky && !isTemporary.value && location.value !== "bottom");
      if (!props.disableResizeWatcher) {
        watch(isTemporary, (val) => !props.permanent && (isActive.value = !val));
      }
      if (!props.disableRouteWatcher && router) {
        watch(router.currentRoute, () => isTemporary.value && (isActive.value = false));
      }
      watch(() => props.permanent, (val) => {
        if (val)
          isActive.value = true;
      });
      onBeforeMount(() => {
        if (props.modelValue != null || isTemporary.value)
          return;
        isActive.value = props.permanent || !mobile.value;
      });
      const {
        isDragging,
        dragProgress,
        dragStyles
      } = useTouch({
        isActive,
        isTemporary,
        width,
        touchless: toRef(props, "touchless"),
        position: location
      });
      const layoutSize = computed2(() => {
        const size2 = isTemporary.value ? 0 : props.rail && props.expandOnHover ? Number(props.railWidth) : width.value;
        return isDragging.value ? size2 * dragProgress.value : size2;
      });
      const {
        layoutItemStyles,
        layoutRect,
        layoutItemScrimStyles
      } = useLayoutItem({
        id: props.name,
        order: computed2(() => parseInt(props.order, 10)),
        position: location,
        layoutSize,
        elementSize: width,
        active: computed2(() => isActive.value || isDragging.value),
        disableTransitions: computed2(() => isDragging.value),
        absolute: computed2(() => props.absolute || isSticky.value && typeof isStuck.value !== "string")
      });
      const {
        isStuck,
        stickyStyles
      } = useSticky({
        rootEl,
        isSticky,
        layoutItemStyles
      });
      const scrimColor = useBackgroundColor(computed2(() => {
        return typeof props.scrim === "string" ? props.scrim : null;
      }));
      const scrimStyles = computed2(() => ({
        ...isDragging.value ? {
          opacity: dragProgress.value * 0.2,
          transition: "none"
        } : void 0,
        ...layoutRect.value ? {
          left: convertToUnit(layoutRect.value.left),
          right: convertToUnit(layoutRect.value.right),
          top: convertToUnit(layoutRect.value.top),
          bottom: convertToUnit(layoutRect.value.bottom)
        } : void 0,
        ...layoutItemScrimStyles.value
      }));
      provideDefaults({
        VList: {
          bgColor: "transparent"
        }
      });
      useRender(() => {
        var _slots$image, _slots$prepend, _slots$default, _slots$append;
        const hasImage = slots.image || props.image;
        return createVNode(Fragment, null, [createVNode(props.tag, mergeProps({
          "ref": rootEl,
          "onMouseenter": () => isHovering.value = true,
          "onMouseleave": () => isHovering.value = false,
          "class": ["v-navigation-drawer", `v-navigation-drawer--${location.value}`, {
            "v-navigation-drawer--expand-on-hover": props.expandOnHover,
            "v-navigation-drawer--floating": props.floating,
            "v-navigation-drawer--is-hovering": isHovering.value,
            "v-navigation-drawer--rail": props.rail,
            "v-navigation-drawer--temporary": isTemporary.value,
            "v-navigation-drawer--active": isActive.value,
            "v-navigation-drawer--sticky": isSticky.value
          }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value],
          "style": [backgroundColorStyles.value, layoutItemStyles.value, dragStyles.value, ssrBootStyles.value, stickyStyles.value]
        }, attrs), {
          default: () => [hasImage && createVNode("div", {
            "key": "image",
            "class": "v-navigation-drawer__img"
          }, [slots.image ? (_slots$image = slots.image) == null ? void 0 : _slots$image.call(slots, {
            image: props.image
          }) : createVNode("img", {
            "src": props.image,
            "alt": ""
          }, null)]), slots.prepend && createVNode("div", {
            "class": "v-navigation-drawer__prepend"
          }, [(_slots$prepend = slots.prepend) == null ? void 0 : _slots$prepend.call(slots)]), createVNode("div", {
            "class": "v-navigation-drawer__content"
          }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]), slots.append && createVNode("div", {
            "class": "v-navigation-drawer__append"
          }, [(_slots$append = slots.append) == null ? void 0 : _slots$append.call(slots)])]
        }), createVNode(Transition, {
          "name": "fade-transition"
        }, {
          default: () => [isTemporary.value && (isDragging.value || isActive.value) && !!props.scrim && createVNode("div", {
            "class": ["v-navigation-drawer__scrim", scrimColor.backgroundColorClasses.value],
            "style": [scrimStyles.value, scrimColor.backgroundColorStyles.value],
            "onClick": () => isActive.value = false
          }, null)]
        })]);
      });
      return {
        isStuck
      };
    }
  });

  // node_modules/vuetify/lib/composables/hydration.mjs
  function useHydration(callback) {
    var _vm$root, _vm$root$appContext, _vm$root$appContext$a;
    if (!IN_BROWSER)
      return;
    const vm = getCurrentInstance2("useHydration");
    const rootEl = vm == null ? void 0 : (_vm$root = vm.root) == null ? void 0 : (_vm$root$appContext = _vm$root.appContext) == null ? void 0 : (_vm$root$appContext$a = _vm$root$appContext.app) == null ? void 0 : _vm$root$appContext$a._container;
    return rootEl != null && rootEl.__vue_app__ ? callback() : onMounted(callback);
  }

  // node_modules/vuetify/lib/components/VNoSsr/VNoSsr.mjs
  var VNoSsr = defineComponent2({
    name: "VNoSsr",
    setup(_, _ref) {
      let {
        slots
      } = _ref;
      const show = ref(false);
      useHydration(() => show.value = true);
      return () => {
        var _slots$default;
        return show.value && ((_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots));
      };
    }
  });

  // node_modules/vuetify/lib/composables/refs.mjs
  function useRefs() {
    const refs = ref([]);
    onBeforeUpdate(() => refs.value = []);
    function updateRef(e, i) {
      refs.value[i] = e;
    }
    return {
      refs,
      updateRef
    };
  }

  // node_modules/vuetify/lib/components/VPagination/VPagination.mjs
  var VPagination = defineComponent2({
    name: "VPagination",
    props: {
      activeColor: String,
      start: {
        type: [Number, String],
        default: 1
      },
      modelValue: {
        type: Number,
        default: (props) => props.start
      },
      disabled: Boolean,
      length: {
        type: [Number, String],
        default: 1,
        validator: (val) => val % 1 === 0
      },
      totalVisible: [Number, String],
      firstIcon: {
        type: IconValue,
        default: "$first"
      },
      prevIcon: {
        type: IconValue,
        default: "$prev"
      },
      nextIcon: {
        type: IconValue,
        default: "$next"
      },
      lastIcon: {
        type: IconValue,
        default: "$last"
      },
      ariaLabel: {
        type: String,
        default: "$vuetify.pagination.ariaLabel.root"
      },
      pageAriaLabel: {
        type: String,
        default: "$vuetify.pagination.ariaLabel.page"
      },
      currentPageAriaLabel: {
        type: String,
        default: "$vuetify.pagination.ariaLabel.currentPage"
      },
      firstAriaLabel: {
        type: String,
        default: "$vuetify.pagination.ariaLabel.first"
      },
      previousAriaLabel: {
        type: String,
        default: "$vuetify.pagination.ariaLabel.previous"
      },
      nextAriaLabel: {
        type: String,
        default: "$vuetify.pagination.ariaLabel.next"
      },
      lastAriaLabel: {
        type: String,
        default: "$vuetify.pagination.ariaLabel.last"
      },
      ellipsis: {
        type: String,
        default: "..."
      },
      showFirstLastPage: Boolean,
      ...makeBorderProps(),
      ...makeDensityProps(),
      ...makeElevationProps(),
      ...makeRoundedProps(),
      ...makeSizeProps(),
      ...makeTagProps({
        tag: "nav"
      }),
      ...makeThemeProps(),
      ...makeVariantProps({
        variant: "text"
      })
    },
    emits: {
      "update:modelValue": (value) => true,
      first: (value) => true,
      prev: (value) => true,
      next: (value) => true,
      last: (value) => true
    },
    setup(props, _ref) {
      let {
        slots,
        emit: emit2
      } = _ref;
      const page = useProxiedModel(props, "modelValue");
      const {
        t,
        n
      } = useLocale();
      const {
        isRtl
      } = useRtl();
      const {
        themeClasses
      } = provideTheme(props);
      const maxButtons = ref(-1);
      provideDefaults(void 0, {
        scoped: true
      });
      const {
        resizeRef
      } = useResizeObserver((entries) => {
        if (!entries.length)
          return;
        const {
          target,
          contentRect
        } = entries[0];
        const firstItem = target.querySelector(".v-pagination__list > *");
        if (!firstItem)
          return;
        const totalWidth = contentRect.width;
        const itemWidth = firstItem.offsetWidth + parseFloat(getComputedStyle(firstItem).marginRight) * 2;
        const minButtons = props.showFirstLastPage ? 5 : 3;
        maxButtons.value = Math.max(0, Math.floor(+((totalWidth - itemWidth * minButtons) / itemWidth).toFixed(2)));
      });
      const length = computed2(() => parseInt(props.length, 10));
      const start = computed2(() => parseInt(props.start, 10));
      const totalVisible = computed2(() => {
        if (props.totalVisible)
          return parseInt(props.totalVisible, 10);
        else if (maxButtons.value >= 0)
          return maxButtons.value;
        return length.value;
      });
      const range = computed2(() => {
        if (length.value <= 0 || isNaN(length.value) || length.value > Number.MAX_SAFE_INTEGER)
          return [];
        if (totalVisible.value <= 1)
          return [page.value];
        if (length.value <= totalVisible.value) {
          return createRange(length.value, start.value);
        }
        const even = totalVisible.value % 2 === 0;
        const middle = even ? totalVisible.value / 2 : Math.floor(totalVisible.value / 2);
        const left = even ? middle : middle + 1;
        const right = length.value - middle;
        if (left - page.value >= 0) {
          return [...createRange(Math.max(1, totalVisible.value - 1), start.value), props.ellipsis, length.value];
        } else if (page.value - right >= (even ? 1 : 0)) {
          const rangeLength = totalVisible.value - 1;
          const rangeStart = length.value - rangeLength + start.value;
          return [start.value, props.ellipsis, ...createRange(rangeLength, rangeStart)];
        } else {
          const rangeLength = Math.max(1, totalVisible.value - 3);
          const rangeStart = rangeLength === 1 ? page.value : page.value - Math.ceil(rangeLength / 2) + start.value;
          return [start.value, props.ellipsis, ...createRange(rangeLength, rangeStart), props.ellipsis, length.value];
        }
      });
      function setValue(e, value, event) {
        e.preventDefault();
        page.value = value;
        event && emit2(event, value);
      }
      const {
        refs,
        updateRef
      } = useRefs();
      provideDefaults({
        VPaginationBtn: {
          color: toRef(props, "color"),
          border: toRef(props, "border"),
          density: toRef(props, "density"),
          size: toRef(props, "size"),
          variant: toRef(props, "variant")
        }
      });
      const items = computed2(() => {
        return range.value.map((item, index) => {
          const ref2 = (e) => updateRef(e, index);
          if (typeof item === "string") {
            return {
              isActive: false,
              key: `ellipsis-${index}`,
              page: item,
              props: {
                ref: ref2,
                ellipsis: true,
                icon: true,
                disabled: true
              }
            };
          } else {
            const isActive = item === page.value;
            return {
              isActive,
              key: item,
              page: n(item),
              props: {
                ref: ref2,
                ellipsis: false,
                icon: true,
                disabled: !!props.disabled || props.length < 2,
                elevation: props.elevation,
                rounded: props.rounded,
                color: isActive ? props.activeColor : props.color,
                ariaCurrent: isActive,
                ariaLabel: t(isActive ? props.currentPageAriaLabel : props.pageAriaLabel, index + 1),
                onClick: (e) => setValue(e, item)
              }
            };
          }
        });
      });
      const controls = computed2(() => {
        const prevDisabled = !!props.disabled || page.value <= start.value;
        const nextDisabled = !!props.disabled || page.value >= start.value + length.value - 1;
        return {
          first: props.showFirstLastPage ? {
            icon: isRtl.value ? props.lastIcon : props.firstIcon,
            onClick: (e) => setValue(e, start.value, "first"),
            disabled: prevDisabled,
            ariaLabel: t(props.firstAriaLabel),
            ariaDisabled: prevDisabled
          } : void 0,
          prev: {
            icon: isRtl.value ? props.nextIcon : props.prevIcon,
            onClick: (e) => setValue(e, page.value - 1, "prev"),
            disabled: prevDisabled,
            ariaLabel: t(props.previousAriaLabel),
            ariaDisabled: prevDisabled
          },
          next: {
            icon: isRtl.value ? props.prevIcon : props.nextIcon,
            onClick: (e) => setValue(e, page.value + 1, "next"),
            disabled: nextDisabled,
            ariaLabel: t(props.nextAriaLabel),
            ariaDisabled: nextDisabled
          },
          last: props.showFirstLastPage ? {
            icon: isRtl.value ? props.firstIcon : props.lastIcon,
            onClick: (e) => setValue(e, start.value + length.value - 1, "last"),
            disabled: nextDisabled,
            ariaLabel: t(props.lastAriaLabel),
            ariaDisabled: nextDisabled
          } : void 0
        };
      });
      function updateFocus() {
        var _refs$value$currentIn;
        const currentIndex = page.value - start.value;
        (_refs$value$currentIn = refs.value[currentIndex]) == null ? void 0 : _refs$value$currentIn.$el.focus();
      }
      function onKeydown(e) {
        if (e.key === keyValues.left && !props.disabled && page.value > props.start) {
          page.value = page.value - 1;
          nextTick(updateFocus);
        } else if (e.key === keyValues.right && !props.disabled && page.value < start.value + length.value - 1) {
          page.value = page.value + 1;
          nextTick(updateFocus);
        }
      }
      useRender(() => createVNode(props.tag, {
        "ref": resizeRef,
        "class": ["v-pagination", themeClasses.value],
        "role": "navigation",
        "aria-label": t(props.ariaLabel),
        "onKeydown": onKeydown,
        "data-test": "v-pagination-root"
      }, {
        default: () => [createVNode("ul", {
          "class": "v-pagination__list"
        }, [props.showFirstLastPage && createVNode("li", {
          "key": "first",
          "class": "v-pagination__first",
          "data-test": "v-pagination-first"
        }, [slots.first ? slots.first(controls.value.first) : createVNode(VBtn, mergeProps({
          "_as": "VPaginationBtn"
        }, controls.value.first), null)]), createVNode("li", {
          "key": "prev",
          "class": "v-pagination__prev",
          "data-test": "v-pagination-prev"
        }, [slots.prev ? slots.prev(controls.value.prev) : createVNode(VBtn, mergeProps({
          "_as": "VPaginationBtn"
        }, controls.value.prev), null)]), items.value.map((item, index) => createVNode("li", {
          "key": item.key,
          "class": ["v-pagination__item", {
            "v-pagination__item--is-active": item.isActive
          }],
          "data-test": "v-pagination-item"
        }, [slots.item ? slots.item(item) : createVNode(VBtn, mergeProps({
          "_as": "VPaginationBtn"
        }, item.props), {
          default: () => [item.page]
        })])), createVNode("li", {
          "key": "next",
          "class": "v-pagination__next",
          "data-test": "v-pagination-next"
        }, [slots.next ? slots.next(controls.value.next) : createVNode(VBtn, mergeProps({
          "_as": "VPaginationBtn"
        }, controls.value.next), null)]), props.showFirstLastPage && createVNode("li", {
          "key": "last",
          "class": "v-pagination__last",
          "data-test": "v-pagination-last"
        }, [slots.last ? slots.last(controls.value.last) : createVNode(VBtn, mergeProps({
          "_as": "VPaginationBtn"
        }, controls.value.last), null)])])]
      }));
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VParallax/VParallax.mjs
  function floor(val) {
    return Math.floor(Math.abs(val)) * Math.sign(val);
  }
  var VParallax = defineComponent2({
    name: "VParallax",
    props: {
      scale: {
        type: [Number, String],
        default: 0.5
      }
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        intersectionRef,
        isIntersecting
      } = useIntersectionObserver();
      const {
        resizeRef,
        contentRect
      } = useResizeObserver();
      const {
        height: displayHeight
      } = useDisplay();
      const root = ref();
      watchEffect(() => {
        var _root$value;
        intersectionRef.value = resizeRef.value = (_root$value = root.value) == null ? void 0 : _root$value.$el;
      });
      let scrollParent;
      watch(isIntersecting, (val) => {
        if (val) {
          scrollParent = getScrollParent(intersectionRef.value);
          scrollParent = scrollParent === document.scrollingElement ? document : scrollParent;
          scrollParent.addEventListener("scroll", onScroll, {
            passive: true
          });
          onScroll();
        } else {
          scrollParent.removeEventListener("scroll", onScroll);
        }
      });
      onBeforeUnmount(() => {
        var _scrollParent;
        (_scrollParent = scrollParent) == null ? void 0 : _scrollParent.removeEventListener("scroll", onScroll);
      });
      watch(displayHeight, onScroll);
      const scale = computed2(() => {
        return 1 - clamp(+props.scale);
      });
      let frame = -1;
      function onScroll() {
        if (!isIntersecting.value)
          return;
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          var _root$value2;
          const el = ((_root$value2 = root.value) == null ? void 0 : _root$value2.$el).querySelector(".v-img__img");
          if (!el)
            return;
          const scrollHeight = scrollParent.clientHeight ?? document.documentElement.clientHeight;
          const scrollPos = scrollParent.scrollTop ?? window.scrollY;
          const top = intersectionRef.value.offsetTop;
          const height = contentRect.value.height;
          const center = top + (height - scrollHeight) / 2;
          const translate = floor((scrollPos - center) * scale.value);
          const sizeScale = Math.max(1, (scale.value * (scrollHeight - height) + height) / height);
          el.style.setProperty("transform", `translateY(${translate}px) scale(${sizeScale})`);
        });
      }
      useRender(() => createVNode(VImg, {
        "class": ["v-parallax", {
          "v-parallax--active": isIntersecting.value
        }],
        "ref": root,
        "cover": true,
        "onLoadstart": onScroll,
        "onLoad": onScroll
      }, slots));
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VRadio/VRadio.mjs
  var VRadio = defineComponent2({
    name: "VRadio",
    props: {
      ...makeSelectionControlProps({
        falseIcon: "$radioOff",
        trueIcon: "$radioOn"
      })
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      useRender(() => createVNode(VSelectionControl, mergeProps(props, {
        "class": "v-radio",
        "type": "radio"
      }), slots));
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VRadioGroup/VRadioGroup.mjs
  var VRadioGroup = defineComponent2({
    name: "VRadioGroup",
    inheritAttrs: false,
    props: {
      height: {
        type: [Number, String],
        default: "auto"
      },
      ...makeVInputProps(),
      ...makeSelectionControlProps(),
      trueIcon: {
        type: IconValue,
        default: "$radioOn"
      },
      falseIcon: {
        type: IconValue,
        default: "$radioOff"
      },
      type: {
        type: String,
        default: "radio"
      }
    },
    emits: {
      "update:modelValue": (val) => true
    },
    setup(props, _ref) {
      let {
        attrs,
        slots
      } = _ref;
      const uid2 = getUid();
      const id = computed2(() => props.id || `radio-group-${uid2}`);
      const model = useProxiedModel(props, "modelValue");
      provideDefaults({
        VRadio: {
          color: toRef(props, "color"),
          density: toRef(props, "density")
        }
      });
      useRender(() => {
        const [inputAttrs, controlAttrs] = filterInputAttrs(attrs);
        const [inputProps, _1] = filterInputProps(props);
        const [controlProps, _2] = filterControlProps(props);
        const label = slots.label ? slots.label({
          label: props.label,
          props: {
            for: id.value
          }
        }) : props.label;
        return createVNode(VInput, mergeProps({
          "class": "v-radio-group"
        }, inputAttrs, inputProps, {
          "modelValue": model.value,
          "onUpdate:modelValue": ($event) => model.value = $event,
          "id": id.value
        }), {
          ...slots,
          default: (_ref2) => {
            let {
              id: id2,
              isDisabled,
              isReadonly: isReadonly2
            } = _ref2;
            return createVNode(Fragment, null, [label && createVNode(VLabel, {
              "for": id2.value,
              "clickable": true
            }, {
              default: () => [label]
            }), createVNode(VSelectionControlGroup, mergeProps(controlProps, {
              "id": id2.value,
              "trueIcon": props.trueIcon,
              "falseIcon": props.falseIcon,
              "type": props.type,
              "disabled": isDisabled.value,
              "readonly": isReadonly2.value
            }, controlAttrs, {
              "modelValue": model.value,
              "onUpdate:modelValue": ($event) => model.value = $event
            }), slots)]);
          }
        });
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VRangeSlider/VRangeSlider.mjs
  var VRangeSlider = defineComponent2({
    name: "VRangeSlider",
    props: {
      ...makeFocusProps(),
      ...makeVInputProps(),
      ...makeSliderProps(),
      strict: Boolean,
      modelValue: {
        type: Array,
        default: () => [0, 0]
      }
    },
    emits: {
      "update:focused": (value) => true,
      "update:modelValue": (value) => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const startThumbRef = ref();
      const stopThumbRef = ref();
      const inputRef = ref();
      function getActiveThumb(e) {
        if (!startThumbRef.value || !stopThumbRef.value)
          return;
        const startOffset = getOffset2(e, startThumbRef.value.$el, props.direction);
        const stopOffset = getOffset2(e, stopThumbRef.value.$el, props.direction);
        const a = Math.abs(startOffset);
        const b = Math.abs(stopOffset);
        return a < b || a === b && startOffset < 0 ? startThumbRef.value.$el : stopThumbRef.value.$el;
      }
      const {
        activeThumbRef,
        hasLabels,
        max,
        min,
        mousePressed,
        onSliderMousedown,
        onSliderTouchstart,
        position,
        roundValue,
        trackContainerRef
      } = useSlider({
        props,
        handleSliderMouseUp: (newValue) => {
          var _startThumbRef$value;
          model.value = activeThumbRef.value === ((_startThumbRef$value = startThumbRef.value) == null ? void 0 : _startThumbRef$value.$el) ? [newValue, model.value[1]] : [model.value[0], newValue];
        },
        handleMouseMove: (newValue) => {
          var _startThumbRef$value3;
          const [start, stop2] = model.value;
          if (!props.strict && start === stop2 && start !== min.value) {
            var _stopThumbRef$value, _startThumbRef$value2, _activeThumbRef$value;
            activeThumbRef.value = newValue > start ? (_stopThumbRef$value = stopThumbRef.value) == null ? void 0 : _stopThumbRef$value.$el : (_startThumbRef$value2 = startThumbRef.value) == null ? void 0 : _startThumbRef$value2.$el;
            (_activeThumbRef$value = activeThumbRef.value) == null ? void 0 : _activeThumbRef$value.focus();
          }
          if (activeThumbRef.value === ((_startThumbRef$value3 = startThumbRef.value) == null ? void 0 : _startThumbRef$value3.$el)) {
            model.value = [Math.min(newValue, stop2), stop2];
          } else {
            model.value = [start, Math.max(start, newValue)];
          }
        },
        getActiveThumb
      });
      const model = useProxiedModel(props, "modelValue", void 0, (arr) => {
        if (!arr || !arr.length)
          return [0, 0];
        return arr.map((value) => roundValue(value));
      });
      const {
        isFocused,
        focus,
        blur
      } = useFocus(props);
      const trackStart = computed2(() => position(model.value[0]));
      const trackStop = computed2(() => position(model.value[1]));
      useRender(() => {
        const [inputProps, _] = filterInputProps(props);
        const hasPrepend = !!(props.label || slots.label || slots.prepend);
        return createVNode(VInput, mergeProps({
          "class": ["v-slider", "v-range-slider", {
            "v-slider--has-labels": !!slots["tick-label"] || hasLabels.value,
            "v-slider--focused": isFocused.value,
            "v-slider--pressed": mousePressed.value,
            "v-slider--disabled": props.disabled
          }],
          "ref": inputRef
        }, inputProps, {
          "focused": isFocused.value
        }), {
          ...slots,
          prepend: hasPrepend ? (slotProps) => {
            var _slots$label, _slots$prepend;
            return createVNode(Fragment, null, [((_slots$label = slots.label) == null ? void 0 : _slots$label.call(slots, slotProps)) ?? props.label ? createVNode(VLabel, {
              "class": "v-slider__label",
              "text": props.label
            }, null) : void 0, (_slots$prepend = slots.prepend) == null ? void 0 : _slots$prepend.call(slots, slotProps)]);
          } : void 0,
          default: (_ref2) => {
            var _startThumbRef$value4, _stopThumbRef$value4;
            let {
              id
            } = _ref2;
            return createVNode("div", {
              "class": "v-slider__container",
              "onMousedown": onSliderMousedown,
              "onTouchstartPassive": onSliderTouchstart
            }, [createVNode("input", {
              "id": `${id.value}_start`,
              "name": props.name || id.value,
              "disabled": props.disabled,
              "readonly": props.readonly,
              "tabindex": "-1",
              "value": model.value[0]
            }, null), createVNode("input", {
              "id": `${id.value}_stop`,
              "name": props.name || id.value,
              "disabled": props.disabled,
              "readonly": props.readonly,
              "tabindex": "-1",
              "value": model.value[1]
            }, null), createVNode(VSliderTrack, {
              "ref": trackContainerRef,
              "start": trackStart.value,
              "stop": trackStop.value
            }, {
              "tick-label": slots["tick-label"]
            }), createVNode(VSliderThumb, {
              "ref": startThumbRef,
              "focused": isFocused && activeThumbRef.value === ((_startThumbRef$value4 = startThumbRef.value) == null ? void 0 : _startThumbRef$value4.$el),
              "modelValue": model.value[0],
              "onUpdate:modelValue": (v) => model.value = [v, model.value[1]],
              "onFocus": (e) => {
                var _startThumbRef$value5, _stopThumbRef$value2;
                focus();
                activeThumbRef.value = (_startThumbRef$value5 = startThumbRef.value) == null ? void 0 : _startThumbRef$value5.$el;
                if (model.value[0] === model.value[1] && model.value[1] === min.value && e.relatedTarget !== ((_stopThumbRef$value2 = stopThumbRef.value) == null ? void 0 : _stopThumbRef$value2.$el)) {
                  var _startThumbRef$value6, _stopThumbRef$value3;
                  (_startThumbRef$value6 = startThumbRef.value) == null ? void 0 : _startThumbRef$value6.$el.blur();
                  (_stopThumbRef$value3 = stopThumbRef.value) == null ? void 0 : _stopThumbRef$value3.$el.focus();
                }
              },
              "onBlur": () => {
                blur();
                activeThumbRef.value = void 0;
              },
              "min": min.value,
              "max": model.value[1],
              "position": trackStart.value
            }, {
              "thumb-label": slots["thumb-label"]
            }), createVNode(VSliderThumb, {
              "ref": stopThumbRef,
              "focused": isFocused && activeThumbRef.value === ((_stopThumbRef$value4 = stopThumbRef.value) == null ? void 0 : _stopThumbRef$value4.$el),
              "modelValue": model.value[1],
              "onUpdate:modelValue": (v) => model.value = [model.value[0], v],
              "onFocus": (e) => {
                var _stopThumbRef$value5, _startThumbRef$value7;
                focus();
                activeThumbRef.value = (_stopThumbRef$value5 = stopThumbRef.value) == null ? void 0 : _stopThumbRef$value5.$el;
                if (model.value[0] === model.value[1] && model.value[0] === max.value && e.relatedTarget !== ((_startThumbRef$value7 = startThumbRef.value) == null ? void 0 : _startThumbRef$value7.$el)) {
                  var _stopThumbRef$value6, _startThumbRef$value8;
                  (_stopThumbRef$value6 = stopThumbRef.value) == null ? void 0 : _stopThumbRef$value6.$el.blur();
                  (_startThumbRef$value8 = startThumbRef.value) == null ? void 0 : _startThumbRef$value8.$el.focus();
                }
              },
              "onBlur": () => {
                blur();
                activeThumbRef.value = void 0;
              },
              "min": model.value[0],
              "max": max.value,
              "position": trackStop.value
            }, {
              "thumb-label": slots["thumb-label"]
            })]);
          }
        });
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VRating/VRating.mjs
  var VRating = genericComponent()({
    name: "VRating",
    props: {
      name: String,
      itemAriaLabel: {
        type: String,
        default: "$vuetify.rating.ariaLabel.item"
      },
      activeColor: String,
      color: String,
      clearable: Boolean,
      disabled: Boolean,
      emptyIcon: {
        type: IconValue,
        default: "$ratingEmpty"
      },
      fullIcon: {
        type: IconValue,
        default: "$ratingFull"
      },
      halfIncrements: Boolean,
      hover: Boolean,
      length: {
        type: [Number, String],
        default: 5
      },
      readonly: Boolean,
      modelValue: {
        type: Number,
        default: 0
      },
      itemLabels: Array,
      itemLabelPosition: {
        type: String,
        default: "top",
        validator: (v) => ["top", "bottom"].includes(v)
      },
      ripple: Boolean,
      ...makeDensityProps(),
      ...makeSizeProps(),
      ...makeTagProps(),
      ...makeThemeProps()
    },
    emits: {
      "update:modelValue": (value) => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        t
      } = useLocale();
      const {
        themeClasses
      } = provideTheme(props);
      const rating = useProxiedModel(props, "modelValue");
      const range = computed2(() => createRange(Number(props.length), 1));
      const increments = computed2(() => range.value.flatMap((v) => props.halfIncrements ? [v - 0.5, v] : [v]));
      const hoverIndex = ref(-1);
      const focusIndex = ref(-1);
      const firstRef = ref();
      let isClicking = false;
      const itemState = computed2(() => increments.value.map((value) => {
        const isHovering = props.hover && hoverIndex.value > -1;
        const isFilled = rating.value >= value;
        const isHovered = hoverIndex.value >= value;
        const isFullIcon = isHovering ? isHovered : isFilled;
        const icon = isFullIcon ? props.fullIcon : props.emptyIcon;
        const activeColor = props.activeColor ?? props.color;
        const color = isFilled || isHovered ? activeColor : props.color;
        return {
          isFilled,
          isHovered,
          icon,
          color
        };
      }));
      const eventState = computed2(() => [0, ...increments.value].map((value) => {
        function onMouseenter() {
          hoverIndex.value = value;
        }
        function onMouseleave() {
          hoverIndex.value = -1;
        }
        function onFocus() {
          if (value === 0 && rating.value === 0) {
            var _firstRef$value;
            (_firstRef$value = firstRef.value) == null ? void 0 : _firstRef$value.focus();
          } else {
            focusIndex.value = value;
          }
        }
        function onBlur() {
          if (!isClicking)
            focusIndex.value = -1;
        }
        function onClick() {
          if (props.disabled || props.readonly)
            return;
          rating.value = rating.value === value && props.clearable ? 0 : value;
        }
        return {
          onMouseenter: props.hover ? onMouseenter : void 0,
          onMouseleave: props.hover ? onMouseleave : void 0,
          onFocus,
          onBlur,
          onClick
        };
      }));
      function onMousedown() {
        isClicking = true;
      }
      function onMouseup() {
        isClicking = false;
      }
      const name = computed2(() => props.name ?? `v-rating-${getUid()}`);
      function VRatingItem(_ref2) {
        var _itemState$value$inde, _itemState$value$inde2;
        let {
          value,
          index,
          showStar = true
        } = _ref2;
        const {
          onMouseenter,
          onMouseleave,
          onFocus,
          onBlur,
          onClick
        } = eventState.value[index + 1];
        const id = `${name.value}-${String(value).replace(".", "-")}`;
        const btnProps = {
          color: (_itemState$value$inde = itemState.value[index]) == null ? void 0 : _itemState$value$inde.color,
          density: props.density,
          disabled: props.disabled,
          icon: (_itemState$value$inde2 = itemState.value[index]) == null ? void 0 : _itemState$value$inde2.icon,
          ripple: props.ripple,
          size: props.size,
          tag: "span",
          variant: "plain"
        };
        return createVNode(Fragment, null, [createVNode("label", {
          "for": id,
          "class": {
            "v-rating__item--half": props.halfIncrements && value % 1 > 0,
            "v-rating__item--full": props.halfIncrements && value % 1 === 0
          },
          "onMousedown": onMousedown,
          "onMouseup": onMouseup,
          "onMouseenter": onMouseenter,
          "onMouseleave": onMouseleave
        }, [createVNode("span", {
          "class": "v-rating__hidden"
        }, [t(props.itemAriaLabel, value, props.length)]), !showStar ? void 0 : slots.item ? slots.item({
          ...itemState.value[index],
          props: btnProps,
          value,
          index
        }) : createVNode(VBtn, btnProps, null)]), createVNode("input", {
          "class": "v-rating__hidden",
          "name": name.value,
          "id": id,
          "type": "radio",
          "value": value,
          "checked": rating.value === value,
          "onClick": onClick,
          "onFocus": onFocus,
          "onBlur": onBlur,
          "ref": index === 0 ? firstRef : void 0,
          "readonly": props.readonly,
          "disabled": props.disabled
        }, null)]);
      }
      function createLabel(labelProps) {
        if (slots["item-label"])
          return slots["item-label"](labelProps);
        if (labelProps.label)
          return createVNode("span", null, [labelProps.label]);
        return createVNode("span", null, [createTextVNode("\xA0")]);
      }
      useRender(() => {
        var _props$itemLabels;
        const hasLabels = !!((_props$itemLabels = props.itemLabels) != null && _props$itemLabels.length) || slots["item-label"];
        return createVNode(props.tag, {
          "class": ["v-rating", {
            "v-rating--hover": props.hover,
            "v-rating--readonly": props.readonly
          }, themeClasses.value]
        }, {
          default: () => [createVNode(VRatingItem, {
            "value": 0,
            "index": -1,
            "showStar": false
          }, null), range.value.map((value, i) => {
            var _props$itemLabels2, _props$itemLabels3;
            return createVNode("div", {
              "class": "v-rating__wrapper"
            }, [hasLabels && props.itemLabelPosition === "top" ? createLabel({
              value,
              index: i,
              label: (_props$itemLabels2 = props.itemLabels) == null ? void 0 : _props$itemLabels2[i]
            }) : void 0, createVNode("div", {
              "class": ["v-rating__item", {
                "v-rating__item--focused": Math.ceil(focusIndex.value) === value
              }]
            }, [props.halfIncrements ? createVNode(Fragment, null, [createVNode(VRatingItem, {
              "value": value - 0.5,
              "index": i * 2
            }, null), createVNode(VRatingItem, {
              "value": value,
              "index": i * 2 + 1
            }, null)]) : createVNode(VRatingItem, {
              "value": value,
              "index": i
            }, null)]), hasLabels && props.itemLabelPosition === "bottom" ? createLabel({
              value,
              index: i,
              label: (_props$itemLabels3 = props.itemLabels) == null ? void 0 : _props$itemLabels3[i]
            }) : void 0]);
          })]
        });
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VSlideGroup/helpers.mjs
  function bias(val) {
    const c = 0.501;
    const x = Math.abs(val);
    return Math.sign(val) * (x / ((1 / c - 2) * (1 - x) + 1));
  }
  function calculateUpdatedOffset(_ref) {
    let {
      selectedElement,
      containerSize,
      contentSize,
      isRtl,
      currentScrollOffset,
      isHorizontal
    } = _ref;
    const clientSize = isHorizontal ? selectedElement.clientWidth : selectedElement.clientHeight;
    const offsetStart = isHorizontal ? selectedElement.offsetLeft : selectedElement.offsetTop;
    const adjustedOffsetStart = isRtl && isHorizontal ? contentSize - offsetStart - clientSize : offsetStart;
    const totalSize = containerSize + currentScrollOffset;
    const itemOffset = clientSize + adjustedOffsetStart;
    const additionalOffset = clientSize * 0.4;
    if (adjustedOffsetStart <= currentScrollOffset) {
      currentScrollOffset = Math.max(adjustedOffsetStart - additionalOffset, 0);
    } else if (totalSize <= itemOffset) {
      currentScrollOffset = Math.min(currentScrollOffset - (totalSize - itemOffset - additionalOffset), contentSize - containerSize);
    }
    return currentScrollOffset;
  }
  function calculateCenteredOffset(_ref2) {
    let {
      selectedElement,
      containerSize,
      contentSize,
      isRtl,
      isHorizontal
    } = _ref2;
    const clientSize = isHorizontal ? selectedElement.clientWidth : selectedElement.clientHeight;
    const offsetStart = isHorizontal ? selectedElement.offsetLeft : selectedElement.offsetTop;
    const offsetCentered = isRtl && isHorizontal ? contentSize - offsetStart - clientSize / 2 - containerSize / 2 : offsetStart + clientSize / 2 - containerSize / 2;
    return Math.min(contentSize - containerSize, Math.max(0, offsetCentered));
  }

  // node_modules/vuetify/lib/components/VSlideGroup/VSlideGroup.mjs
  var VSlideGroupSymbol = Symbol.for("vuetify:v-slide-group");
  var VSlideGroup = defineComponent2({
    name: "VSlideGroup",
    props: {
      centerActive: Boolean,
      direction: {
        type: String,
        default: "horizontal"
      },
      symbol: {
        type: null,
        default: VSlideGroupSymbol
      },
      nextIcon: {
        type: IconValue,
        default: "$next"
      },
      prevIcon: {
        type: IconValue,
        default: "$prev"
      },
      showArrows: {
        type: [Boolean, String],
        validator: (v) => typeof v === "boolean" || ["always", "desktop", "mobile"].includes(v)
      },
      ...makeTagProps(),
      ...makeGroupProps({
        selectedClass: "v-slide-group-item--active"
      })
    },
    emits: {
      "update:modelValue": (value) => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        isRtl
      } = useRtl();
      const {
        mobile
      } = useDisplay();
      const group = useGroup(props, props.symbol);
      const isOverflowing = ref(false);
      const scrollOffset = ref(0);
      const containerSize = ref(0);
      const contentSize = ref(0);
      const isHorizontal = computed2(() => props.direction === "horizontal");
      const {
        resizeRef: containerRef,
        contentRect: containerRect
      } = useResizeObserver();
      const {
        resizeRef: contentRef,
        contentRect
      } = useResizeObserver();
      const firstSelectedIndex = computed2(() => {
        if (!group.selected.value.length)
          return -1;
        return group.items.value.findIndex((item) => item.id === group.selected.value[0]);
      });
      const lastSelectedIndex = computed2(() => {
        if (!group.selected.value.length)
          return -1;
        return group.items.value.findIndex((item) => item.id === group.selected.value[group.selected.value.length - 1]);
      });
      if (IN_BROWSER) {
        let frame = -1;
        watch(() => [group.selected.value, containerRect.value, contentRect.value, isHorizontal.value], () => {
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(() => {
            if (containerRect.value && contentRect.value) {
              const sizeProperty = isHorizontal.value ? "width" : "height";
              containerSize.value = containerRect.value[sizeProperty];
              contentSize.value = contentRect.value[sizeProperty];
              isOverflowing.value = containerSize.value + 1 < contentSize.value;
            }
            if (firstSelectedIndex.value >= 0 && contentRef.value) {
              const selectedElement = contentRef.value.children[lastSelectedIndex.value];
              if (firstSelectedIndex.value === 0 || !isOverflowing.value) {
                scrollOffset.value = 0;
              } else if (props.centerActive) {
                scrollOffset.value = calculateCenteredOffset({
                  selectedElement,
                  containerSize: containerSize.value,
                  contentSize: contentSize.value,
                  isRtl: isRtl.value,
                  isHorizontal: isHorizontal.value
                });
              } else if (isOverflowing.value) {
                scrollOffset.value = calculateUpdatedOffset({
                  selectedElement,
                  containerSize: containerSize.value,
                  contentSize: contentSize.value,
                  isRtl: isRtl.value,
                  currentScrollOffset: scrollOffset.value,
                  isHorizontal: isHorizontal.value
                });
              }
            }
          });
        });
      }
      const disableTransition = ref(false);
      let startTouch = 0;
      let startOffset = 0;
      function onTouchstart(e) {
        const sizeProperty = isHorizontal.value ? "clientX" : "clientY";
        const sign = isRtl.value && isHorizontal.value ? -1 : 1;
        startOffset = sign * scrollOffset.value;
        startTouch = e.touches[0][sizeProperty];
        disableTransition.value = true;
      }
      function onTouchmove(e) {
        if (!isOverflowing.value)
          return;
        const sizeProperty = isHorizontal.value ? "clientX" : "clientY";
        const sign = isRtl.value && isHorizontal.value ? -1 : 1;
        scrollOffset.value = sign * (startOffset + startTouch - e.touches[0][sizeProperty]);
      }
      function onTouchend(e) {
        const maxScrollOffset = contentSize.value - containerSize.value;
        if (scrollOffset.value < 0 || !isOverflowing.value) {
          scrollOffset.value = 0;
        } else if (scrollOffset.value >= maxScrollOffset) {
          scrollOffset.value = maxScrollOffset;
        }
        disableTransition.value = false;
      }
      function onScroll() {
        if (!containerRef.value)
          return;
        containerRef.value[isHorizontal.value ? "scrollLeft" : "scrollTop"] = 0;
      }
      const isFocused = ref(false);
      function onFocusin(e) {
        isFocused.value = true;
        if (!isOverflowing.value || !contentRef.value)
          return;
        for (const el of e.composedPath()) {
          for (const item of contentRef.value.children) {
            if (item === el) {
              scrollOffset.value = calculateUpdatedOffset({
                selectedElement: item,
                containerSize: containerSize.value,
                contentSize: contentSize.value,
                isRtl: isRtl.value,
                currentScrollOffset: scrollOffset.value,
                isHorizontal: isHorizontal.value
              });
              return;
            }
          }
        }
      }
      function onFocusout(e) {
        isFocused.value = false;
      }
      function onFocus(e) {
        var _contentRef$value;
        if (!isFocused.value && !(e.relatedTarget && (_contentRef$value = contentRef.value) != null && _contentRef$value.contains(e.relatedTarget)))
          focus();
      }
      function onKeydown(e) {
        if (!contentRef.value)
          return;
        if (isHorizontal.value) {
          if (e.key === "ArrowRight") {
            focus(isRtl.value ? "prev" : "next");
          } else if (e.key === "ArrowLeft") {
            focus(isRtl.value ? "next" : "prev");
          }
        } else {
          if (e.key === "ArrowDown") {
            focus("next");
          } else if (e.key === "ArrowUp") {
            focus("prev");
          }
        }
        if (e.key === "Home") {
          focus("first");
        } else if (e.key === "End") {
          focus("last");
        }
      }
      function focus(location) {
        if (!contentRef.value)
          return;
        if (!location) {
          var _focusable$;
          contentRef.value.querySelector("[tabindex]");
          const focusable = [...contentRef.value.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter((el) => !el.hasAttribute("disabled"));
          (_focusable$ = focusable[0]) == null ? void 0 : _focusable$.focus();
        } else if (location === "next") {
          var _contentRef$value$que;
          const el = (_contentRef$value$que = contentRef.value.querySelector(":focus")) == null ? void 0 : _contentRef$value$que.nextElementSibling;
          if (el)
            el.focus();
          else
            focus("first");
        } else if (location === "prev") {
          var _contentRef$value$que2;
          const el = (_contentRef$value$que2 = contentRef.value.querySelector(":focus")) == null ? void 0 : _contentRef$value$que2.previousElementSibling;
          if (el)
            el.focus();
          else
            focus("last");
        } else if (location === "first") {
          var _contentRef$value$fir;
          (_contentRef$value$fir = contentRef.value.firstElementChild) == null ? void 0 : _contentRef$value$fir.focus();
        } else if (location === "last") {
          var _contentRef$value$las;
          (_contentRef$value$las = contentRef.value.lastElementChild) == null ? void 0 : _contentRef$value$las.focus();
        }
      }
      function scrollTo(location) {
        const newAbsoluteOffset = scrollOffset.value + (location === "prev" ? -1 : 1) * containerSize.value;
        scrollOffset.value = clamp(newAbsoluteOffset, 0, contentSize.value - containerSize.value);
      }
      const contentStyles = computed2(() => {
        let scrollAmount = scrollOffset.value > contentSize.value - containerSize.value ? -(contentSize.value - containerSize.value) + bias(contentSize.value - containerSize.value - scrollOffset.value) : -scrollOffset.value;
        if (scrollOffset.value <= 0) {
          scrollAmount = bias(-scrollOffset.value);
        }
        const sign = isRtl.value && isHorizontal.value ? -1 : 1;
        return {
          transform: `translate${isHorizontal.value ? "X" : "Y"}(${sign * scrollAmount}px)`,
          transition: disableTransition.value ? "none" : "",
          willChange: disableTransition.value ? "transform" : ""
        };
      });
      const slotProps = computed2(() => ({
        next: group.next,
        prev: group.prev,
        select: group.select,
        isSelected: group.isSelected
      }));
      const hasAffixes = computed2(() => {
        switch (props.showArrows) {
          case "always":
            return true;
          case "desktop":
            return !mobile.value;
          case true:
            return isOverflowing.value || Math.abs(scrollOffset.value) > 0;
          case "mobile":
            return mobile.value || isOverflowing.value || Math.abs(scrollOffset.value) > 0;
          default:
            return !mobile.value && (isOverflowing.value || Math.abs(scrollOffset.value) > 0);
        }
      });
      const hasPrev = computed2(() => {
        return Math.abs(scrollOffset.value) > 0;
      });
      const hasNext = computed2(() => {
        return contentSize.value > Math.abs(scrollOffset.value) + containerSize.value;
      });
      useRender(() => {
        var _slots$prev, _slots$default, _slots$next;
        return createVNode(props.tag, {
          "class": ["v-slide-group", {
            "v-slide-group--vertical": !isHorizontal.value,
            "v-slide-group--has-affixes": hasAffixes.value,
            "v-slide-group--is-overflowing": isOverflowing.value
          }],
          "tabindex": isFocused.value || group.selected.value.length ? -1 : 0,
          "onFocus": onFocus
        }, {
          default: () => [hasAffixes.value && createVNode("div", {
            "key": "prev",
            "class": ["v-slide-group__prev", {
              "v-slide-group__prev--disabled": !hasPrev.value
            }],
            "onClick": () => scrollTo("prev")
          }, [((_slots$prev = slots.prev) == null ? void 0 : _slots$prev.call(slots, slotProps.value)) ?? createVNode(VFadeTransition, null, {
            default: () => [createVNode(VIcon, {
              "icon": isRtl.value ? props.nextIcon : props.prevIcon
            }, null)]
          })]), createVNode("div", {
            "key": "container",
            "ref": containerRef,
            "class": "v-slide-group__container",
            "onScroll": onScroll
          }, [createVNode("div", {
            "ref": contentRef,
            "class": "v-slide-group__content",
            "style": contentStyles.value,
            "onTouchstartPassive": onTouchstart,
            "onTouchmovePassive": onTouchmove,
            "onTouchendPassive": onTouchend,
            "onFocusin": onFocusin,
            "onFocusout": onFocusout,
            "onKeydown": onKeydown
          }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, slotProps.value)])]), hasAffixes.value && createVNode("div", {
            "key": "next",
            "class": ["v-slide-group__next", {
              "v-slide-group__next--disabled": !hasNext.value
            }],
            "onClick": () => scrollTo("next")
          }, [((_slots$next = slots.next) == null ? void 0 : _slots$next.call(slots, slotProps.value)) ?? createVNode(VFadeTransition, null, {
            default: () => [createVNode(VIcon, {
              "icon": isRtl.value ? props.prevIcon : props.nextIcon
            }, null)]
          })])]
        });
      });
      return {
        selected: group.selected,
        scrollTo,
        scrollOffset,
        focus
      };
    }
  });

  // node_modules/vuetify/lib/components/VSlideGroup/VSlideGroupItem.mjs
  var VSlideGroupItem = defineComponent2({
    name: "VSlideGroupItem",
    props: {
      ...makeGroupItemProps()
    },
    emits: {
      "group:selected": (val) => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const slideGroupItem = useGroupItem(props, VSlideGroupSymbol);
      return () => {
        var _slots$default;
        return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
          isSelected: slideGroupItem.isSelected.value,
          select: slideGroupItem.select,
          toggle: slideGroupItem.toggle,
          selectedClass: slideGroupItem.selectedClass.value
        });
      };
    }
  });

  // node_modules/vuetify/lib/components/VSnackbar/VSnackbar.mjs
  var VSnackbar = genericComponent()({
    name: "VSnackbar",
    props: {
      contentClass: {
        type: String,
        default: ""
      },
      multiLine: Boolean,
      timeout: {
        type: [Number, String],
        default: 5e3
      },
      vertical: Boolean,
      modelValue: Boolean,
      ...makeLocationProps({
        location: "bottom"
      }),
      ...makePositionProps(),
      ...makeRoundedProps(),
      ...makeVariantProps(),
      ...makeTransitionProps({
        transition: "v-snackbar-transition"
      })
    },
    emits: {
      "update:modelValue": (v) => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const isActive = useProxiedModel(props, "modelValue");
      const {
        locationStyles
      } = useLocation(props);
      const {
        positionClasses
      } = usePosition(props);
      const {
        scopeId
      } = useScopeId();
      const {
        colorClasses,
        colorStyles,
        variantClasses
      } = useVariant(props);
      const {
        roundedClasses
      } = useRounded(props);
      const overlay = ref();
      watch(isActive, startTimeout);
      watch(() => props.timeout, startTimeout);
      onMounted(() => {
        if (isActive.value)
          startTimeout();
      });
      let activeTimeout = -1;
      function startTimeout() {
        window.clearTimeout(activeTimeout);
        const timeout = Number(props.timeout);
        if (!isActive.value || timeout === -1)
          return;
        activeTimeout = window.setTimeout(() => {
          isActive.value = false;
        }, timeout);
      }
      function onPointerenter() {
        window.clearTimeout(activeTimeout);
      }
      useRender(() => createVNode(VOverlay, mergeProps({
        "modelValue": isActive.value,
        "onUpdate:modelValue": ($event) => isActive.value = $event,
        "ref": overlay,
        "class": ["v-snackbar", {
          "v-snackbar--active": isActive.value,
          "v-snackbar--multi-line": props.multiLine && !props.vertical,
          "v-snackbar--vertical": props.vertical
        }, positionClasses.value],
        "style": [colorStyles.value],
        "contentProps": {
          style: locationStyles.value
        },
        "contentClass": props.contentClass,
        "persistent": true,
        "noClickAnimation": true,
        "scrim": false,
        "scrollStrategy": "none",
        "transition": props.transition
      }, scopeId), {
        default: () => [createVNode("div", {
          "class": ["v-snackbar__wrapper", colorClasses.value, roundedClasses.value, variantClasses.value],
          "onPointerenter": onPointerenter,
          "onPointerleave": startTimeout
        }, [genOverlays(false, "v-snackbar"), slots.default && createVNode("div", {
          "class": "v-snackbar__content",
          "role": "status",
          "aria-live": "polite"
        }, [slots.default()]), slots.actions && createVNode(VDefaultsProvider, {
          "defaults": {
            VBtn: {
              variant: "text",
              ripple: false
            }
          }
        }, {
          default: () => [createVNode("div", {
            "class": "v-snackbar__actions"
          }, [slots.actions()])]
        })])],
        activator: slots.activator
      }));
      return forwardRefs({}, overlay);
    }
  });

  // node_modules/vuetify/lib/components/VSwitch/VSwitch.mjs
  var VSwitch = defineComponent2({
    name: "VSwitch",
    inheritAttrs: false,
    props: {
      indeterminate: Boolean,
      inset: Boolean,
      flat: Boolean,
      loading: {
        type: [Boolean, String],
        default: false
      },
      ...makeVInputProps(),
      ...makeSelectionControlProps()
    },
    emits: {
      "update:indeterminate": (val) => true
    },
    setup(props, _ref) {
      let {
        attrs,
        slots
      } = _ref;
      const indeterminate = useProxiedModel(props, "indeterminate");
      const {
        loaderClasses
      } = useLoader(props);
      const loaderColor = computed2(() => {
        return typeof props.loading === "string" && props.loading !== "" ? props.loading : props.color;
      });
      const uid2 = getUid();
      const id = computed2(() => props.id || `switch-${uid2}`);
      function onChange() {
        if (indeterminate.value) {
          indeterminate.value = false;
        }
      }
      useRender(() => {
        const [inputAttrs, controlAttrs] = filterInputAttrs(attrs);
        const [inputProps, _1] = filterInputProps(props);
        const [controlProps, _2] = filterControlProps(props);
        const control = ref();
        function onClick() {
          var _control$value, _control$value$input;
          (_control$value = control.value) == null ? void 0 : (_control$value$input = _control$value.input) == null ? void 0 : _control$value$input.click();
        }
        return createVNode(VInput, mergeProps({
          "class": ["v-switch", {
            "v-switch--inset": props.inset
          }, {
            "v-switch--indeterminate": indeterminate.value
          }, loaderClasses.value]
        }, inputAttrs, inputProps, {
          "id": id.value
        }), {
          ...slots,
          default: (_ref2) => {
            let {
              id: id2,
              isDisabled,
              isReadonly: isReadonly2,
              isValid
            } = _ref2;
            return createVNode(VSelectionControl, mergeProps({
              "ref": control
            }, controlProps, {
              "id": id2.value,
              "type": "checkbox",
              "onUpdate:modelValue": onChange,
              "aria-checked": indeterminate.value ? "mixed" : void 0,
              "disabled": isDisabled.value,
              "readonly": isReadonly2.value
            }, controlAttrs), {
              ...slots,
              default: () => createVNode("div", {
                "class": "v-switch__track",
                "onClick": onClick
              }, null),
              input: (_ref3) => {
                let {
                  textColorClasses
                } = _ref3;
                return createVNode("div", {
                  "class": ["v-switch__thumb", textColorClasses.value]
                }, [props.loading && createVNode(LoaderSlot, {
                  "name": "v-switch",
                  "active": true,
                  "color": isValid.value === false ? void 0 : loaderColor.value
                }, {
                  default: (slotProps) => slots.loader ? slots.loader(slotProps) : createVNode(VProgressCircular, {
                    "active": slotProps.isActive,
                    "color": slotProps.color,
                    "indeterminate": true,
                    "size": "16",
                    "width": "2"
                  }, null)
                })]);
              }
            });
          }
        });
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VSystemBar/VSystemBar.mjs
  var VSystemBar = defineComponent2({
    name: "VSystemBar",
    props: {
      color: String,
      height: [Number, String],
      window: Boolean,
      ...makeElevationProps(),
      ...makeLayoutItemProps(),
      ...makeRoundedProps(),
      ...makeTagProps(),
      ...makeThemeProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        themeClasses
      } = provideTheme(props);
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(toRef(props, "color"));
      const {
        elevationClasses
      } = useElevation(props);
      const {
        roundedClasses
      } = useRounded(props);
      const height = computed2(() => props.height ?? (props.window ? 32 : 24));
      const {
        layoutItemStyles
      } = useLayoutItem({
        id: props.name,
        order: computed2(() => parseInt(props.order, 10)),
        position: ref("top"),
        layoutSize: height,
        elementSize: height,
        active: computed2(() => true),
        absolute: toRef(props, "absolute")
      });
      useRender(() => createVNode(props.tag, {
        "class": ["v-system-bar", {
          "v-system-bar--window": props.window
        }, themeClasses.value, backgroundColorClasses.value, elevationClasses.value, roundedClasses.value],
        "style": [backgroundColorStyles.value, layoutItemStyles.value]
      }, slots));
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VTabs/shared.mjs
  var VTabsSymbol = Symbol.for("vuetify:v-tabs");

  // node_modules/vuetify/lib/components/VTabs/VTab.mjs
  var VTab = defineComponent2({
    name: "VTab",
    props: {
      fixed: Boolean,
      icon: [Boolean, String, Function, Object],
      prependIcon: IconValue,
      appendIcon: IconValue,
      stacked: Boolean,
      title: String,
      ripple: {
        type: Boolean,
        default: true
      },
      color: String,
      sliderColor: String,
      hideSlider: Boolean,
      direction: {
        type: String,
        default: "horizontal"
      },
      ...makeTagProps(),
      ...makeRouterProps(),
      ...makeGroupItemProps({
        selectedClass: "v-tab--selected"
      }),
      ...makeThemeProps()
    },
    setup(props, _ref) {
      let {
        slots,
        attrs
      } = _ref;
      const {
        textColorClasses: sliderColorClasses,
        textColorStyles: sliderColorStyles
      } = useTextColor(props, "sliderColor");
      const isHorizontal = computed2(() => props.direction === "horizontal");
      const isSelected = ref(false);
      const rootEl = ref();
      const sliderEl = ref();
      function updateSlider(_ref2) {
        let {
          value
        } = _ref2;
        isSelected.value = value;
        if (value) {
          var _rootEl$value, _rootEl$value$$el$par;
          const prevEl = (_rootEl$value = rootEl.value) == null ? void 0 : (_rootEl$value$$el$par = _rootEl$value.$el.parentElement) == null ? void 0 : _rootEl$value$$el$par.querySelector(".v-tab--selected .v-tab__slider");
          const nextEl = sliderEl.value;
          if (!prevEl || !nextEl)
            return;
          const color = getComputedStyle(prevEl).color;
          const prevBox = prevEl.getBoundingClientRect();
          const nextBox = nextEl.getBoundingClientRect();
          const xy = isHorizontal.value ? "x" : "y";
          const XY = isHorizontal.value ? "X" : "Y";
          const rightBottom = isHorizontal.value ? "right" : "bottom";
          const widthHeight = isHorizontal.value ? "width" : "height";
          const prevPos = prevBox[xy];
          const nextPos = nextBox[xy];
          const delta2 = prevPos > nextPos ? prevBox[rightBottom] - nextBox[rightBottom] : prevBox[xy] - nextBox[xy];
          const origin = Math.sign(delta2) > 0 ? isHorizontal.value ? "right" : "bottom" : Math.sign(delta2) < 0 ? isHorizontal.value ? "left" : "top" : "center";
          const size2 = Math.abs(delta2) + (Math.sign(delta2) < 0 ? prevBox[widthHeight] : nextBox[widthHeight]);
          const scale = size2 / Math.max(prevBox[widthHeight], nextBox[widthHeight]);
          const initialScale = prevBox[widthHeight] / nextBox[widthHeight];
          const sigma = 1.5;
          animate(nextEl, {
            backgroundColor: [color, ""],
            transform: [`translate${XY}(${delta2}px) scale${XY}(${initialScale})`, `translate${XY}(${delta2 / sigma}px) scale${XY}(${(scale - 1) / sigma + 1})`, ""],
            transformOrigin: Array(3).fill(origin)
          }, {
            duration: 225,
            easing: standardEasing
          });
        }
      }
      useRender(() => {
        const [btnProps] = pick(props, ["href", "to", "replace", "icon", "stacked", "prependIcon", "appendIcon", "ripple", "theme", "disabled", "selectedClass", "value", "color"]);
        return createVNode(VBtn, mergeProps({
          "_as": "VTab",
          "symbol": VTabsSymbol,
          "ref": rootEl,
          "class": ["v-tab"],
          "tabindex": isSelected.value ? 0 : -1,
          "role": "tab",
          "aria-selected": String(isSelected.value),
          "active": false,
          "block": props.fixed,
          "maxWidth": props.fixed ? 300 : void 0,
          "variant": "text",
          "rounded": 0
        }, btnProps, attrs, {
          "onGroup:selected": updateSlider
        }), {
          default: () => [slots.default ? slots.default() : props.title, !props.hideSlider && createVNode("div", {
            "ref": sliderEl,
            "class": ["v-tab__slider", sliderColorClasses.value],
            "style": sliderColorStyles.value
          }, null)]
        });
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VTabs/VTabs.mjs
  function parseItems(items) {
    if (!items)
      return [];
    return items.map((item) => {
      if (typeof item === "string")
        return {
          title: item,
          value: item
        };
      return item;
    });
  }
  var VTabs = defineComponent2({
    name: "VTabs",
    props: {
      alignWithTitle: Boolean,
      color: String,
      direction: {
        type: String,
        default: "horizontal"
      },
      fixedTabs: Boolean,
      items: {
        type: Array,
        default: () => []
      },
      stacked: Boolean,
      bgColor: String,
      centered: Boolean,
      grow: Boolean,
      height: {
        type: [Number, String],
        default: void 0
      },
      hideSlider: Boolean,
      optional: Boolean,
      end: Boolean,
      sliderColor: String,
      modelValue: null,
      ...makeDensityProps(),
      ...makeTagProps()
    },
    emits: {
      "update:modelValue": (v) => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const model = useProxiedModel(props, "modelValue");
      const parsedItems = computed2(() => parseItems(props.items));
      const {
        densityClasses
      } = useDensity(props);
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(toRef(props, "bgColor"));
      provideDefaults({
        VTab: {
          color: toRef(props, "color"),
          direction: toRef(props, "direction"),
          stacked: toRef(props, "stacked"),
          fixed: toRef(props, "fixedTabs"),
          sliderColor: toRef(props, "sliderColor"),
          hideSlider: toRef(props, "hideSlider")
        }
      });
      useRender(() => createVNode(VSlideGroup, {
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-tabs", `v-tabs--${props.direction}`, {
          "v-tabs--align-with-title": props.alignWithTitle,
          "v-tabs--centered": props.centered,
          "v-tabs--fixed-tabs": props.fixedTabs,
          "v-tabs--grow": props.grow,
          "v-tabs--end": props.end,
          "v-tabs--stacked": props.stacked
        }, densityClasses.value, backgroundColorClasses.value],
        "style": backgroundColorStyles.value,
        "role": "tablist",
        "symbol": VTabsSymbol,
        "mandatory": "force",
        "direction": props.direction
      }, {
        default: () => [slots.default ? slots.default() : parsedItems.value.map((item) => createVNode(VTab, mergeProps(item, {
          "key": item.title
        }), null))]
      }));
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VTable/VTable.mjs
  var VTable = defineComponent2({
    name: "VTable",
    props: {
      fixedHeader: Boolean,
      fixedFooter: Boolean,
      height: [Number, String],
      ...makeDensityProps(),
      ...makeTagProps(),
      ...makeThemeProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        themeClasses
      } = provideTheme(props);
      const {
        densityClasses
      } = useDensity(props);
      useRender(() => {
        var _slots$top, _slots$bottom;
        return createVNode(props.tag, {
          "class": ["v-table", {
            "v-table--fixed-height": !!props.height,
            "v-table--fixed-header": props.fixedHeader,
            "v-table--fixed-footer": props.fixedFooter,
            "v-table--has-top": !!slots.top,
            "v-table--has-bottom": !!slots.bottom
          }, themeClasses.value, densityClasses.value]
        }, {
          default: () => [(_slots$top = slots.top) == null ? void 0 : _slots$top.call(slots), slots.default && createVNode("div", {
            "class": "v-table__wrapper",
            "style": {
              height: convertToUnit(props.height)
            }
          }, [createVNode("table", null, [slots.default()])]), (_slots$bottom = slots.bottom) == null ? void 0 : _slots$bottom.call(slots)]
        });
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VTextarea/VTextarea.mjs
  var VTextarea = defineComponent2({
    name: "VTextarea",
    directives: {
      Intersect: intersect_default
    },
    inheritAttrs: false,
    props: {
      autoGrow: Boolean,
      autofocus: Boolean,
      counter: [Boolean, Number, String],
      counterValue: Function,
      hint: String,
      persistentHint: Boolean,
      prefix: String,
      placeholder: String,
      persistentPlaceholder: Boolean,
      persistentCounter: Boolean,
      noResize: Boolean,
      rows: {
        type: [Number, String],
        default: 5,
        validator: (v) => !isNaN(parseFloat(v))
      },
      maxRows: {
        type: [Number, String],
        validator: (v) => !isNaN(parseFloat(v))
      },
      suffix: String,
      ...makeVInputProps(),
      ...makeVFieldProps()
    },
    emits: {
      "click:control": (e) => true,
      "update:modelValue": (val) => true
    },
    setup(props, _ref) {
      let {
        attrs,
        emit: emit2,
        slots
      } = _ref;
      const model = useProxiedModel(props, "modelValue");
      const counterValue = computed2(() => {
        return typeof props.counterValue === "function" ? props.counterValue(model.value) : (model.value || "").toString().length;
      });
      const max = computed2(() => {
        if (attrs.maxlength)
          return attrs.maxlength;
        if (!props.counter || typeof props.counter !== "number" && typeof props.counter !== "string")
          return void 0;
        return props.counter;
      });
      function onIntersect(isIntersecting, entries) {
        var _entries$0$target, _entries$0$target$foc;
        if (!props.autofocus || !isIntersecting)
          return;
        (_entries$0$target = entries[0].target) == null ? void 0 : (_entries$0$target$foc = _entries$0$target.focus) == null ? void 0 : _entries$0$target$foc.call(_entries$0$target);
      }
      const vInputRef = ref();
      const vFieldRef = ref();
      const isFocused = ref(false);
      const controlHeight = ref("");
      const textareaRef = ref();
      const isActive = computed2(() => isFocused.value || props.persistentPlaceholder);
      const messages = computed2(() => {
        return props.messages.length ? props.messages : isActive.value || props.persistentHint ? props.hint : "";
      });
      function onFocus() {
        if (textareaRef.value !== document.activeElement) {
          var _textareaRef$value;
          (_textareaRef$value = textareaRef.value) == null ? void 0 : _textareaRef$value.focus();
        }
        if (!isFocused.value)
          isFocused.value = true;
      }
      function onControlClick(e) {
        onFocus();
        emit2("click:control", e);
      }
      function onClear(e) {
        e.stopPropagation();
        onFocus();
        nextTick(() => {
          model.value = "";
          callEvent(props["onClick:clear"], e);
        });
      }
      function onInput(e) {
        model.value = e.target.value;
      }
      const sizerRef = ref();
      function calculateInputHeight() {
        if (!props.autoGrow)
          return;
        nextTick(() => {
          if (!sizerRef.value || !vFieldRef.value)
            return;
          const style = getComputedStyle(sizerRef.value);
          const fieldStyle = getComputedStyle(vFieldRef.value.$el);
          const padding = parseFloat(style.getPropertyValue("--v-field-padding-top")) + parseFloat(style.getPropertyValue("--v-input-padding-top")) + parseFloat(style.getPropertyValue("--v-field-padding-bottom"));
          const height = sizerRef.value.scrollHeight;
          const lineHeight = parseFloat(style.lineHeight);
          const minHeight = Math.max(parseFloat(props.rows) * lineHeight + padding, parseFloat(fieldStyle.getPropertyValue("--v-input-control-height")));
          const maxHeight = parseFloat(props.maxRows) * lineHeight + padding || Infinity;
          controlHeight.value = convertToUnit(clamp(height ?? 0, minHeight, maxHeight));
        });
      }
      onMounted(calculateInputHeight);
      watch(model, calculateInputHeight);
      watch(() => props.rows, calculateInputHeight);
      watch(() => props.maxRows, calculateInputHeight);
      watch(() => props.density, calculateInputHeight);
      let observer;
      watch(sizerRef, (val) => {
        if (val) {
          observer = new ResizeObserver(calculateInputHeight);
          observer.observe(sizerRef.value);
        } else {
          var _observer;
          (_observer = observer) == null ? void 0 : _observer.disconnect();
        }
      });
      onBeforeUnmount(() => {
        var _observer2;
        (_observer2 = observer) == null ? void 0 : _observer2.disconnect();
      });
      useRender(() => {
        const hasCounter = !!(slots.counter || props.counter || props.counterValue);
        const hasDetails = !!(hasCounter || slots.details);
        const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
        const [{
          modelValue: _,
          ...inputProps
        }] = filterInputProps(props);
        const [fieldProps] = filterFieldProps(props);
        return createVNode(VInput, mergeProps({
          "ref": vInputRef,
          "modelValue": model.value,
          "onUpdate:modelValue": ($event) => model.value = $event,
          "class": ["v-textarea v-text-field", {
            "v-textarea--prefixed": props.prefix,
            "v-textarea--suffixed": props.suffix,
            "v-text-field--prefixed": props.prefix,
            "v-text-field--suffixed": props.suffix,
            "v-textarea--auto-grow": props.autoGrow,
            "v-textarea--no-resize": props.noResize || props.autoGrow,
            "v-text-field--flush-details": ["plain", "underlined"].includes(props.variant)
          }],
          "onClick:prepend": props["onClick:prepend"],
          "onClick:append": props["onClick:append"]
        }, rootAttrs, inputProps, {
          "messages": messages.value
        }), {
          ...slots,
          default: (_ref2) => {
            let {
              isDisabled,
              isDirty,
              isReadonly: isReadonly2,
              isValid
            } = _ref2;
            return createVNode(VField, mergeProps({
              "ref": vFieldRef,
              "style": {
                "--v-textarea-control-height": controlHeight.value
              },
              "onClick:control": onControlClick,
              "onClick:clear": onClear,
              "onClick:prependInner": props["onClick:prependInner"],
              "onClick:appendInner": props["onClick:appendInner"],
              "role": "textbox"
            }, fieldProps, {
              "active": isActive.value || isDirty.value,
              "dirty": isDirty.value || props.dirty,
              "focused": isFocused.value,
              "error": isValid.value === false
            }), {
              ...slots,
              default: (_ref3) => {
                let {
                  props: {
                    class: fieldClass,
                    ...slotProps
                  }
                } = _ref3;
                return createVNode(Fragment, null, [props.prefix && createVNode("span", {
                  "class": "v-text-field__prefix"
                }, [props.prefix]), withDirectives(createVNode("textarea", mergeProps({
                  "ref": textareaRef,
                  "class": fieldClass,
                  "value": model.value,
                  "onInput": onInput,
                  "autofocus": props.autofocus,
                  "readonly": isReadonly2.value,
                  "disabled": isDisabled.value,
                  "placeholder": props.placeholder,
                  "rows": props.rows,
                  "name": props.name,
                  "onFocus": onFocus,
                  "onBlur": () => isFocused.value = false
                }, slotProps, inputAttrs), null), [[resolveDirective("intersect"), {
                  handler: onIntersect
                }, null, {
                  once: true
                }]]), props.autoGrow && withDirectives(createVNode("textarea", {
                  "class": [fieldClass, "v-textarea__sizer"],
                  "onUpdate:modelValue": ($event) => model.value = $event,
                  "ref": sizerRef,
                  "readonly": true,
                  "aria-hidden": "true"
                }, null), [[vModelText, model.value]]), props.suffix && createVNode("span", {
                  "class": "v-text-field__suffix"
                }, [props.suffix])]);
              }
            });
          },
          details: hasDetails ? (slotProps) => {
            var _slots$details;
            return createVNode(Fragment, null, [(_slots$details = slots.details) == null ? void 0 : _slots$details.call(slots, slotProps), hasCounter && createVNode(Fragment, null, [createVNode("span", null, null), createVNode(VCounter, {
              "active": props.persistentCounter || isFocused.value,
              "value": counterValue.value,
              "max": max.value
            }, slots.counter)])]);
          } : void 0
        });
      });
      return forwardRefs({}, vInputRef, vFieldRef, textareaRef);
    }
  });

  // node_modules/vuetify/lib/components/VThemeProvider/VThemeProvider.mjs
  var VThemeProvider = defineComponent2({
    name: "VThemeProvider",
    props: {
      withBackground: Boolean,
      ...makeThemeProps(),
      ...makeTagProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        themeClasses
      } = provideTheme(props);
      return () => {
        var _slots$default, _slots$default2;
        if (!props.withBackground)
          return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots);
        return createVNode(props.tag, {
          "class": ["v-theme-provider", themeClasses.value]
        }, {
          default: () => [(_slots$default2 = slots.default) == null ? void 0 : _slots$default2.call(slots)]
        });
      };
    }
  });

  // node_modules/vuetify/lib/components/VTimeline/VTimeline.mjs
  var VTimeline = defineComponent2({
    name: "VTimeline",
    props: {
      align: {
        type: String,
        default: "center",
        validator: (v) => ["center", "start"].includes(v)
      },
      direction: {
        type: String,
        default: "vertical",
        validator: (v) => ["vertical", "horizontal"].includes(v)
      },
      justify: {
        type: String,
        default: "auto",
        validator: (v) => ["auto", "center"].includes(v)
      },
      side: {
        type: String,
        validator: (v) => v == null || ["start", "end"].includes(v)
      },
      lineInset: {
        type: [String, Number],
        default: 0
      },
      lineThickness: {
        type: [String, Number],
        default: 2
      },
      lineColor: String,
      truncateLine: {
        type: String,
        validator: (v) => ["start", "end", "both"].includes(v)
      },
      ...makeDensityProps(),
      ...makeTagProps(),
      ...makeThemeProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        themeClasses
      } = provideTheme(props);
      const {
        densityClasses
      } = useDensity(props);
      provideDefaults({
        VTimelineDivider: {
          lineColor: toRef(props, "lineColor")
        },
        VTimelineItem: {
          density: toRef(props, "density"),
          lineInset: toRef(props, "lineInset")
        }
      });
      const sideClasses = computed2(() => {
        const side = props.side ? props.side : props.density !== "default" ? "end" : null;
        return side && `v-timeline--side-${side}`;
      });
      const truncateClasses = computed2(() => {
        const classes = ["v-timeline--truncate-line-start", "v-timeline--truncate-line-end"];
        switch (props.truncateLine) {
          case "both":
            return classes;
          case "start":
            return classes[0];
          case "end":
            return classes[1];
          default:
            return null;
        }
      });
      useRender(() => createVNode(props.tag, {
        "class": ["v-timeline", `v-timeline--${props.direction}`, `v-timeline--align-${props.align}`, `v-timeline--justify-${props.justify}`, truncateClasses.value, {
          "v-timeline--inset-line": !!props.lineInset
        }, themeClasses.value, densityClasses.value, sideClasses.value],
        "style": {
          "--v-timeline-line-thickness": convertToUnit(props.lineThickness)
        }
      }, slots));
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VTimeline/VTimelineDivider.mjs
  var VTimelineDivider = defineComponent2({
    name: "VTimelineDivider",
    props: {
      dotColor: String,
      fillDot: Boolean,
      hideDot: Boolean,
      icon: IconValue,
      iconColor: String,
      lineColor: String,
      ...makeRoundedProps(),
      ...makeSizeProps(),
      ...makeElevationProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        sizeClasses,
        sizeStyles
      } = useSize(props, "v-timeline-divider__dot");
      const {
        backgroundColorStyles,
        backgroundColorClasses
      } = useBackgroundColor(toRef(props, "dotColor"));
      const {
        roundedClasses
      } = useRounded(props, "v-timeline-divider__dot");
      const {
        elevationClasses
      } = useElevation(props);
      const {
        backgroundColorClasses: lineColorClasses,
        backgroundColorStyles: lineColorStyles
      } = useBackgroundColor(toRef(props, "lineColor"));
      provideDefaults({
        VIcon: {
          color: toRef(props, "iconColor"),
          icon: toRef(props, "icon"),
          size: toRef(props, "size")
        }
      });
      useRender(() => {
        var _slots$default;
        return createVNode("div", {
          "class": ["v-timeline-divider", {
            "v-timeline-divider--fill-dot": props.fillDot
          }]
        }, [createVNode("div", {
          "class": ["v-timeline-divider__before", lineColorClasses.value],
          "style": lineColorStyles.value
        }, null), !props.hideDot && createVNode("div", {
          "key": "dot",
          "class": ["v-timeline-divider__dot", elevationClasses.value, roundedClasses.value, sizeClasses.value],
          "style": sizeStyles.value
        }, [createVNode("div", {
          "class": ["v-timeline-divider__inner-dot", backgroundColorClasses.value, roundedClasses.value],
          "style": backgroundColorStyles.value
        }, [((_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)) ?? (props.icon ? createVNode(VIcon, null, null) : void 0)])]), createVNode("div", {
          "class": ["v-timeline-divider__after", lineColorClasses.value],
          "style": lineColorStyles.value
        }, null)]);
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VTimeline/VTimelineItem.mjs
  var VTimelineItem = defineComponent2({
    name: "VTimelineItem",
    props: {
      density: String,
      dotColor: String,
      fillDot: Boolean,
      hideDot: Boolean,
      hideOpposite: {
        type: Boolean,
        default: void 0
      },
      icon: IconValue,
      iconColor: String,
      lineInset: [Number, String],
      ...makeRoundedProps(),
      ...makeElevationProps(),
      ...makeSizeProps(),
      ...makeTagProps(),
      ...makeDimensionProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        dimensionStyles
      } = useDimension(props);
      const dotSize = ref(0);
      const dotRef = ref();
      watch(dotRef, (newValue) => {
        var _newValue$$el$querySe;
        if (!newValue)
          return;
        dotSize.value = ((_newValue$$el$querySe = newValue.$el.querySelector(".v-timeline-divider__dot")) == null ? void 0 : _newValue$$el$querySe.getBoundingClientRect().width) ?? 0;
      }, {
        flush: "post"
      });
      useRender(() => {
        var _slots$default, _slots$opposite;
        return createVNode("div", {
          "class": ["v-timeline-item", {
            "v-timeline-item--fill-dot": props.fillDot
          }],
          "style": {
            "--v-timeline-dot-size": convertToUnit(dotSize.value),
            "--v-timeline-line-inset": props.lineInset ? `calc(var(--v-timeline-dot-size) / 2 + ${convertToUnit(props.lineInset)})` : convertToUnit(0)
          }
        }, [createVNode("div", {
          "class": "v-timeline-item__body",
          "style": dimensionStyles.value
        }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]), createVNode(VTimelineDivider, {
          "ref": dotRef,
          "hideDot": props.hideDot,
          "icon": props.icon,
          "iconColor": props.iconColor,
          "size": props.size,
          "elevation": props.elevation,
          "dotColor": props.dotColor,
          "fillDot": props.fillDot,
          "rounded": props.rounded
        }, {
          default: slots.icon
        }), props.density !== "compact" && createVNode("div", {
          "class": "v-timeline-item__opposite"
        }, [!props.hideOpposite && ((_slots$opposite = slots.opposite) == null ? void 0 : _slots$opposite.call(slots))])]);
      });
      return {};
    }
  });

  // node_modules/vuetify/lib/components/VTooltip/VTooltip.mjs
  var VTooltip = genericComponent()({
    name: "VTooltip",
    inheritAttrs: false,
    props: {
      id: String,
      modelValue: Boolean,
      text: String,
      location: {
        type: String,
        default: "end"
      },
      origin: {
        type: String,
        default: "auto"
      },
      ...makeTransitionProps({
        transition: false
      })
    },
    emits: {
      "update:modelValue": (value) => true
    },
    setup(props, _ref) {
      let {
        attrs,
        slots
      } = _ref;
      const isActive = useProxiedModel(props, "modelValue");
      const {
        scopeId
      } = useScopeId();
      const uid2 = getUid();
      const id = computed2(() => props.id || `v-tooltip-${uid2}`);
      const overlay = ref();
      const location = computed2(() => {
        return props.location.split(" ").length > 1 ? props.location : props.location + " center";
      });
      const origin = computed2(() => {
        return props.origin === "auto" || props.origin === "overlap" || props.origin.split(" ").length > 1 || props.location.split(" ").length > 1 ? props.origin : props.origin + " center";
      });
      const transition = computed2(() => {
        if (props.transition)
          return props.transition;
        return isActive.value ? "scale-transition" : "fade-transition";
      });
      useRender(() => createVNode(VOverlay, mergeProps({
        "modelValue": isActive.value,
        "onUpdate:modelValue": ($event) => isActive.value = $event,
        "ref": overlay,
        "class": ["v-tooltip"],
        "id": id.value,
        "transition": transition.value,
        "absolute": true,
        "locationStrategy": "connected",
        "scrollStrategy": "reposition",
        "location": location.value,
        "origin": origin.value,
        "min-width": 0,
        "offset": 10,
        "scrim": false,
        "persistent": true,
        "open-on-click": false,
        "open-on-hover": true,
        "close-on-back": false,
        "role": "tooltip",
        "eager": true,
        "activatorProps": {
          "aria-describedby": id.value
        }
      }, scopeId, attrs), {
        activator: slots.activator,
        default: function() {
          var _slots$default;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return ((_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, ...args)) ?? props.text;
        }
      }));
      return forwardRefs({}, overlay);
    }
  });

  // node_modules/vuetify/lib/components/VValidation/VValidation.mjs
  var VValidation = defineComponent2({
    name: "VValidation",
    props: {
      ...makeValidationProps()
    },
    emits: {
      "update:modelValue": (val) => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const validation = useValidation(props, "validation");
      return () => {
        var _slots$default;
        return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, validation);
      };
    }
  });

  // node_modules/vuetify/lib/directives/index.mjs
  var directives_exports = {};
  __export(directives_exports, {
    ClickOutside: () => ClickOutside,
    Intersect: () => Intersect,
    Mutate: () => Mutate,
    Resize: () => Resize,
    Ripple: () => Ripple,
    Scroll: () => Scroll,
    Touch: () => Touch
  });

  // node_modules/vuetify/lib/directives/mutate/index.mjs
  function mounted4(el, binding) {
    const modifiers = binding.modifiers || {};
    const value = binding.value;
    const {
      once,
      immediate,
      ...modifierKeys
    } = modifiers;
    const defaultValue = !Object.keys(modifierKeys).length;
    const {
      handler,
      options
    } = typeof value === "object" ? value : {
      handler: value,
      options: {
        attributes: (modifierKeys == null ? void 0 : modifierKeys.attr) ?? defaultValue,
        characterData: (modifierKeys == null ? void 0 : modifierKeys.char) ?? defaultValue,
        childList: (modifierKeys == null ? void 0 : modifierKeys.child) ?? defaultValue,
        subtree: (modifierKeys == null ? void 0 : modifierKeys.sub) ?? defaultValue
      }
    };
    const observer = new MutationObserver(function() {
      let mutations = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
      let observer2 = arguments.length > 1 ? arguments[1] : void 0;
      handler == null ? void 0 : handler(mutations, observer2);
      if (once)
        unmounted4(el, binding);
    });
    if (immediate)
      handler == null ? void 0 : handler([], observer);
    el._mutate = Object(el._mutate);
    el._mutate[binding.instance.$.uid] = {
      observer
    };
    observer.observe(el, options);
  }
  function unmounted4(el, binding) {
    var _el$_mutate;
    if (!((_el$_mutate = el._mutate) != null && _el$_mutate[binding.instance.$.uid]))
      return;
    el._mutate[binding.instance.$.uid].observer.disconnect();
    delete el._mutate[binding.instance.$.uid];
  }
  var Mutate = {
    mounted: mounted4,
    unmounted: unmounted4
  };

  // node_modules/vuetify/lib/directives/resize/index.mjs
  function mounted5(el, binding) {
    var _binding$modifiers, _binding$modifiers2;
    const handler = binding.value;
    const options = {
      passive: !((_binding$modifiers = binding.modifiers) != null && _binding$modifiers.active)
    };
    window.addEventListener("resize", handler, options);
    el._onResize = Object(el._onResize);
    el._onResize[binding.instance.$.uid] = {
      handler,
      options
    };
    if (!((_binding$modifiers2 = binding.modifiers) != null && _binding$modifiers2.quiet)) {
      handler();
    }
  }
  function unmounted5(el, binding) {
    var _el$_onResize;
    if (!((_el$_onResize = el._onResize) != null && _el$_onResize[binding.instance.$.uid]))
      return;
    const {
      handler,
      options
    } = el._onResize[binding.instance.$.uid];
    window.removeEventListener("resize", handler, options);
    delete el._onResize[binding.instance.$.uid];
  }
  var Resize = {
    mounted: mounted5,
    unmounted: unmounted5
  };

  // node_modules/vuetify/lib/directives/scroll/index.mjs
  function mounted6(el, binding) {
    const {
      self: self2 = false
    } = binding.modifiers ?? {};
    const value = binding.value;
    const options = typeof value === "object" && value.options || {
      passive: true
    };
    const handler = typeof value === "function" || "handleEvent" in value ? value : value.handler;
    const target = self2 ? el : binding.arg ? document.querySelector(binding.arg) : window;
    if (!target)
      return;
    target.addEventListener("scroll", handler, options);
    el._onScroll = Object(el._onScroll);
    el._onScroll[binding.instance.$.uid] = {
      handler,
      options,
      target: self2 ? void 0 : target
    };
  }
  function unmounted6(el, binding) {
    var _el$_onScroll;
    if (!((_el$_onScroll = el._onScroll) != null && _el$_onScroll[binding.instance.$.uid]))
      return;
    const {
      handler,
      options,
      target = el
    } = el._onScroll[binding.instance.$.uid];
    target.removeEventListener("scroll", handler, options);
    delete el._onScroll[binding.instance.$.uid];
  }
  function updated2(el, binding) {
    if (binding.value === binding.oldValue)
      return;
    unmounted6(el, binding);
    mounted6(el, binding);
  }
  var Scroll = {
    mounted: mounted6,
    unmounted: unmounted6,
    updated: updated2
  };

  // vue-script:/Users/kennedyb/Projects/pardes/packages/client/src/App.vue?type=script
  var App_default = {
    data: () => ({
      links: [
        "Dashboard",
        "Messages",
        "Profile",
        "Updates"
      ]
    })
  };

  // vue-template:/Users/kennedyb/Projects/pardes/packages/client/src/App.vue?type=template
  function render(_ctx, _cache) {
    const _component_v_avatar = resolveComponent("v-avatar");
    const _component_v_tab = resolveComponent("v-tab");
    const _component_v_tabs = resolveComponent("v-tabs");
    const _component_v_app_bar = resolveComponent("v-app-bar");
    const _component_v_sheet = resolveComponent("v-sheet");
    const _component_v_col = resolveComponent("v-col");
    const _component_v_row = resolveComponent("v-row");
    const _component_v_container = resolveComponent("v-container");
    const _component_v_main = resolveComponent("v-main");
    const _component_v_app = resolveComponent("v-app");
    return openBlock(), createBlock(_component_v_app, { id: "inspire" }, {
      default: withCtx(() => [
        createVNode(_component_v_app_bar, {
          app: "",
          color: "white",
          density: "compact",
          flat: ""
        }, {
          default: withCtx(() => [
            createVNode(_component_v_avatar, {
              color: "grey darken-2 shrink",
              size: "32"
            }),
            createVNode(_component_v_tabs, {
              centered: "",
              class: "ml-n9 flex-grow-1",
              color: "grey darken-1"
            }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.links, (link) => {
                  return openBlock(), createBlock(_component_v_tab, { key: link }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(link), 1)
                    ]),
                    _: 2
                  }, 1024);
                }), 128))
              ]),
              _: 1
            }),
            createVNode(_component_v_avatar, {
              class: "hidden-sm-and-down",
              color: "grey darken-1 shrink",
              size: "32"
            })
          ]),
          _: 1
        }),
        createVNode(_component_v_main, { class: "grey lighten-3" }, {
          default: withCtx(() => [
            createVNode(_component_v_container, null, {
              default: withCtx(() => [
                createVNode(_component_v_row, null, {
                  default: withCtx(() => [
                    createVNode(_component_v_col, {
                      cols: "12",
                      sm: "2"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_v_sheet, {
                          rounded: "lg",
                          "min-height": "268"
                        }, {
                          default: withCtx(() => [
                            createCommentVNode("  ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_col, {
                      cols: "12",
                      sm: "8"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_v_sheet, {
                          "min-height": "70vh",
                          rounded: "lg"
                        }, {
                          default: withCtx(() => [
                            createCommentVNode("  ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_col, {
                      cols: "12",
                      sm: "2"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_v_sheet, {
                          rounded: "lg",
                          "min-height": "268"
                        }, {
                          default: withCtx(() => [
                            createCommentVNode("  ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    });
  }

  // packages/client/src/App.vue
  App_default.render = render;
  var App_default2 = App_default;

  // packages/client/src/main.ts
  var app = createApp(App_default2);
  var vuetify = createVuetify({
    components: components_exports,
    directives: directives_exports
  });
  app.use(vuetify);
  app.mount("#app");
})();
//# sourceMappingURL=main.js.map
