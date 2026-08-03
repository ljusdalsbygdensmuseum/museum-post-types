/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/mptab-alias.tsx"
/*!****************************************!*\
  !*** ./src/components/mptab-alias.tsx ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MPTABAlias: () => (/* binding */ MPTABAlias)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);




function MPTABAlias({
  element
}) {
  const [values, setValues] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(element.map(element => element.value));
  const [useAlias, setUseAlias] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(element.some(element => element.value.length > 0));
  const inputs = element.map((element, index) => {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
        label: element.label,
        value: values[index],
        onChange: value => {
          setValues(oldValues => {
            const newValues = oldValues.concat();
            newValues[index] = value;
            return newValues;
          });
          element.input.value = value;
        }
      })
    });
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Name Alias', 'mptab-domain'),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Ex. october, autumn or 3:rd quarter', 'mptab-domain'),
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Use alias', 'mptab-domain'),
      checked: useAlias,
      onChange: () => {
        setUseAlias(state => {
          const newState = !state;
          if (!newState) {
            setValues(() => {
              return element.map(element => {
                element.input.value = '';
                return '';
              });
            });
          }
          return newState;
        });
      }
    }), useAlias ? inputs : '']
  });
}

/***/ },

/***/ "./src/components/mptab-date-range.tsx"
/*!*********************************************!*\
  !*** ./src/components/mptab-date-range.tsx ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MPTABDateRange: () => (/* binding */ MPTABDateRange)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);



function MPTABDateRange({
  dates,
  input
}) {
  const getAllDates = range => {
    const start = new Date(range[0]).setHours(0, 0, 0, 0);
    const end = new Date(range[1]).setHours(0, 0, 0, 0);
    let allDatesArray = [];
    let loopDate = new Date(start);
    while (loopDate <= new Date(end)) {
      allDatesArray.push({
        date: new Date(loopDate)
      });
      loopDate = new Date(loopDate.setDate(loopDate.getDate() + 1));
    }
    return allDatesArray;
  };
  const [dateRange, setDateRange] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(dates);
  const [allDates, setAllDates] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(getAllDates(dateRange));
  const onDateClick = newDate => {
    setDateRange(oldDates => {
      let changeDates = oldDates;
      if (new Date(newDate).toDateString() == new Date(oldDates[0]).toDateString() || new Date(newDate).toDateString() == new Date(oldDates[1]).toDateString()) {
        return oldDates;
      }
      if (new Date(newDate) < new Date(oldDates[0])) {
        changeDates[0] = new Date(newDate).getTime();
      }
      if (new Date(newDate) > new Date(oldDates[1])) {
        changeDates[1] = new Date(newDate).getTime();
      }
      if (new Date(newDate) > new Date(oldDates[0]) && new Date(newDate) < new Date(oldDates[1])) {
        const endRange = new Date(oldDates[1]).getTime() - new Date(newDate).getTime();
        const startRange = new Date(newDate).getTime() - new Date(oldDates[0]).getTime();
        if (startRange >= endRange) {
          changeDates[1] = new Date(newDate).getTime();
        } else if (startRange < endRange) {
          changeDates[0] = new Date(newDate).getTime();
        }
      }
      // override if number is not filled in
      if (oldDates[0] >= 0 && oldDates[0] < 10000 || isNaN(oldDates[0])) {
        changeDates[0] = new Date(newDate).getTime();
      }
      if (oldDates[1] >= 0 && oldDates[1] < 10000 || isNaN(oldDates[1])) {
        changeDates[1] = new Date(newDate).getTime();
      }
      setAllDates(() => {
        return getAllDates(changeDates);
      });
      return changeDates;
    });
    input[0].value = String(dateRange[0]);
    input[1].value = String(dateRange[1]);
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.DatePicker, {
      startOfWeek: 1,
      currentDate: null,
      events: allDates,
      onChange: newDate => onDateClick(new Date(newDate))
    })
  });
}

/***/ },

/***/ "./src/input/mptab-exhibition-date.tsx"
/*!*********************************************!*\
  !*** ./src/input/mptab-exhibition-date.tsx ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MPTABExhibitionDate: () => (/* binding */ MPTABExhibitionDate)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_mptab_date_range__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/mptab-date-range */ "./src/components/mptab-date-range.tsx");
/* harmony import */ var _components_mptab_alias__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/mptab-alias */ "./src/components/mptab-alias.tsx");






function MPTABExhibitionDate({
  checkedInput,
  datesInput,
  aliasInput
}) {
  const [isChecked, setIsChecked] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(checkedInput.checked);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Permanent exhibition', 'mptab-domain'),
      checked: isChecked,
      onChange: () => {
        setIsChecked(state => {
          checkedInput.checked = !state;
          return !state;
        });
      }
    }), isChecked ? '' : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.BaseControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Exhibition Dates', 'mptab-domain'),
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_mptab_date_range__WEBPACK_IMPORTED_MODULE_4__.MPTABDateRange, {
          dates: [parseInt(datesInput[0].value), parseInt(datesInput[1].value)],
          input: datesInput
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_mptab_alias__WEBPACK_IMPORTED_MODULE_5__.MPTABAlias, {
          element: [{
            id: 'mptab-exhibition-date-start-alias',
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Start alias', 'mptab-domain'),
            value: aliasInput[0].value,
            input: aliasInput[0]
          }, {
            id: 'mptab-exhibition-date-end-alias',
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('End alias', 'mptab-domain'),
            value: aliasInput[1].value,
            input: aliasInput[1]
          }]
        })]
      })
    })]
  });
}

/***/ },

/***/ "react"
/*!************************!*\
  !*** external "React" ***!
  \************************/
(module) {

module.exports = window["React"];

/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/dom-ready"
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
(module) {

module.exports = window["wp"]["domReady"];

/***/ },

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["element"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			const getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.hasOwn(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************************!*\
  !*** ./src/exhibition_meta.tsx ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _input_mptab_exhibition_date__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./input/mptab-exhibition-date */ "./src/input/mptab-exhibition-date.tsx");




_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1___default()(() => {
  const root = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createRoot)(document.getElementById('mptab-exhibition-daterange'));
  //permanent
  const isPermanentInput = document.querySelector('#mptab-exhibition-is-permanent');
  if (!isPermanentInput) {
    throw new Error('mptab-exhibition-is-permanent not found');
  }
  //date
  const mindateInput = document.querySelector('#mptab-exhibition_date_start_field');
  const maxdateInput = document.querySelector('#mptab-exhibition_date_end_field');
  if (!mindateInput || !maxdateInput) {
    throw new Error('dates_field not found');
  }
  //alias
  const startAliasInput = document.querySelector('#mptab-exhibition_date_start_alias_field');
  const endAliasInput = document.querySelector('#mptab-exhibition_date_end_alias_field');
  if (!startAliasInput || !endAliasInput) {
    throw new Error('alias_field not found');
  }
  root.render((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_input_mptab_exhibition_date__WEBPACK_IMPORTED_MODULE_3__.MPTABExhibitionDate, {
      checkedInput: isPermanentInput,
      datesInput: [mindateInput, maxdateInput],
      aliasInput: [startAliasInput, endAliasInput]
    })
  }));
});
})();

/******/ })()
;
//# sourceMappingURL=exhibition_meta.js.map