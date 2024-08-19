!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], t)
    : t(
        ((e =
          "undefined" != typeof globalThis ? globalThis : e || self).MediaInfo =
          {})
      );
})(this, function (e) {
  "use strict";
  function t(e) {
    return (function (e) {
      return (
        null !== e &&
        "object" == typeof e &&
        Object.prototype.hasOwnProperty.call(e, "message")
      );
    })(e)
      ? e
      : new Error("string" == typeof e ? e : "Unknown error");
  }
  const r = [
      "Active_Height",
      "Active_Width",
      "AudioCount",
      "Audio_Channels_Total",
      "BitDepth_Detected",
      "BitDepth",
      "BitDepth_Stored",
      "Channels",
      "Channels_Original",
      "Chapters_Pos_Begin",
      "Chapters_Pos_End",
      "Comic_Position_Total",
      "Count",
      "DataSize",
      "ElementCount",
      "EPG_Positions_Begin",
      "EPG_Positions_End",
      "FirstPacketOrder",
      "FooterSize",
      "Format_Settings_GMC",
      "Format_Settings_RefFrames",
      "Format_Settings_SliceCount",
      "FrameCount",
      "FrameRate_Den",
      "FrameRate_Num",
      "GeneralCount",
      "HeaderSize",
      "Height_CleanAperture",
      "Height",
      "Height_Offset",
      "Height_Original",
      "ImageCount",
      "Matrix_Channels",
      "MenuCount",
      "OtherCount",
      "Part_Position",
      "Part_Position_Total",
      "Played_Count",
      "Reel_Position",
      "Reel_Position_Total",
      "Resolution",
      "Sampled_Height",
      "Sampled_Width",
      "SamplingCount",
      "Season_Position",
      "Season_Position_Total",
      "Source_FrameCount",
      "Source_SamplingCount",
      "Source_StreamSize_Encoded",
      "Source_StreamSize",
      "Status",
      "Stored_Height",
      "Stored_Width",
      "StreamCount",
      "StreamKindID",
      "StreamKindPos",
      "StreamSize_Demuxed",
      "StreamSize_Encoded",
      "StreamSize",
      "TextCount",
      "Track_Position",
      "Track_Position_Total",
      "Video0_Delay",
      "VideoCount",
      "Width_CleanAperture",
      "Width",
      "Width_Offset",
      "Width_Original",
    ],
    n = [
      "Active_DisplayAspectRatio",
      "BitRate_Encoded",
      "BitRate_Maximum",
      "BitRate_Minimum",
      "BitRate",
      "BitRate_Nominal",
      "Bits-Pixel_Frame",
      "BitsPixel_Frame",
      "Compression_Ratio",
      "Delay",
      "Delay_Original",
      "DisplayAspectRatio_CleanAperture",
      "DisplayAspectRatio",
      "DisplayAspectRatio_Original",
      "Duration_End_Command",
      "Duration_End",
      "Duration_FirstFrame",
      "Duration_LastFrame",
      "Duration",
      "Duration_Start2End",
      "Duration_Start_Command",
      "Duration_Start",
      "Events_MinDuration",
      "FrameRate_Maximum",
      "FrameRate_Minimum",
      "FrameRate",
      "FrameRate_Nominal",
      "FrameRate_Original_Den",
      "FrameRate_Original",
      "FrameRate_Original_Num",
      "FrameRate_Real",
      "Interleave_Duration",
      "Interleave_Preload",
      "Interleave_VideoFrames",
      "OverallBitRate_Maximum",
      "OverallBitRate_Minimum",
      "OverallBitRate",
      "OverallBitRate_Nominal",
      "PixelAspectRatio_CleanAperture",
      "PixelAspectRatio",
      "PixelAspectRatio_Original",
      "SamplesPerFrame",
      "SamplingRate",
      "Source_Duration_FirstFrame",
      "Source_Duration_LastFrame",
      "Source_Duration",
      "TimeStamp_FirstFrame",
      "Video_Delay",
    ],
    a = 2 ** 32,
    i = { coverData: !1, chunkSize: 262144, format: "object", full: !1 };
  var o,
    s = class {
      constructor(e, t) {
        (this.mediainfoModule = e),
          (this.options = t),
          (this.mediainfoModuleInstance = new e.MediaInfo(
            "object" === t.format ? "JSON" : t.format,
            t.coverData,
            t.full
          ));
      }
      analyzeData(e, r, n) {
        if (void 0 === n)
          return new Promise((n, a) => {
            this.analyzeData(e, r, (e, r) => {
              r || !e ? a(t(r)) : n(e);
            });
          });
        const a = () => {
          this.openBufferFinalize();
          const e = this.inform();
          "object" === this.options.format ? n(this.parseResultJson(e)) : n(e);
        };
        let i = 0;
        const o = (e) => {
            const o = (e) => {
                u(e) ? s() : a();
              },
              s = () => {
                let a;
                try {
                  const t = Math.min(this.options.chunkSize, e - i);
                  a = r(t, i);
                } catch (e) {
                  return void n("", t(e));
                }
                a instanceof Promise
                  ? a.then(o).catch((e) => {
                      n("", t(e));
                    })
                  : o(a);
              },
              u = (t) => {
                if (0 === t.length || this.openBufferContinue(t, t.length))
                  return !1;
                const r = this.openBufferContinueGotoGet();
                return (
                  -1 === r
                    ? (i += t.length)
                    : ((i = r), this.openBufferInit(e, r)),
                  !0
                );
              };
            this.openBufferInit(e, i), s();
          },
          s = e instanceof Function ? e() : e;
        s instanceof Promise
          ? s.then(o).catch((e) => {
              n(null, t(e));
            })
          : o(s);
      }
      close() {
        "function" == typeof this.mediainfoModuleInstance.close &&
          this.mediainfoModuleInstance.close(),
          "function" == typeof this.mediainfoModule.destroy &&
            this.mediainfoModule.destroy(this.mediainfoModuleInstance);
      }
      inform() {
        return this.mediainfoModuleInstance.inform();
      }
      openBufferContinue(e, t) {
        return !!(8 & this.mediainfoModuleInstance.open_buffer_continue(e, t));
      }
      openBufferContinueGotoGet() {
        let e = -1;
        const t =
            this.mediainfoModuleInstance.open_buffer_continue_goto_get_lower(),
          r =
            this.mediainfoModuleInstance.open_buffer_continue_goto_get_upper();
        return (
          (e = -1 == t && -1 == r ? -1 : t < 0 ? t + a + r * a : t + r * a), e
        );
      }
      openBufferFinalize() {
        this.mediainfoModuleInstance.open_buffer_finalize();
      }
      openBufferInit(e, t) {
        this.mediainfoModuleInstance.open_buffer_init(e, t);
      }
      parseResultJson(e) {
        const t = r,
          a = n,
          i = JSON.parse(e);
        if (i.media) {
          const e = { ...i.media, track: [] };
          if (Array.isArray(i.media.track))
            for (const r of i.media.track) {
              let n = { "@type": r["@type"] };
              for (const [e, i] of Object.entries(r))
                "@type" !== e &&
                  (n =
                    "string" == typeof i && t.includes(e)
                      ? { ...n, [e]: Number.parseInt(i, 10) }
                      : "string" == typeof i && a.includes(e)
                      ? { ...n, [e]: Number.parseFloat(i) }
                      : { ...n, [e]: i });
              e.track.push(n);
            }
          return { ...i, media: e };
        }
        return i;
      }
    },
    u =
      ((o =
        "undefined" != typeof document ? document.currentScript?.src : void 0),
      function (e = {}) {
        var t,
          r,
          n = Object.assign({}, e),
          a = new Promise((e, n) => {
            (t = e), (r = n);
          }),
          i = Object.assign({}, n),
          s = "";
        "undefined" != typeof document &&
          document.currentScript &&
          (s = document.currentScript.src),
          o && (s = o),
          (s = s.startsWith("blob:")
            ? ""
            : s.substr(0, s.replace(/[?#].*/, "").lastIndexOf("/") + 1)),
          console.log.bind(console);
        var u,
          l,
          c = console.error.bind(console);
        Object.assign(n, i), (i = null);
        var d,
          f,
          h,
          m,
          p,
          y,
          g,
          v,
          _ = !1;
        function $() {
          var e = l.buffer;
          (n.HEAP8 = d = new Int8Array(e)),
            (n.HEAP16 = h = new Int16Array(e)),
            (n.HEAPU8 = f = new Uint8Array(e)),
            (n.HEAPU16 = m = new Uint16Array(e)),
            (n.HEAP32 = p = new Int32Array(e)),
            (n.HEAPU32 = y = new Uint32Array(e)),
            (n.HEAPF32 = g = new Float32Array(e)),
            (n.HEAPF64 = v = new Float64Array(e));
        }
        var C = [],
          b = [],
          w = [],
          P = 0,
          T = null;
        function S(e) {
          c((e = "Aborted(" + e + ")")),
            (_ = !0),
            (e += ". Build with -sASSERTIONS for more info.");
          var t = new WebAssembly.RuntimeError(e);
          throw (r(t), t);
        }
        var F,
          A = (e) => e.startsWith("data:application/octet-stream;base64,");
        function D() {
          var e,
            t = "MediaInfoModule.wasm";
          return A(t)
            ? t
            : ((e = t), n.locateFile ? n.locateFile(e, s) : s + e);
        }
        function O(e) {
          if (e == F && u) return new Uint8Array(u);
          throw "both async and sync fetching of the wasm failed";
        }
        function j(e, t, r) {
          return (function (e) {
            return "function" == typeof fetch
              ? fetch(e, { credentials: "same-origin" })
                  .then((t) => {
                    if (!t.ok)
                      throw `failed to load wasm binary file at '${e}'`;
                    return t.arrayBuffer();
                  })
                  .catch(() => O(e))
              : Promise.resolve().then(() => O(e));
          })(e)
            .then((e) => WebAssembly.instantiate(e, t))
            .then(r, (e) => {
              c(`failed to asynchronously prepare wasm: ${e}`), S(e);
            });
        }
        var M,
          E,
          R,
          W = (e) => {
            for (; e.length > 0; ) e.shift()(n);
          },
          k = (e) => {
            for (var t = "", r = e; f[r]; ) t += M[f[r++]];
            return t;
          },
          I = {},
          B = {},
          x = {},
          U = (e) => {
            throw new E(e);
          },
          H = (e) => {
            throw new R(e);
          },
          z = (e, t, r) => {
            function n(t) {
              var n = r(t);
              n.length !== e.length && H("Mismatched type converter count");
              for (var a = 0; a < e.length; ++a) Y(e[a], n[a]);
            }
            e.forEach(function (e) {
              x[e] = t;
            });
            var a = new Array(t.length),
              i = [],
              o = 0;
            t.forEach((e, t) => {
              B.hasOwnProperty(e)
                ? (a[t] = B[e])
                : (i.push(e),
                  I.hasOwnProperty(e) || (I[e] = []),
                  I[e].push(() => {
                    (a[t] = B[e]), ++o === i.length && n(a);
                  }));
            }),
              0 === i.length && n(a);
          };
        function Y(e, t, r = {}) {
          if (!("argPackAdvance" in t))
            throw new TypeError(
              "registerType registeredInstance requires argPackAdvance"
            );
          return (function (e, t, r = {}) {
            var n = t.name;
            if (
              (e ||
                U(`type "${n}" must have a positive integer typeid pointer`),
              B.hasOwnProperty(e))
            ) {
              if (r.ignoreDuplicateRegistrations) return;
              U(`Cannot register type '${n}' twice`);
            }
            if (((B[e] = t), delete x[e], I.hasOwnProperty(e))) {
              var a = I[e];
              delete I[e], a.forEach((e) => e());
            }
          })(e, t, r);
        }
        var N,
          V = (e) => {
            U(e.$$.ptrType.registeredClass.name + " instance already deleted");
          },
          G = !1,
          L = (e) => {},
          J = (e) => {
            (e.count.value -= 1),
              0 === e.count.value &&
                ((e) => {
                  e.smartPtr
                    ? e.smartPtrType.rawDestructor(e.smartPtr)
                    : e.ptrType.registeredClass.rawDestructor(e.ptr);
                })(e);
          },
          Z = (e, t, r) => {
            if (t === r) return e;
            if (void 0 === r.baseClass) return null;
            var n = Z(e, t, r.baseClass);
            return null === n ? null : r.downcast(n);
          },
          q = {},
          K = () => Object.keys(re).length,
          X = () => {
            var e = [];
            for (var t in re) re.hasOwnProperty(t) && e.push(re[t]);
            return e;
          },
          Q = [],
          ee = () => {
            for (; Q.length; ) {
              var e = Q.pop();
              (e.$$.deleteScheduled = !1), e.delete();
            }
          },
          te = (e) => {
            (N = e), Q.length && N && N(ee);
          },
          re = {},
          ne = (e, t) => (
            (t = ((e, t) => {
              for (
                void 0 === t && U("ptr should not be undefined");
                e.baseClass;

              )
                (t = e.upcast(t)), (e = e.baseClass);
              return t;
            })(e, t)),
            re[t]
          ),
          ae = (e, t) => (
            (t.ptrType && t.ptr) ||
              H("makeClassHandle requires ptr and ptrType"),
            !!t.smartPtrType != !!t.smartPtr &&
              H("Both smartPtrType and smartPtr must be specified"),
            (t.count = { value: 1 }),
            oe(Object.create(e, { $$: { value: t, writable: !0 } }))
          );
        function ie(e) {
          var t = this.getPointee(e);
          if (!t) return this.destructor(e), null;
          var r = ne(this.registeredClass, t);
          if (void 0 !== r) {
            if (0 === r.$$.count.value)
              return (r.$$.ptr = t), (r.$$.smartPtr = e), r.clone();
            var n = r.clone();
            return this.destructor(e), n;
          }
          function a() {
            return this.isSmartPointer
              ? ae(this.registeredClass.instancePrototype, {
                  ptrType: this.pointeeType,
                  ptr: t,
                  smartPtrType: this,
                  smartPtr: e,
                })
              : ae(this.registeredClass.instancePrototype, {
                  ptrType: this,
                  ptr: e,
                });
          }
          var i,
            o = this.registeredClass.getActualType(t),
            s = q[o];
          if (!s) return a.call(this);
          i = this.isConst ? s.constPointerType : s.pointerType;
          var u = Z(t, this.registeredClass, i.registeredClass);
          return null === u
            ? a.call(this)
            : this.isSmartPointer
            ? ae(i.registeredClass.instancePrototype, {
                ptrType: i,
                ptr: u,
                smartPtrType: this,
                smartPtr: e,
              })
            : ae(i.registeredClass.instancePrototype, { ptrType: i, ptr: u });
        }
        var oe = (e) =>
          "undefined" == typeof FinalizationRegistry
            ? ((oe = (e) => e), e)
            : ((G = new FinalizationRegistry((e) => {
                J(e.$$);
              })),
              (oe = (e) => {
                var t = e.$$;
                if (t.smartPtr) {
                  var r = { $$: t };
                  G.register(e, r, e);
                }
                return e;
              }),
              (L = (e) => G.unregister(e)),
              oe(e));
        function se() {}
        var ue = (e, t) => Object.defineProperty(t, "name", { value: e }),
          le = (e, t, r) => {
            if (void 0 === e[t].overloadTable) {
              var n = e[t];
              (e[t] = function (...n) {
                return (
                  e[t].overloadTable.hasOwnProperty(n.length) ||
                    U(
                      `Function '${r}' called with an invalid number of arguments (${n.length}) - expects one of (${e[t].overloadTable})!`
                    ),
                  e[t].overloadTable[n.length].apply(this, n)
                );
              }),
                (e[t].overloadTable = []),
                (e[t].overloadTable[n.argCount] = n);
            }
          };
        function ce(e, t, r, n, a, i, o, s) {
          (this.name = e),
            (this.constructor = t),
            (this.instancePrototype = r),
            (this.rawDestructor = n),
            (this.baseClass = a),
            (this.getActualType = i),
            (this.upcast = o),
            (this.downcast = s),
            (this.pureVirtualFunctions = []);
        }
        var de = (e, t, r) => {
          for (; t !== r; )
            t.upcast ||
              U(
                `Expected null or instance of ${r.name}, got an instance of ${t.name}`
              ),
              (e = t.upcast(e)),
              (t = t.baseClass);
          return e;
        };
        function fe(e, t) {
          if (null === t)
            return this.isReference && U(`null is not a valid ${this.name}`), 0;
          t.$$ || U(`Cannot pass "${Ie(t)}" as a ${this.name}`),
            t.$$.ptr ||
              U(`Cannot pass deleted object as a pointer of type ${this.name}`);
          var r = t.$$.ptrType.registeredClass;
          return de(t.$$.ptr, r, this.registeredClass);
        }
        function he(e, t) {
          var r;
          if (null === t)
            return (
              this.isReference && U(`null is not a valid ${this.name}`),
              this.isSmartPointer
                ? ((r = this.rawConstructor()),
                  null !== e && e.push(this.rawDestructor, r),
                  r)
                : 0
            );
          (t && t.$$) || U(`Cannot pass "${Ie(t)}" as a ${this.name}`),
            t.$$.ptr ||
              U(`Cannot pass deleted object as a pointer of type ${this.name}`),
            !this.isConst &&
              t.$$.ptrType.isConst &&
              U(
                `Cannot convert argument of type ${
                  t.$$.smartPtrType ? t.$$.smartPtrType.name : t.$$.ptrType.name
                } to parameter type ${this.name}`
              );
          var n = t.$$.ptrType.registeredClass;
          if (
            ((r = de(t.$$.ptr, n, this.registeredClass)), this.isSmartPointer)
          )
            switch (
              (void 0 === t.$$.smartPtr &&
                U("Passing raw pointer to smart pointer is illegal"),
              this.sharingPolicy)
            ) {
              case 0:
                t.$$.smartPtrType === this
                  ? (r = t.$$.smartPtr)
                  : U(
                      `Cannot convert argument of type ${
                        t.$$.smartPtrType
                          ? t.$$.smartPtrType.name
                          : t.$$.ptrType.name
                      } to parameter type ${this.name}`
                    );
                break;
              case 1:
                r = t.$$.smartPtr;
                break;
              case 2:
                if (t.$$.smartPtrType === this) r = t.$$.smartPtr;
                else {
                  var a = t.clone();
                  (r = this.rawShare(
                    r,
                    We.toHandle(() => a.delete())
                  )),
                    null !== e && e.push(this.rawDestructor, r);
                }
                break;
              default:
                U("Unsupporting sharing policy");
            }
          return r;
        }
        function me(e, t) {
          if (null === t)
            return this.isReference && U(`null is not a valid ${this.name}`), 0;
          t.$$ || U(`Cannot pass "${Ie(t)}" as a ${this.name}`),
            t.$$.ptr ||
              U(`Cannot pass deleted object as a pointer of type ${this.name}`),
            t.$$.ptrType.isConst &&
              U(
                `Cannot convert argument of type ${t.$$.ptrType.name} to parameter type ${this.name}`
              );
          var r = t.$$.ptrType.registeredClass;
          return de(t.$$.ptr, r, this.registeredClass);
        }
        function pe(e) {
          return this.fromWireType(y[e >> 2]);
        }
        function ye(e, t, r, n, a, i, o, s, u, l, c) {
          (this.name = e),
            (this.registeredClass = t),
            (this.isReference = r),
            (this.isConst = n),
            (this.isSmartPointer = a),
            (this.pointeeType = i),
            (this.sharingPolicy = o),
            (this.rawGetPointee = s),
            (this.rawConstructor = u),
            (this.rawShare = l),
            (this.rawDestructor = c),
            a || void 0 !== t.baseClass
              ? (this.toWireType = he)
              : n
              ? ((this.toWireType = fe), (this.destructorFunction = null))
              : ((this.toWireType = me), (this.destructorFunction = null));
        }
        var ge,
          ve,
          _e = [],
          $e = (e) => {
            var t = _e[e];
            return (
              t ||
                (e >= _e.length && (_e.length = e + 1),
                (_e[e] = t = ge.get(e))),
              t
            );
          },
          Ce = (e, t, r = []) =>
            e.includes("j")
              ? ((e, t, r) => (
                  (e = e.replace(/p/g, "i")), (0, n["dynCall_" + e])(t, ...r)
                ))(e, t, r)
              : $e(t)(...r),
          be = (e, t) => {
            var r,
              n,
              a = (e = k(e)).includes("j")
                ? ((r = e), (n = t), (...e) => Ce(r, n, e))
                : $e(t);
            return (
              "function" != typeof a &&
                U(`unknown function pointer with signature ${e}: ${t}`),
              a
            );
          },
          we = (e) => {
            var t = ut(e),
              r = k(t);
            return ct(t), r;
          },
          Pe = (e, t) => {
            var r = [],
              n = {};
            throw (
              (t.forEach(function e(t) {
                n[t] ||
                  B[t] ||
                  (x[t] ? x[t].forEach(e) : (r.push(t), (n[t] = !0)));
              }),
              new ve(`${e}: ` + r.map(we).join([", "])))
            );
          },
          Te = (e, t) => {
            for (var r = [], n = 0; n < e; n++) r.push(y[(t + 4 * n) >> 2]);
            return r;
          },
          Se = (e) => {
            for (; e.length; ) {
              var t = e.pop();
              e.pop()(t);
            }
          };
        function Fe(e) {
          for (var t = 1; t < e.length; ++t)
            if (null !== e[t] && void 0 === e[t].destructorFunction) return !0;
          return !1;
        }
        function Ae(e, t, r, n, a, i) {
          var o = t.length;
          o < 2 &&
            U(
              "argTypes array size mismatch! Must at least get return value and 'this' types!"
            );
          for (
            var s = null !== t[1] && null !== r,
              u = Fe(t),
              l = "void" !== t[0].name,
              c = [e, U, n, a, Se, t[0], t[1]],
              d = 0;
            d < o - 2;
            ++d
          )
            c.push(t[d + 2]);
          if (!u)
            for (d = s ? 1 : 2; d < t.length; ++d)
              null !== t[d].destructorFunction &&
                c.push(t[d].destructorFunction);
          let [f, h] = (function (e, t, r, n) {
            for (
              var a = Fe(e), i = e.length, o = "", s = "", u = 0;
              u < i - 2;
              ++u
            )
              (o += (0 !== u ? ", " : "") + "arg" + u),
                (s += (0 !== u ? ", " : "") + "arg" + u + "Wired");
            var l = `\n        return function (${o}) {\n        if (arguments.length !== ${
              i - 2
            }) {\n          throwBindingError('function ' + humanName + ' called with ' + arguments.length + ' arguments, expected ${
              i - 2
            }');\n        }`;
            a && (l += "var destructors = [];\n");
            var c = a ? "destructors" : "null",
              d = [
                "humanName",
                "throwBindingError",
                "invoker",
                "fn",
                "runDestructors",
                "retType",
                "classParam",
              ];
            for (
              t &&
                (l +=
                  "var thisWired = classParam['toWireType'](" +
                  c +
                  ", this);\n"),
                u = 0;
              u < i - 2;
              ++u
            )
              (l +=
                "var arg" +
                u +
                "Wired = argType" +
                u +
                "['toWireType'](" +
                c +
                ", arg" +
                u +
                ");\n"),
                d.push("argType" + u);
            if (
              (t && (s = "thisWired" + (s.length > 0 ? ", " : "") + s),
              (l +=
                (r || n ? "var rv = " : "") +
                "invoker(fn" +
                (s.length > 0 ? ", " : "") +
                s +
                ");\n"),
              a)
            )
              l += "runDestructors(destructors);\n";
            else
              for (u = t ? 1 : 2; u < e.length; ++u) {
                var f = 1 === u ? "thisWired" : "arg" + (u - 2) + "Wired";
                null !== e[u].destructorFunction &&
                  ((l += `${f}_dtor(${f});\n`), d.push(`${f}_dtor`));
              }
            return (
              r &&
                (l += "var ret = retType['fromWireType'](rv);\nreturn ret;\n"),
              [d, (l += "}\n")]
            );
          })(t, s, l, i);
          f.push(h);
          var m = (function (e, t) {
            if (!(e instanceof Function))
              throw new TypeError(
                `new_ called with constructor type ${typeof e} which is not a function`
              );
            var r = ue(e.name || "unknownFunctionName", function () {});
            r.prototype = e.prototype;
            var n = new r(),
              a = e.apply(n, t);
            return a instanceof Object ? a : n;
          })(
            Function,
            f
          )(...c);
          return ue(e, m);
        }
        var De,
          Oe,
          je,
          Me = [],
          Ee = [],
          Re = () => Ee.length / 2 - 5 - Me.length,
          We = {
            toValue: (e) => (
              e || U("Cannot use deleted val. handle = " + e), Ee[e]
            ),
            toHandle: (e) => {
              switch (e) {
                case void 0:
                  return 2;
                case null:
                  return 4;
                case !0:
                  return 6;
                case !1:
                  return 8;
                default: {
                  const t = Me.pop() || Ee.length;
                  return (Ee[t] = e), (Ee[t + 1] = 1), t;
                }
              }
            },
          },
          ke = {
            name: "emscripten::val",
            fromWireType: (e) => {
              var t = We.toValue(e);
              return (
                ((e) => {
                  e > 9 && 0 == --Ee[e + 1] && ((Ee[e] = void 0), Me.push(e));
                })(e),
                t
              );
            },
            toWireType: (e, t) => We.toHandle(t),
            argPackAdvance: 8,
            readValueFromPointer: pe,
            destructorFunction: null,
          },
          Ie = (e) => {
            if (null === e) return "null";
            var t = typeof e;
            return "object" === t || "array" === t || "function" === t
              ? e.toString()
              : "" + e;
          },
          Be = (e, t) => {
            switch (t) {
              case 4:
                return function (e) {
                  return this.fromWireType(g[e >> 2]);
                };
              case 8:
                return function (e) {
                  return this.fromWireType(v[e >> 3]);
                };
              default:
                throw new TypeError(`invalid float width (${t}): ${e}`);
            }
          },
          xe = (e, t, r) => {
            switch (t) {
              case 1:
                return r ? (e) => d[e] : (e) => f[e];
              case 2:
                return r ? (e) => h[e >> 1] : (e) => m[e >> 1];
              case 4:
                return r ? (e) => p[e >> 2] : (e) => y[e >> 2];
              default:
                throw new TypeError(`invalid integer width (${t}): ${e}`);
            }
          },
          Ue = (e, t, r, n) => {
            if (!(n > 0)) return 0;
            for (var a = r, i = r + n - 1, o = 0; o < e.length; ++o) {
              var s = e.charCodeAt(o);
              if (
                (s >= 55296 &&
                  s <= 57343 &&
                  (s =
                    (65536 + ((1023 & s) << 10)) | (1023 & e.charCodeAt(++o))),
                s <= 127)
              ) {
                if (r >= i) break;
                t[r++] = s;
              } else if (s <= 2047) {
                if (r + 1 >= i) break;
                (t[r++] = 192 | (s >> 6)), (t[r++] = 128 | (63 & s));
              } else if (s <= 65535) {
                if (r + 2 >= i) break;
                (t[r++] = 224 | (s >> 12)),
                  (t[r++] = 128 | ((s >> 6) & 63)),
                  (t[r++] = 128 | (63 & s));
              } else {
                if (r + 3 >= i) break;
                (t[r++] = 240 | (s >> 18)),
                  (t[r++] = 128 | ((s >> 12) & 63)),
                  (t[r++] = 128 | ((s >> 6) & 63)),
                  (t[r++] = 128 | (63 & s));
              }
            }
            return (t[r] = 0), r - a;
          },
          He = (e, t, r) => Ue(e, f, t, r),
          ze = (e) => {
            for (var t = 0, r = 0; r < e.length; ++r) {
              var n = e.charCodeAt(r);
              n <= 127
                ? t++
                : n <= 2047
                ? (t += 2)
                : n >= 55296 && n <= 57343
                ? ((t += 4), ++r)
                : (t += 3);
            }
            return t;
          },
          Ye =
            "undefined" != typeof TextDecoder
              ? new TextDecoder("utf8")
              : void 0,
          Ne = (e, t) =>
            e
              ? ((e, t, r) => {
                  for (var n = t + r, a = t; e[a] && !(a >= n); ) ++a;
                  if (a - t > 16 && e.buffer && Ye)
                    return Ye.decode(e.subarray(t, a));
                  for (var i = ""; t < a; ) {
                    var o = e[t++];
                    if (128 & o) {
                      var s = 63 & e[t++];
                      if (192 != (224 & o)) {
                        var u = 63 & e[t++];
                        if (
                          (o =
                            224 == (240 & o)
                              ? ((15 & o) << 12) | (s << 6) | u
                              : ((7 & o) << 18) |
                                (s << 12) |
                                (u << 6) |
                                (63 & e[t++])) < 65536
                        )
                          i += String.fromCharCode(o);
                        else {
                          var l = o - 65536;
                          i += String.fromCharCode(
                            55296 | (l >> 10),
                            56320 | (1023 & l)
                          );
                        }
                      } else i += String.fromCharCode(((31 & o) << 6) | s);
                    } else i += String.fromCharCode(o);
                  }
                  return i;
                })(f, e, t)
              : "",
          Ve =
            "undefined" != typeof TextDecoder
              ? new TextDecoder("utf-16le")
              : void 0,
          Ge = (e, t) => {
            for (var r = e, n = r >> 1, a = n + t / 2; !(n >= a) && m[n]; ) ++n;
            if ((r = n << 1) - e > 32 && Ve) return Ve.decode(f.subarray(e, r));
            for (var i = "", o = 0; !(o >= t / 2); ++o) {
              var s = h[(e + 2 * o) >> 1];
              if (0 == s) break;
              i += String.fromCharCode(s);
            }
            return i;
          },
          Le = (e, t, r) => {
            if (((r ??= 2147483647), r < 2)) return 0;
            for (
              var n = t, a = (r -= 2) < 2 * e.length ? r / 2 : e.length, i = 0;
              i < a;
              ++i
            ) {
              var o = e.charCodeAt(i);
              (h[t >> 1] = o), (t += 2);
            }
            return (h[t >> 1] = 0), t - n;
          },
          Je = (e) => 2 * e.length,
          Ze = (e, t) => {
            for (var r = 0, n = ""; !(r >= t / 4); ) {
              var a = p[(e + 4 * r) >> 2];
              if (0 == a) break;
              if ((++r, a >= 65536)) {
                var i = a - 65536;
                n += String.fromCharCode(55296 | (i >> 10), 56320 | (1023 & i));
              } else n += String.fromCharCode(a);
            }
            return n;
          },
          qe = (e, t, r) => {
            if (((r ??= 2147483647), r < 4)) return 0;
            for (var n = t, a = n + r - 4, i = 0; i < e.length; ++i) {
              var o = e.charCodeAt(i);
              if (
                (o >= 55296 &&
                  o <= 57343 &&
                  (o =
                    (65536 + ((1023 & o) << 10)) | (1023 & e.charCodeAt(++i))),
                (p[t >> 2] = o),
                (t += 4) + 4 > a)
              )
                break;
            }
            return (p[t >> 2] = 0), t - n;
          },
          Ke = (e) => {
            for (var t = 0, r = 0; r < e.length; ++r) {
              var n = e.charCodeAt(r);
              n >= 55296 && n <= 57343 && ++r, (t += 4);
            }
            return t;
          },
          Xe = (e) => {
            var t = (e - l.buffer.byteLength + 65535) / 65536;
            try {
              return l.grow(t), $(), 1;
            } catch (e) {}
          },
          Qe = {},
          et = () => {
            if (!et.strings) {
              var e = {
                USER: "web_user",
                LOGNAME: "web_user",
                PATH: "/",
                PWD: "/",
                HOME: "/home/web_user",
                LANG:
                  (
                    ("object" == typeof navigator &&
                      navigator.languages &&
                      navigator.languages[0]) ||
                    "C"
                  ).replace("-", "_") + ".UTF-8",
                _: "./this.program",
              };
              for (var t in Qe) void 0 === Qe[t] ? delete e[t] : (e[t] = Qe[t]);
              var r = [];
              for (var t in e) r.push(`${t}=${e[t]}`);
              et.strings = r;
            }
            return et.strings;
          },
          tt = (e) => e % 4 == 0 && (e % 100 != 0 || e % 400 == 0),
          rt = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
          nt = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
          at = (e, t, r, n) => {
            var a = y[(n + 40) >> 2],
              i = {
                tm_sec: p[n >> 2],
                tm_min: p[(n + 4) >> 2],
                tm_hour: p[(n + 8) >> 2],
                tm_mday: p[(n + 12) >> 2],
                tm_mon: p[(n + 16) >> 2],
                tm_year: p[(n + 20) >> 2],
                tm_wday: p[(n + 24) >> 2],
                tm_yday: p[(n + 28) >> 2],
                tm_isdst: p[(n + 32) >> 2],
                tm_gmtoff: p[(n + 36) >> 2],
                tm_zone: a ? Ne(a) : "",
              },
              o = Ne(r),
              s = {
                "%c": "%a %b %d %H:%M:%S %Y",
                "%D": "%m/%d/%y",
                "%F": "%Y-%m-%d",
                "%h": "%b",
                "%r": "%I:%M:%S %p",
                "%R": "%H:%M",
                "%T": "%H:%M:%S",
                "%x": "%m/%d/%y",
                "%X": "%H:%M:%S",
                "%Ec": "%c",
                "%EC": "%C",
                "%Ex": "%m/%d/%y",
                "%EX": "%H:%M:%S",
                "%Ey": "%y",
                "%EY": "%Y",
                "%Od": "%d",
                "%Oe": "%e",
                "%OH": "%H",
                "%OI": "%I",
                "%Om": "%m",
                "%OM": "%M",
                "%OS": "%S",
                "%Ou": "%u",
                "%OU": "%U",
                "%OV": "%V",
                "%Ow": "%w",
                "%OW": "%W",
                "%Oy": "%y",
              };
            for (var u in s) o = o.replace(new RegExp(u, "g"), s[u]);
            var l = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ],
              c = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ];
            function f(e, t, r) {
              for (
                var n = "number" == typeof e ? e.toString() : e || "";
                n.length < t;

              )
                n = r[0] + n;
              return n;
            }
            function h(e, t) {
              return f(e, t, "0");
            }
            function m(e, t) {
              function r(e) {
                return e < 0 ? -1 : e > 0 ? 1 : 0;
              }
              var n;
              return (
                0 === (n = r(e.getFullYear() - t.getFullYear())) &&
                  0 === (n = r(e.getMonth() - t.getMonth())) &&
                  (n = r(e.getDate() - t.getDate())),
                n
              );
            }
            function g(e) {
              switch (e.getDay()) {
                case 0:
                  return new Date(e.getFullYear() - 1, 11, 29);
                case 1:
                  return e;
                case 2:
                  return new Date(e.getFullYear(), 0, 3);
                case 3:
                  return new Date(e.getFullYear(), 0, 2);
                case 4:
                  return new Date(e.getFullYear(), 0, 1);
                case 5:
                  return new Date(e.getFullYear() - 1, 11, 31);
                case 6:
                  return new Date(e.getFullYear() - 1, 11, 30);
              }
            }
            function v(e) {
              var t = ((e, t) => {
                  for (var r = new Date(e.getTime()); t > 0; ) {
                    var n = tt(r.getFullYear()),
                      a = r.getMonth(),
                      i = (n ? rt : nt)[a];
                    if (!(t > i - r.getDate()))
                      return r.setDate(r.getDate() + t), r;
                    (t -= i - r.getDate() + 1),
                      r.setDate(1),
                      a < 11
                        ? r.setMonth(a + 1)
                        : (r.setMonth(0), r.setFullYear(r.getFullYear() + 1));
                  }
                  return r;
                })(new Date(e.tm_year + 1900, 0, 1), e.tm_yday),
                r = new Date(t.getFullYear(), 0, 4),
                n = new Date(t.getFullYear() + 1, 0, 4),
                a = g(r),
                i = g(n);
              return m(a, t) <= 0
                ? m(i, t) <= 0
                  ? t.getFullYear() + 1
                  : t.getFullYear()
                : t.getFullYear() - 1;
            }
            var _ = {
              "%a": (e) => l[e.tm_wday].substring(0, 3),
              "%A": (e) => l[e.tm_wday],
              "%b": (e) => c[e.tm_mon].substring(0, 3),
              "%B": (e) => c[e.tm_mon],
              "%C": (e) => h(((e.tm_year + 1900) / 100) | 0, 2),
              "%d": (e) => h(e.tm_mday, 2),
              "%e": (e) => f(e.tm_mday, 2, " "),
              "%g": (e) => v(e).toString().substring(2),
              "%G": v,
              "%H": (e) => h(e.tm_hour, 2),
              "%I": (e) => {
                var t = e.tm_hour;
                return 0 == t ? (t = 12) : t > 12 && (t -= 12), h(t, 2);
              },
              "%j": (e) =>
                h(
                  e.tm_mday +
                    ((e, t) => {
                      for (var r = 0, n = 0; n <= t; r += e[n++]);
                      return r;
                    })(tt(e.tm_year + 1900) ? rt : nt, e.tm_mon - 1),
                  3
                ),
              "%m": (e) => h(e.tm_mon + 1, 2),
              "%M": (e) => h(e.tm_min, 2),
              "%n": () => "\n",
              "%p": (e) => (e.tm_hour >= 0 && e.tm_hour < 12 ? "AM" : "PM"),
              "%S": (e) => h(e.tm_sec, 2),
              "%t": () => "\t",
              "%u": (e) => e.tm_wday || 7,
              "%U": (e) => {
                var t = e.tm_yday + 7 - e.tm_wday;
                return h(Math.floor(t / 7), 2);
              },
              "%V": (e) => {
                var t = Math.floor((e.tm_yday + 7 - ((e.tm_wday + 6) % 7)) / 7);
                if (((e.tm_wday + 371 - e.tm_yday - 2) % 7 <= 2 && t++, t)) {
                  if (53 == t) {
                    var r = (e.tm_wday + 371 - e.tm_yday) % 7;
                    4 == r || (3 == r && tt(e.tm_year)) || (t = 1);
                  }
                } else {
                  t = 52;
                  var n = (e.tm_wday + 7 - e.tm_yday - 1) % 7;
                  (4 == n || (5 == n && tt((e.tm_year % 400) - 1))) && t++;
                }
                return h(t, 2);
              },
              "%w": (e) => e.tm_wday,
              "%W": (e) => {
                var t = e.tm_yday + 7 - ((e.tm_wday + 6) % 7);
                return h(Math.floor(t / 7), 2);
              },
              "%y": (e) => (e.tm_year + 1900).toString().substring(2),
              "%Y": (e) => e.tm_year + 1900,
              "%z": (e) => {
                var t = e.tm_gmtoff,
                  r = t >= 0;
                return (
                  (t = ((t = Math.abs(t) / 60) / 60) * 100 + (t % 60)),
                  (r ? "+" : "-") + String("0000" + t).slice(-4)
                );
              },
              "%Z": (e) => e.tm_zone,
              "%%": () => "%",
            };
            for (var u in ((o = o.replace(/%%/g, "\0\0")), _))
              o.includes(u) && (o = o.replace(new RegExp(u, "g"), _[u](i)));
            o = o.replace(/\0\0/g, "%");
            var $,
              C,
              b,
              w,
              P,
              T =
                ((C = ze(($ = o)) + 1),
                (b = new Array(C)),
                Ue($, b, 0, b.length),
                b);
            return T.length > t
              ? 0
              : ((w = T), (P = e), d.set(w, P), T.length - 1);
          };
        (() => {
          for (var e = new Array(256), t = 0; t < 256; ++t)
            e[t] = String.fromCharCode(t);
          M = e;
        })(),
          (E = n.BindingError =
            class extends Error {
              constructor(e) {
                super(e), (this.name = "BindingError");
              }
            }),
          (R = n.InternalError =
            class extends Error {
              constructor(e) {
                super(e), (this.name = "InternalError");
              }
            }),
          Object.assign(se.prototype, {
            isAliasOf(e) {
              if (!(this instanceof se)) return !1;
              if (!(e instanceof se)) return !1;
              var t = this.$$.ptrType.registeredClass,
                r = this.$$.ptr;
              e.$$ = e.$$;
              for (
                var n = e.$$.ptrType.registeredClass, a = e.$$.ptr;
                t.baseClass;

              )
                (r = t.upcast(r)), (t = t.baseClass);
              for (; n.baseClass; ) (a = n.upcast(a)), (n = n.baseClass);
              return t === n && r === a;
            },
            clone() {
              if ((this.$$.ptr || V(this), this.$$.preservePointerOnDelete))
                return (this.$$.count.value += 1), this;
              var e,
                t = oe(
                  Object.create(Object.getPrototypeOf(this), {
                    $$: {
                      value:
                        ((e = this.$$),
                        {
                          count: e.count,
                          deleteScheduled: e.deleteScheduled,
                          preservePointerOnDelete: e.preservePointerOnDelete,
                          ptr: e.ptr,
                          ptrType: e.ptrType,
                          smartPtr: e.smartPtr,
                          smartPtrType: e.smartPtrType,
                        }),
                    },
                  })
                );
              return (t.$$.count.value += 1), (t.$$.deleteScheduled = !1), t;
            },
            delete() {
              this.$$.ptr || V(this),
                this.$$.deleteScheduled &&
                  !this.$$.preservePointerOnDelete &&
                  U("Object already scheduled for deletion"),
                L(this),
                J(this.$$),
                this.$$.preservePointerOnDelete ||
                  ((this.$$.smartPtr = void 0), (this.$$.ptr = void 0));
            },
            isDeleted() {
              return !this.$$.ptr;
            },
            deleteLater() {
              return (
                this.$$.ptr || V(this),
                this.$$.deleteScheduled &&
                  !this.$$.preservePointerOnDelete &&
                  U("Object already scheduled for deletion"),
                Q.push(this),
                1 === Q.length && N && N(ee),
                (this.$$.deleteScheduled = !0),
                this
              );
            },
          }),
          (n.getInheritedInstanceCount = K),
          (n.getLiveInheritedInstances = X),
          (n.flushPendingDeletes = ee),
          (n.setDelayFunction = te),
          Object.assign(ye.prototype, {
            getPointee(e) {
              return this.rawGetPointee && (e = this.rawGetPointee(e)), e;
            },
            destructor(e) {
              this.rawDestructor?.(e);
            },
            argPackAdvance: 8,
            readValueFromPointer: pe,
            fromWireType: ie,
          }),
          (ve = n.UnboundTypeError =
            ((De = Error),
            ((je = ue((Oe = "UnboundTypeError"), function (e) {
              (this.name = Oe), (this.message = e);
              var t = new Error(e).stack;
              void 0 !== t &&
                (this.stack =
                  this.toString() + "\n" + t.replace(/^Error(:[^\n]*)?\n/, ""));
            })).prototype = Object.create(De.prototype)),
            (je.prototype.constructor = je),
            (je.prototype.toString = function () {
              return void 0 === this.message
                ? this.name
                : `${this.name}: ${this.message}`;
            }),
            je)),
          Ee.push(0, 1, void 0, 1, null, 1, !0, 1, !1, 1),
          (n.count_emval_handles = Re);
        var it,
          ot = {
            _abort_js: () => {
              S("");
            },
            _embind_register_bigint: (e, t, r, n, a) => {},
            _embind_register_bool: (e, t, r, n) => {
              Y(e, {
                name: (t = k(t)),
                fromWireType: function (e) {
                  return !!e;
                },
                toWireType: function (e, t) {
                  return t ? r : n;
                },
                argPackAdvance: 8,
                readValueFromPointer: function (e) {
                  return this.fromWireType(f[e]);
                },
                destructorFunction: null,
              });
            },
            _embind_register_class: (e, t, r, a, i, o, s, u, l, c, d, f, h) => {
              (d = k(d)),
                (o = be(i, o)),
                (u &&= be(s, u)),
                (c &&= be(l, c)),
                (h = be(f, h));
              var m = ((e) => {
                if (void 0 === e) return "_unknown";
                var t = (e = e.replace(/[^a-zA-Z0-9_]/g, "$")).charCodeAt(0);
                return t >= 48 && t <= 57 ? `_${e}` : e;
              })(d);
              ((e, t, r) => {
                n.hasOwnProperty(e)
                  ? (U(`Cannot register public name '${e}' twice`),
                    le(n, e, e),
                    n.hasOwnProperty(r) &&
                      U(
                        `Cannot register multiple overloads of a function with the same number of arguments (${r})!`
                      ),
                    (n[e].overloadTable[r] = t))
                  : (n[e] = t);
              })(m, function () {
                Pe(`Cannot construct ${d} due to unbound types`, [a]);
              }),
                z([e, t, r], a ? [a] : [], (t) => {
                  var r, i;
                  (t = t[0]),
                    (i = a
                      ? (r = t.registeredClass).instancePrototype
                      : se.prototype);
                  var s = ue(d, function (...e) {
                      if (Object.getPrototypeOf(this) !== l)
                        throw new E("Use 'new' to construct " + d);
                      if (void 0 === f.constructor_body)
                        throw new E(d + " has no accessible constructor");
                      var t = f.constructor_body[e.length];
                      if (void 0 === t)
                        throw new E(
                          `Tried to invoke ctor of ${d} with invalid number of parameters (${
                            e.length
                          }) - expected (${Object.keys(
                            f.constructor_body
                          ).toString()}) parameters instead!`
                        );
                      return t.apply(this, e);
                    }),
                    l = Object.create(i, { constructor: { value: s } });
                  s.prototype = l;
                  var f = new ce(d, s, l, h, r, o, u, c);
                  f.baseClass &&
                    ((f.baseClass.__derivedClasses ??= []),
                    f.baseClass.__derivedClasses.push(f));
                  var p = new ye(d, f, !0, !1, !1),
                    y = new ye(d + "*", f, !1, !1, !1),
                    g = new ye(d + " const*", f, !1, !0, !1);
                  return (
                    (q[e] = { pointerType: y, constPointerType: g }),
                    ((e, t, r) => {
                      n.hasOwnProperty(e) ||
                        H("Replacing nonexistent public symbol"),
                        void 0 !== n[e].overloadTable && void 0 !== r
                          ? (n[e].overloadTable[r] = t)
                          : ((n[e] = t), (n[e].argCount = r));
                    })(m, s),
                    [p, y, g]
                  );
                });
            },
            _embind_register_class_constructor: (e, t, r, n, a, i) => {
              var o = Te(t, r);
              (a = be(n, a)),
                z([], [e], (e) => {
                  var r = `constructor ${(e = e[0]).name}`;
                  if (
                    (void 0 === e.registeredClass.constructor_body &&
                      (e.registeredClass.constructor_body = []),
                    void 0 !== e.registeredClass.constructor_body[t - 1])
                  )
                    throw new E(
                      `Cannot register multiple constructors with identical number of parameters (${
                        t - 1
                      }) for class '${
                        e.name
                      }'! Overload resolution is currently only performed using the parameter count, not actual type info!`
                    );
                  return (
                    (e.registeredClass.constructor_body[t - 1] = () => {
                      Pe(`Cannot construct ${e.name} due to unbound types`, o);
                    }),
                    z(
                      [],
                      o,
                      (n) => (
                        n.splice(1, 0, null),
                        (e.registeredClass.constructor_body[t - 1] = Ae(
                          r,
                          n,
                          null,
                          a,
                          i
                        )),
                        []
                      )
                    ),
                    []
                  );
                });
            },
            _embind_register_class_function: (e, t, r, n, a, i, o, s, u) => {
              var l = Te(r, n);
              (t = ((e) => {
                const t = (e = e.trim()).indexOf("(");
                return -1 !== t ? e.substr(0, t) : e;
              })((t = k(t)))),
                (i = be(a, i)),
                z([], [e], (e) => {
                  var n = `${(e = e[0]).name}.${t}`;
                  function a() {
                    Pe(`Cannot call ${n} due to unbound types`, l);
                  }
                  t.startsWith("@@") && (t = Symbol[t.substring(2)]),
                    s && e.registeredClass.pureVirtualFunctions.push(t);
                  var c = e.registeredClass.instancePrototype,
                    d = c[t];
                  return (
                    void 0 === d ||
                    (void 0 === d.overloadTable &&
                      d.className !== e.name &&
                      d.argCount === r - 2)
                      ? ((a.argCount = r - 2),
                        (a.className = e.name),
                        (c[t] = a))
                      : (le(c, t, n), (c[t].overloadTable[r - 2] = a)),
                    z([], l, (a) => {
                      var s = Ae(n, a, e, i, o, u);
                      return (
                        void 0 === c[t].overloadTable
                          ? ((s.argCount = r - 2), (c[t] = s))
                          : (c[t].overloadTable[r - 2] = s),
                        []
                      );
                    }),
                    []
                  );
                });
            },
            _embind_register_emval: (e) => Y(e, ke),
            _embind_register_float: (e, t, r) => {
              Y(e, {
                name: (t = k(t)),
                fromWireType: (e) => e,
                toWireType: (e, t) => t,
                argPackAdvance: 8,
                readValueFromPointer: Be(t, r),
                destructorFunction: null,
              });
            },
            _embind_register_integer: (e, t, r, n, a) => {
              t = k(t);
              var i = (e) => e;
              if (0 === n) {
                var o = 32 - 8 * r;
                i = (e) => (e << o) >>> o;
              }
              var s = t.includes("unsigned");
              Y(e, {
                name: t,
                fromWireType: i,
                toWireType: s
                  ? function (e, t) {
                      return this.name, t >>> 0;
                    }
                  : function (e, t) {
                      return this.name, t;
                    },
                argPackAdvance: 8,
                readValueFromPointer: xe(t, r, 0 !== n),
                destructorFunction: null,
              });
            },
            _embind_register_memory_view: (e, t, r) => {
              var n = [
                Int8Array,
                Uint8Array,
                Int16Array,
                Uint16Array,
                Int32Array,
                Uint32Array,
                Float32Array,
                Float64Array,
              ][t];
              function a(e) {
                var t = y[e >> 2],
                  r = y[(e + 4) >> 2];
                return new n(d.buffer, r, t);
              }
              Y(
                e,
                {
                  name: (r = k(r)),
                  fromWireType: a,
                  argPackAdvance: 8,
                  readValueFromPointer: a,
                },
                { ignoreDuplicateRegistrations: !0 }
              );
            },
            _embind_register_std_string: (e, t) => {
              var r = "std::string" === (t = k(t));
              Y(e, {
                name: t,
                fromWireType(e) {
                  var t,
                    n = y[e >> 2],
                    a = e + 4;
                  if (r)
                    for (var i = a, o = 0; o <= n; ++o) {
                      var s = a + o;
                      if (o == n || 0 == f[s]) {
                        var u = Ne(i, s - i);
                        void 0 === t
                          ? (t = u)
                          : ((t += String.fromCharCode(0)), (t += u)),
                          (i = s + 1);
                      }
                    }
                  else {
                    var l = new Array(n);
                    for (o = 0; o < n; ++o)
                      l[o] = String.fromCharCode(f[a + o]);
                    t = l.join("");
                  }
                  return ct(e), t;
                },
                toWireType(e, t) {
                  var n;
                  t instanceof ArrayBuffer && (t = new Uint8Array(t));
                  var a = "string" == typeof t;
                  a ||
                    t instanceof Uint8Array ||
                    t instanceof Uint8ClampedArray ||
                    t instanceof Int8Array ||
                    U("Cannot pass non-string to std::string"),
                    (n = r && a ? ze(t) : t.length);
                  var i = lt(4 + n + 1),
                    o = i + 4;
                  if (((y[i >> 2] = n), r && a)) He(t, o, n + 1);
                  else if (a)
                    for (var s = 0; s < n; ++s) {
                      var u = t.charCodeAt(s);
                      u > 255 &&
                        (ct(o),
                        U(
                          "String has UTF-16 code units that do not fit in 8 bits"
                        )),
                        (f[o + s] = u);
                    }
                  else for (s = 0; s < n; ++s) f[o + s] = t[s];
                  return null !== e && e.push(ct, i), i;
                },
                argPackAdvance: 8,
                readValueFromPointer: pe,
                destructorFunction(e) {
                  ct(e);
                },
              });
            },
            _embind_register_std_wstring: (e, t, r) => {
              var n, a, i, o;
              (r = k(r)),
                2 === t
                  ? ((n = Ge), (a = Le), (o = Je), (i = (e) => m[e >> 1]))
                  : 4 === t &&
                    ((n = Ze), (a = qe), (o = Ke), (i = (e) => y[e >> 2])),
                Y(e, {
                  name: r,
                  fromWireType: (e) => {
                    for (var r, a = y[e >> 2], o = e + 4, s = 0; s <= a; ++s) {
                      var u = e + 4 + s * t;
                      if (s == a || 0 == i(u)) {
                        var l = n(o, u - o);
                        void 0 === r
                          ? (r = l)
                          : ((r += String.fromCharCode(0)), (r += l)),
                          (o = u + t);
                      }
                    }
                    return ct(e), r;
                  },
                  toWireType: (e, n) => {
                    "string" != typeof n &&
                      U(`Cannot pass non-string to C++ string type ${r}`);
                    var i = o(n),
                      s = lt(4 + i + t);
                    return (
                      (y[s >> 2] = i / t),
                      a(n, s + 4, i + t),
                      null !== e && e.push(ct, s),
                      s
                    );
                  },
                  argPackAdvance: 8,
                  readValueFromPointer: pe,
                  destructorFunction(e) {
                    ct(e);
                  },
                });
            },
            _embind_register_void: (e, t) => {
              Y(e, {
                isVoid: !0,
                name: (t = k(t)),
                argPackAdvance: 0,
                fromWireType: () => {},
                toWireType: (e, t) => {},
              });
            },
            _emscripten_memcpy_js: (e, t, r) => f.copyWithin(e, t, t + r),
            _gmtime_js: function (e, t, r) {
              var n,
                a,
                i =
                  ((a = t) + 2097152) >>> 0 < 4194305 - !!(n = e)
                    ? (n >>> 0) + 4294967296 * a
                    : NaN,
                o = new Date(1e3 * i);
              (p[r >> 2] = o.getUTCSeconds()),
                (p[(r + 4) >> 2] = o.getUTCMinutes()),
                (p[(r + 8) >> 2] = o.getUTCHours()),
                (p[(r + 12) >> 2] = o.getUTCDate()),
                (p[(r + 16) >> 2] = o.getUTCMonth()),
                (p[(r + 20) >> 2] = o.getUTCFullYear() - 1900),
                (p[(r + 24) >> 2] = o.getUTCDay());
              var s = Date.UTC(o.getUTCFullYear(), 0, 1, 0, 0, 0, 0),
                u = ((o.getTime() - s) / 864e5) | 0;
              p[(r + 28) >> 2] = u;
            },
            _tzset_js: (e, t, r, n) => {
              var a = new Date().getFullYear(),
                i = new Date(a, 0, 1),
                o = new Date(a, 6, 1),
                s = i.getTimezoneOffset(),
                u = o.getTimezoneOffset(),
                l = Math.max(s, u);
              (y[e >> 2] = 60 * l), (p[t >> 2] = Number(s != u));
              var c = (e) =>
                  e
                    .toLocaleTimeString(void 0, {
                      hour12: !1,
                      timeZoneName: "short",
                    })
                    .split(" ")[1],
                d = c(i),
                f = c(o);
              u < s
                ? (He(d, r, 17), He(f, n, 17))
                : (He(d, n, 17), He(f, r, 17));
            },
            emscripten_date_now: () => Date.now(),
            emscripten_resize_heap: (e) => {
              var t = f.length,
                r = 2147483648;
              if ((e >>>= 0) > r) return !1;
              for (var n, a, i = 1; i <= 4; i *= 2) {
                var o = t * (1 + 0.2 / i);
                o = Math.min(o, e + 100663296);
                var s = Math.min(
                  r,
                  (n = Math.max(e, o)) + (((a = 65536) - (n % a)) % a)
                );
                if (Xe(s)) return !0;
              }
              return !1;
            },
            environ_get: (e, t) => {
              var r = 0;
              return (
                et().forEach((n, a) => {
                  var i = t + r;
                  (y[(e + 4 * a) >> 2] = i),
                    ((e, t) => {
                      for (var r = 0; r < e.length; ++r)
                        d[t++] = e.charCodeAt(r);
                      d[t] = 0;
                    })(n, i),
                    (r += n.length + 1);
                }),
                0
              );
            },
            environ_sizes_get: (e, t) => {
              var r = et();
              y[e >> 2] = r.length;
              var n = 0;
              return r.forEach((e) => (n += e.length + 1)), (y[t >> 2] = n), 0;
            },
            strftime_l: (e, t, r, n, a) => at(e, t, r, n),
          },
          st = (function () {
            var e,
              t,
              n,
              a = { env: ot, wasi_snapshot_preview1: ot };
            function i(e, t) {
              var r;
              return (
                (st = e.exports),
                (l = st.memory),
                $(),
                (ge = st.__indirect_function_table),
                (r = st.__wasm_call_ctors),
                b.unshift(r),
                (function (e) {
                  if (0 == --P && T) {
                    var t = T;
                    (T = null), t();
                  }
                })(),
                st
              );
            }
            return (
              P++,
              F || (F = D()),
              ((e = F),
              (t = a),
              (n = function (e) {
                i(e.instance);
              }),
              "function" != typeof WebAssembly.instantiateStreaming ||
              A(e) ||
              "function" != typeof fetch
                ? j(e, t, n)
                : fetch(e, { credentials: "same-origin" }).then((r) =>
                    WebAssembly.instantiateStreaming(r, t).then(
                      n,
                      function (r) {
                        return (
                          c(`wasm streaming compile failed: ${r}`),
                          c("falling back to ArrayBuffer instantiation"),
                          j(e, t, n)
                        );
                      }
                    )
                  )).catch(r),
              {}
            );
          })(),
          ut = (e) => (ut = st.__getTypeName)(e),
          lt = (e) => (lt = st.malloc)(e),
          ct = (e) => (ct = st.free)(e);
        function dt() {
          P > 0 ||
            (W(C),
            P > 0 ||
              it ||
              ((it = !0), (n.calledRun = !0), _ || (W(b), t(n), W(w))));
        }
        return (
          (n.dynCall_iiijj = (e, t, r, a, i, o, s) =>
            (n.dynCall_iiijj = st.dynCall_iiijj)(e, t, r, a, i, o, s)),
          (n.dynCall_viijii = (e, t, r, a, i, o, s) =>
            (n.dynCall_viijii = st.dynCall_viijii)(e, t, r, a, i, o, s)),
          (n.dynCall_iiiiij = (e, t, r, a, i, o, s) =>
            (n.dynCall_iiiiij = st.dynCall_iiiiij)(e, t, r, a, i, o, s)),
          (n.dynCall_iiiiijj = (e, t, r, a, i, o, s, u, l) =>
            (n.dynCall_iiiiijj = st.dynCall_iiiiijj)(
              e,
              t,
              r,
              a,
              i,
              o,
              s,
              u,
              l
            )),
          (n.dynCall_iiiiiijj = (e, t, r, a, i, o, s, u, l, c) =>
            (n.dynCall_iiiiiijj = st.dynCall_iiiiiijj)(
              e,
              t,
              r,
              a,
              i,
              o,
              s,
              u,
              l,
              c
            )),
          (T = function e() {
            it || dt(), it || (T = e);
          }),
          dt(),
          a
        );
      });
  const l = () => {};
  function c(e, t) {
    try {
      if ("/" === new URL(t).pathname) return `${t}mediainfo.js/dist/${e}`;
    } catch {}
    return `${t}../${e}`;
  }
  function d() {
    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      t = arguments.length > 1 ? arguments[1] : void 0,
      r = arguments.length > 2 ? arguments[2] : void 0;
    if (void 0 === t)
      return new Promise((t, r) => {
        d(e, t, r);
      });
    const { locateFile: n, ...a } = {
      ...i,
      ...e,
      format: e.format ?? i.format,
    };
    u({
      print: l,
      printErr: l,
      locateFile: n ?? c,
      onAbort: (e) => {
        r && r(e);
      },
    })
      .then((e) => {
        t(new s(e, a));
      })
      .catch((e) => {
        r && r(e);
      });
  }
  (e.default = d),
    (e.isTrackType = function (e, t) {
      return null !== e && "object" == typeof e && e["@type"] === t;
    }),
    (e.mediaInfoFactory = d),
    Object.defineProperty(e, "__esModule", { value: !0 });
});
//# sourceMappingURL=index.min.js.map
