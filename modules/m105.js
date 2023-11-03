// probably contacts helper

import n14_StoreBase from "./m14";
import * as n13 from "./m13";

function u(e, t, n) {
	var i = {};
	e: for (var a = 0, o = t.terms.length; a < o; a++)
		for (var r = t.terms[a], s = 0, u = t.fields.length; s < u; s++) {
			var l = t.fields[s];
			if (e[l])
				for (var c = 0, f = e[l].length; c < f; c++) {
					var d = e[l][c];
					if (("undefined" != typeof d.value && (d = d.value), (i[r] = n(d.trim(), r)))) continue e;
				}
		}
	return Object.keys(i).every(function (e) {
		return i[e];
	});
}
var h = {
		contains: function (e, t) {
			return (e = e.toLowerCase()), (t = t.toLowerCase()), e.contains(t);
		},
		equality: function (e, t) {
			return (e = e.toLowerCase()), (t = t.toLowerCase()), e === t;
		},
	},
	m = /\s+/;

class v extends n14_StoreBase {
	start() {
		this.contactStore = new Map();
		this.API = window.mozContacts || navigator.mozContacts;
		this.API.addEventListener("contactchange", this);
		this.initObserver();
	}
	getContactChildren(e) {
		return e ? e.querySelectorAll("*[data-contact-number]") : [];
	}
	updateFragment(e) {
		"function" == typeof e.hasAttribute && e.hasAttribute("data-contact-number") && this.updateContact(e);
		for (var t = this.getContactChildren(e), n = 0; n < t.length; n++) this.updateContact(t[n]);
	}
	initObserver() {
		var e = this,
			t = { attributes: !0, characterData: !1, childList: !0, subtree: !0, attributeFilter: ["data-contact-number"] };
		new MutationObserver(function (n, i) {
			i.disconnect(), e.updateContacts(n), i.observe(document, t);
		}).observe(document, t);
	}
	updateContacts(e) {
		for (var t = this, n = void 0, i = new Set(), a = 0; a < e.length; a++) {
			if (((n = e[a]), "childList" === n.type)) for (var o = void 0, r = 0; r < n.addedNodes.length; r++) (o = n.addedNodes[r]), o.nodeType === Node.ELEMENT_NODE && i.add(o);
			"attributes" === n.type && i.add(n.target);
		}
		i.forEach(function (e) {
			e.childElementCount ? t.updateFragment(e) : e.dataset.contactNumber && t.updateContact(e);
		}, this);
	}
	updateContact(e) {
		var t = this,
			n = e.dataset.contactNumber,
			i = "name" === e.dataset.contactColumn ? e : e.querySelector("[data-contact-column=name]"),
			a = "photo" === e.dataset.contactColumn ? e : e.querySelector("[data-contact-column=photo]");
		this.findByAddress(n, function (o) {
			var r = n13.getContactDetails(n, o, { photoURL: !0 });
			i
				? r.name
					? i.textContent !== r.name && (t.debug("updating name", r, e), (i.textContent = r.name))
					: i.textContent && (t.debug("cleaning name", r, e), (i.textContent = ""))
				: t.debug("no contact name DOM"),
				a ? (t.debug("updating photo", r, e), (a.style.backgroundImage = r.photoURL ? "url(" + r.photoURL + ")" : null)) : t.debug("no photo DOM");
		});
	}
	_handle_contactchange() {
		this.updateFragment(document.body), this.emit("contact-changed");
	}
	findBy(e, t) {
		var n,
			i,
			a = [],
			o = (e.filterValue || "").trim(),
			r = this;
		return navigator.mozContacts && o.length
			? ((n = o.split(m)),
			  (e.filterValue =
					1 === n.length
						? n[0]
						: n.reduce(function (e, t) {
								return a.push(t.toLowerCase()), t.length > e.length ? t : e;
						  }, "")),
			  e.filterValue.length < 3 && (e.filterLimit = 10),
			  a.splice(a.indexOf(e.filterValue.toLowerCase()), 1),
			  a.push.apply(a, n),
			  (i = r.API.find(e)),
			  (i.onsuccess = function () {
					var e,
						i = this.result.slice(),
						o = ["tel", "givenName", "familyName"],
						r = { fields: o, terms: a },
						s = [];
					if (n.length > 1) for (; (e = i.pop()); ) u(e, r, h.contains) && s.push(e);
					else s = i;
					t(s, { terms: n });
			  }),
			  void (i.onerror = function () {
					(this.onsuccess = null), (this.onerror = null), t(null);
			  }))
			: void setTimeout(function () {
					t("undefined" == typeof e.filterValue ? null : [], {});
			  });
	}
	findContactByString(e, t) {
		var n = ["tel", "givenName", "familyName"];
		return this.findBy({ filterBy: n, filterOp: "contains", filterValue: e }, t);
	}
	findExact(e, t) {
		return this.findBy({ filterBy: ["givenName", "familyName"], filterOp: "contains", filterValue: e }, function (n) {
			var i = n && n.length ? n[0] : null,
				a = { fields: ["name"], terms: [e] },
				o = !1;
			i && (o = u(i, a, h.equality)), t(o ? [i] : []);
		});
	}
	findByPhoneNumber(e, t) {
		return this.findBy({ filterBy: ["tel"], filterOp: "match", filterValue: e.replace(/\s+/g, "") }, function (e) {
			return e && e.length ? void t(e) : void t([]);
		});
	}
	findByAddress(e, t) {
		this.findByPhoneNumber(e, t);
	}
	findExactByEmail(e, t) {
		return this.findBy({ filterBy: ["email"], filterOp: "equals", filterValue: e }, t);
	}
	findById(e, t) {
		return this.findBy({ filterBy: ["id"], filterOp: "equals", filterValue: e }, function (e) {
			var n = [];
			e && e.length && (n = e[0]), t(n);
		});
	}
}

var n105_ContactsStore = new v();
n105_ContactsStore.start();
export default n105_ContactsStore;
