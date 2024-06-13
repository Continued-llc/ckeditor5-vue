import * as C from "vue";
import { defineComponent as L, markRaw as M, h as A } from "vue";
var K = typeof global == "object" && global && global.Object === Object && global;
const P = K;
var U = typeof self == "object" && self && self.Object === Object && self, F = P || U || Function("return this")();
const N = F;
var G = N.Symbol;
const b = G;
var x = Object.prototype, q = x.hasOwnProperty, H = x.toString, g = b ? b.toStringTag : void 0;
function X(t) {
  var e = q.call(t, g), i = t[g];
  try {
    t[g] = void 0;
    var o = !0;
  } catch {
  }
  var s = H.call(t);
  return o && (e ? t[g] = i : delete t[g]), s;
}
var Y = Object.prototype, z = Y.toString;
function J(t) {
  return z.call(t);
}
var Q = "[object Null]", Z = "[object Undefined]", $ = b ? b.toStringTag : void 0;
function tt(t) {
  return t == null ? t === void 0 ? Z : Q : $ && $ in Object(t) ? X(t) : J(t);
}
function et(t) {
  return t != null && typeof t == "object";
}
var nt = "[object Symbol]";
function it(t) {
  return typeof t == "symbol" || et(t) && tt(t) == nt;
}
var rt = /\s/;
function ot(t) {
  for (var e = t.length; e-- && rt.test(t.charAt(e)); )
    ;
  return e;
}
var at = /^\s+/;
function st(t) {
  return t && t.slice(0, ot(t) + 1).replace(at, "");
}
function v(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var V = 0 / 0, dt = /^[-+]0x[0-9a-f]+$/i, ct = /^0b[01]+$/i, lt = /^0o[0-7]+$/i, ut = parseInt;
function k(t) {
  if (typeof t == "number")
    return t;
  if (it(t))
    return V;
  if (v(t)) {
    var e = typeof t.valueOf == "function" ? t.valueOf() : t;
    t = v(e) ? e + "" : e;
  }
  if (typeof t != "string")
    return t === 0 ? t : +t;
  t = st(t);
  var i = ct.test(t);
  return i || lt.test(t) ? ut(t.slice(2), i ? 2 : 8) : dt.test(t) ? V : +t;
}
var ft = function() {
  return N.Date.now();
};
const E = ft;
var mt = "Expected a function", gt = Math.max, ht = Math.min;
function bt(t, e, i) {
  var o, s, l, c, r, d, u = 0, S = !1, f = !1, p = !0;
  if (typeof t != "function")
    throw new TypeError(mt);
  e = k(e) || 0, v(i) && (S = !!i.leading, f = "maxWait" in i, l = f ? gt(k(i.maxWait) || 0, e) : l, p = "trailing" in i ? !!i.trailing : p);
  function y(n) {
    var a = o, m = s;
    return o = s = void 0, u = n, c = t.apply(m, a), c;
  }
  function R(n) {
    return u = n, r = setTimeout(h, e), S ? y(n) : c;
  }
  function W(n) {
    var a = n - d, m = n - u, w = e - a;
    return f ? ht(w, l - m) : w;
  }
  function j(n) {
    var a = n - d, m = n - u;
    return d === void 0 || a >= e || a < 0 || f && m >= l;
  }
  function h() {
    var n = E();
    if (j(n))
      return I(n);
    r = setTimeout(h, W(n));
  }
  function I(n) {
    return r = void 0, p && o ? y(n) : (o = s = void 0, c);
  }
  function _() {
    r !== void 0 && clearTimeout(r), u = 0, o = d = s = r = void 0;
  }
  function B() {
    return r === void 0 ? c : I(E());
  }
  function T() {
    var n = E(), a = j(n);
    if (o = arguments, s = this, d = n, a) {
      if (r === void 0)
        return R(d);
      if (f)
        return clearTimeout(r), r = setTimeout(h, e), y(d);
    }
    return r === void 0 && (r = setTimeout(h, e)), c;
  }
  return T.cancel = _, T.flush = B, T;
}
/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */
const O = "Integration Sample", pt = 300, D = L({
  name: "Ckeditor",
  model: {
    prop: "modelValue",
    event: "update:modelValue"
  },
  props: {
    editor: {
      type: Function,
      required: !0
    },
    config: {
      type: Object,
      default: () => ({})
    },
    modelValue: {
      type: String,
      default: ""
    },
    tagName: {
      type: String,
      default: "div"
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    disableTwoWayDataBinding: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    "ready",
    "destroy",
    "blur",
    "focus",
    "input",
    "update:modelValue"
  ],
  data() {
    return {
      instance: null,
      lastEditorData: null
    };
  },
  watch: {
    modelValue(t) {
      this.instance && t !== this.lastEditorData && this.instance.data.set(t);
    },
    disabled(t) {
      t ? this.instance.enableReadOnlyMode(O) : this.instance.disableReadOnlyMode(O);
    }
  },
  created() {
    const { CKEDITOR_VERSION: t } = window;
    if (!t)
      return console.warn('Cannot find the "CKEDITOR_VERSION" in the "window" scope.');
    const [e] = t.split(".").map(Number);
    e >= 42 || t.startsWith("0.0.0") || console.warn("The <CKEditor> component requires using CKEditor 5 in version 42+ or nightly build.");
  },
  mounted() {
    const t = Object.assign({}, this.config);
    this.modelValue && (t.initialData = this.modelValue), this.editor.create(this.$el, t).then((e) => {
      this.instance = M(e), this.setUpEditorEvents(), this.modelValue !== t.initialData && e.data.set(this.modelValue), this.disabled && e.enableReadOnlyMode(O), this.$emit("ready", e);
    }).catch((e) => {
      console.error(e);
    });
  },
  beforeUnmount() {
    this.instance && (this.instance.destroy(), this.instance = null), this.$emit("destroy", this.instance);
  },
  methods: {
    setUpEditorEvents() {
      const t = this.instance, e = bt((i) => {
        if (this.disableTwoWayDataBinding)
          return;
        const o = this.lastEditorData = t.data.get();
        this.$emit("update:modelValue", o, i, t), this.$emit("input", o, i, t);
      }, pt, { leading: !0 });
      t.model.document.on("change:data", e), t.editing.view.document.on("focus", (i) => {
        this.$emit("focus", i, t);
      }), t.editing.view.document.on("blur", (i) => {
        this.$emit("blur", i, t);
      });
    }
  },
  render() {
    return A(this.tagName);
  }
});
/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */
if (!C.version || !C.version.startsWith("3."))
  throw new Error(
    "The CKEditor plugin works only with Vue 3+. For more information, please refer to https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/vuejs-v3.html"
  );
const Tt = {
  install(t) {
    t.component("Ckeditor", D);
  },
  component: D
};
export {
  Tt as default
};
