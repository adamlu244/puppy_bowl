/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client/ajaxHelpers.js":
/*!*******************************!*\
  !*** ./client/ajaxHelpers.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addNewPlayer": () => (/* binding */ addNewPlayer),
/* harmony export */   "fetchAllPlayers": () => (/* binding */ fetchAllPlayers),
/* harmony export */   "fetchSinglePlayer": () => (/* binding */ fetchSinglePlayer),
/* harmony export */   "removePlayer": () => (/* binding */ removePlayer)
/* harmony export */ });
// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2209-ftb-web-pt';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;


const fetchAllPlayers = async () => {
    try {
        const response = await fetch(`${APIURL}players`);
        const result = await response.json();
        if (result.error) {
            throw result.error;
        }
        return result.data.players;
    } catch (error) {
        console.error("You were not able to fetch all players, try again!", error);
    }
};

const fetchSinglePlayer = async (playerId) => {
    try {
        const response = await fetch(`${APIURL}players/${playerId}`);
        const result = await response.json();
        if (result.error) {
            throw result.error;
        }
        return await result.data.player;
    } catch (error) {
        console.error("Something went wrong, try again!");
    }
};

const addNewPlayer = async (playerObj) => {
    try {
        console.log(playerObj);
        const response = await fetch(
          `${APIURL}players/`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(playerObj),
          }
        );
        const result = await response.json();
        return result;
      } catch (err) {
        console.error(err);
    }
};

const removePlayer = async (playerId) => {
    try {
        const response = await fetch(`${APIURL}players/${playerId}`, {
            method: "DELETE"
        });
        const result = await response.json();
    } catch (error) {
        console.error(error);
    }
};


/***/ }),

/***/ "./client/renderHelpers.js":
/*!*********************************!*\
  !*** ./client/renderHelpers.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderAllPlayers": () => (/* binding */ renderAllPlayers),
/* harmony export */   "renderNewPlayerForm": () => (/* binding */ renderNewPlayerForm),
/* harmony export */   "renderSinglePlayer": () => (/* binding */ renderSinglePlayer)
/* harmony export */ });
/* harmony import */ var _ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ajaxHelpers */ "./client/ajaxHelpers.js");


const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

const renderAllPlayers = (playerList) => {
  // First check if we have any data before trying to render it!
  if (!playerList || !playerList.length) {
    playerContainer.innerHTML = '<h3>No players to display!</h3>';
    return;
  }

  // Loop through the list of players, and construct some HTML to display each one
  let playerContainerHTML = '';
  for (let i = 0; i < playerList.length; i++) {
    const pup = playerList[i];
    let pupHTML = `
      <div class="single-player-card">
        <div class="header-info">
          <p class="pup-title">${pup.name}</p>
          <p class="pup-number">#${pup.id}</p>
        </div>
        <img src="${pup.imageUrl}" alt="photo of ${pup.name} the puppy">
        <button class="detail-button" data-id=${pup.id}>See details</button>
        <button class="delete-button" data-id=${pup.id}>Delete Player</button>
      </div>
    `;
    playerContainerHTML += pupHTML;
  }

  // After looping, fill the `playerContainer` div with the HTML we constructed above
  playerContainer.innerHTML = playerContainerHTML;

  // Now that the HTML for all players has been added to the DOM,
  // we want to grab those "See details" buttons on each player
  // and attach a click handler to each one
  let detailButtons = [...document.getElementsByClassName('detail-button')];
  for (let i = 0; i < detailButtons.length; i++) {
    const button = detailButtons[i];
    button.addEventListener('click', async () => {
      /*
        YOUR CODE HERE
      */
      const singlePlayer = await (0,_ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__.fetchSinglePlayer)(button.dataset.id);
      renderSinglePlayer(singlePlayer);

      let backButtonEl = document.getElementById('see-all');
      backButtonEl.addEventListener("click", async () => {
        const players = await (0,_ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__.fetchAllPlayers)()
        renderAllPlayers(players);
        renderNewPlayerForm();
      });
    });
  }
  let deleteButtonEl = [...document.getElementsByClassName("delete-button")];
      for (let i = 0; i < deleteButtonEl.length; i++) {
        const button = deleteButtonEl[i];
        button.addEventListener("click", async () => {
          await (0,_ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__.removePlayer)(button.dataset.id);
          const players2 = await (0,_ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__.fetchAllPlayers)();
          renderAllPlayers(players2);
        })
      }
};

const renderSinglePlayer = (playerObj) => {
  if (!playerObj || !playerObj.id) {
    playerContainer.innerHTML = "<h3>Couldn't find data for this player!</h3>";
    return;
  }

  let pupHTML = `
    <div class="single-player-view">
      <div class="header-info">
        <p class="pup-title">${playerObj.name}</p>
        <p class="pup-number">#${playerObj.id}</p>
      </div>
      <p>Team: ${playerObj.team ? playerObj.team.name : 'Unassigned'}</p>
      <p>Breed: ${playerObj.breed}</p>
      <img src="${playerObj.imageUrl}" alt="photo of ${
    playerObj.name
  } the puppy">
      <button id="see-all">Back to all players</button>
    </div>
  `;

  playerContainer.innerHTML = pupHTML;
};

const renderNewPlayerForm = () => {
  let formHTML = `
    <form>
      <label for="name">Name:</label>
      <input type="text" name="name" />
      <label for="breed">Breed:</label>
      <input type="text" name="breed" />
      <button type="submit">Submit</button>
    </form>
  `;
  newPlayerFormContainer.innerHTML = formHTML;

  let form = document.querySelector('#new-player-form > form');
  form.addEventListener('submit', async (event) => {
    /*
      YOUR CODE HERE
    */
    event.preventDefault();
    let playerData = {
      name: form.elements.name.value,
      breed: form.elements.breed.value
    }
    try {
      await (0,_ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__.addNewPlayer)(playerData);
      const players = await (0,_ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__.fetchAllPlayers)();
      renderAllPlayers(players);
    } catch(error) {
      console.error(error);
    }
    form.reset();
  });
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./client/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ajaxHelpers */ "./client/ajaxHelpers.js");
/* harmony import */ var _renderHelpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderHelpers */ "./client/renderHelpers.js");



const init = async () => {
  const players = await (0,_ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__.fetchAllPlayers)()
  ;(0,_renderHelpers__WEBPACK_IMPORTED_MODULE_1__.renderAllPlayers)(players)

  ;(0,_renderHelpers__WEBPACK_IMPORTED_MODULE_1__.renderNewPlayerForm)()
}

init()

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0EsMkRBQTJELFdBQVc7OztBQUcvRDtBQUNQO0FBQ0Esd0NBQXdDLE9BQU87QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBLHdDQUF3QyxPQUFPLFVBQVUsU0FBUztBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0Esd0NBQXdDLE9BQU8sVUFBVSxTQUFTO0FBQ2xFO0FBQ0EsU0FBUztBQUNUO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0QrRjs7QUFFL0Y7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtCQUFrQix1QkFBdUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsU0FBUztBQUMxQyxtQ0FBbUMsT0FBTztBQUMxQztBQUNBLG9CQUFvQixhQUFhLGtCQUFrQixVQUFVO0FBQzdELGdEQUFnRCxPQUFPO0FBQ3ZELGdEQUFnRCxPQUFPO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsMEJBQTBCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsK0RBQWlCO0FBQ2xEOztBQUVBO0FBQ0E7QUFDQSw4QkFBOEIsNkRBQWU7QUFDN0M7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBLHNCQUFzQiwyQkFBMkI7QUFDakQ7QUFDQTtBQUNBLGdCQUFnQiwwREFBWTtBQUM1QixpQ0FBaUMsNkRBQWU7QUFDaEQ7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixlQUFlO0FBQzlDLGlDQUFpQyxhQUFhO0FBQzlDO0FBQ0EsaUJBQWlCLG9EQUFvRDtBQUNyRSxrQkFBa0IsZ0JBQWdCO0FBQ2xDLGtCQUFrQixtQkFBbUI7QUFDckM7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSwwREFBWTtBQUN4Qiw0QkFBNEIsNkRBQWU7QUFDM0M7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7O1VDeEhBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTitDO0FBQ3dCOztBQUV2RTtBQUNBLHdCQUF3Qiw2REFBZTtBQUN2QyxFQUFFLGlFQUFnQjs7QUFFbEIsRUFBRSxvRUFBbUI7QUFDckI7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wdXBweWJvd2wtd29ya3Nob3AvLi9jbGllbnQvYWpheEhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vcHVwcHlib3dsLXdvcmtzaG9wLy4vY2xpZW50L3JlbmRlckhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vcHVwcHlib3dsLXdvcmtzaG9wL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3B1cHB5Ym93bC13b3Jrc2hvcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcHVwcHlib3dsLXdvcmtzaG9wL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcHVwcHlib3dsLXdvcmtzaG9wL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcHVwcHlib3dsLXdvcmtzaG9wLy4vY2xpZW50L2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEFkZCB5b3VyIGNvaG9ydCBuYW1lIHRvIHRoZSBjb2hvcnROYW1lIHZhcmlhYmxlIGJlbG93LCByZXBsYWNpbmcgdGhlICdDT0hPUlQtTkFNRScgcGxhY2Vob2xkZXJcbmNvbnN0IGNvaG9ydE5hbWUgPSAnMjIwOS1mdGItd2ViLXB0Jztcbi8vIFVzZSB0aGUgQVBJVVJMIHZhcmlhYmxlIGZvciBmZXRjaCByZXF1ZXN0c1xuY29uc3QgQVBJVVJMID0gYGh0dHBzOi8vZnNhLXB1cHB5LWJvd2wuaGVyb2t1YXBwLmNvbS9hcGkvJHtjb2hvcnROYW1lfS9gO1xuXG5cbmV4cG9ydCBjb25zdCBmZXRjaEFsbFBsYXllcnMgPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtBUElVUkx9cGxheWVyc2ApO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIGlmIChyZXN1bHQuZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IHJlc3VsdC5lcnJvcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGEucGxheWVycztcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiWW91IHdlcmUgbm90IGFibGUgdG8gZmV0Y2ggYWxsIHBsYXllcnMsIHRyeSBhZ2FpbiFcIiwgZXJyb3IpO1xuICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCBmZXRjaFNpbmdsZVBsYXllciA9IGFzeW5jIChwbGF5ZXJJZCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7QVBJVVJMfXBsYXllcnMvJHtwbGF5ZXJJZH1gKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBpZiAocmVzdWx0LmVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyByZXN1bHQuZXJyb3I7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF3YWl0IHJlc3VsdC5kYXRhLnBsYXllcjtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiU29tZXRoaW5nIHdlbnQgd3JvbmcsIHRyeSBhZ2FpbiFcIik7XG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGFkZE5ld1BsYXllciA9IGFzeW5jIChwbGF5ZXJPYmopID0+IHtcbiAgICB0cnkge1xuICAgICAgICBjb25zb2xlLmxvZyhwbGF5ZXJPYmopO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgICAgIGAke0FQSVVSTH1wbGF5ZXJzL2AsXG4gICAgICAgICAge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGxheWVyT2JqKSxcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZVBsYXllciA9IGFzeW5jIChwbGF5ZXJJZCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7QVBJVVJMfXBsYXllcnMvJHtwbGF5ZXJJZH1gLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCJcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICB9XG59O1xuIiwiaW1wb3J0IHsgYWRkTmV3UGxheWVyLCBmZXRjaEFsbFBsYXllcnMsIGZldGNoU2luZ2xlUGxheWVyLCByZW1vdmVQbGF5ZXIgfSBmcm9tICcuL2FqYXhIZWxwZXJzJztcblxuY29uc3QgcGxheWVyQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FsbC1wbGF5ZXJzLWNvbnRhaW5lcicpO1xuY29uc3QgbmV3UGxheWVyRm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctcGxheWVyLWZvcm0nKTtcblxuZXhwb3J0IGNvbnN0IHJlbmRlckFsbFBsYXllcnMgPSAocGxheWVyTGlzdCkgPT4ge1xuICAvLyBGaXJzdCBjaGVjayBpZiB3ZSBoYXZlIGFueSBkYXRhIGJlZm9yZSB0cnlpbmcgdG8gcmVuZGVyIGl0IVxuICBpZiAoIXBsYXllckxpc3QgfHwgIXBsYXllckxpc3QubGVuZ3RoKSB7XG4gICAgcGxheWVyQ29udGFpbmVyLmlubmVySFRNTCA9ICc8aDM+Tm8gcGxheWVycyB0byBkaXNwbGF5ITwvaDM+JztcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBMb29wIHRocm91Z2ggdGhlIGxpc3Qgb2YgcGxheWVycywgYW5kIGNvbnN0cnVjdCBzb21lIEhUTUwgdG8gZGlzcGxheSBlYWNoIG9uZVxuICBsZXQgcGxheWVyQ29udGFpbmVySFRNTCA9ICcnO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllckxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBwdXAgPSBwbGF5ZXJMaXN0W2ldO1xuICAgIGxldCBwdXBIVE1MID0gYFxuICAgICAgPGRpdiBjbGFzcz1cInNpbmdsZS1wbGF5ZXItY2FyZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLWluZm9cIj5cbiAgICAgICAgICA8cCBjbGFzcz1cInB1cC10aXRsZVwiPiR7cHVwLm5hbWV9PC9wPlxuICAgICAgICAgIDxwIGNsYXNzPVwicHVwLW51bWJlclwiPiMke3B1cC5pZH08L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8aW1nIHNyYz1cIiR7cHVwLmltYWdlVXJsfVwiIGFsdD1cInBob3RvIG9mICR7cHVwLm5hbWV9IHRoZSBwdXBweVwiPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZGV0YWlsLWJ1dHRvblwiIGRhdGEtaWQ9JHtwdXAuaWR9PlNlZSBkZXRhaWxzPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJkZWxldGUtYnV0dG9uXCIgZGF0YS1pZD0ke3B1cC5pZH0+RGVsZXRlIFBsYXllcjwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgICBwbGF5ZXJDb250YWluZXJIVE1MICs9IHB1cEhUTUw7XG4gIH1cblxuICAvLyBBZnRlciBsb29waW5nLCBmaWxsIHRoZSBgcGxheWVyQ29udGFpbmVyYCBkaXYgd2l0aCB0aGUgSFRNTCB3ZSBjb25zdHJ1Y3RlZCBhYm92ZVxuICBwbGF5ZXJDb250YWluZXIuaW5uZXJIVE1MID0gcGxheWVyQ29udGFpbmVySFRNTDtcblxuICAvLyBOb3cgdGhhdCB0aGUgSFRNTCBmb3IgYWxsIHBsYXllcnMgaGFzIGJlZW4gYWRkZWQgdG8gdGhlIERPTSxcbiAgLy8gd2Ugd2FudCB0byBncmFiIHRob3NlIFwiU2VlIGRldGFpbHNcIiBidXR0b25zIG9uIGVhY2ggcGxheWVyXG4gIC8vIGFuZCBhdHRhY2ggYSBjbGljayBoYW5kbGVyIHRvIGVhY2ggb25lXG4gIGxldCBkZXRhaWxCdXR0b25zID0gWy4uLmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2RldGFpbC1idXR0b24nKV07XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGV0YWlsQnV0dG9ucy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRldGFpbEJ1dHRvbnNbaV07XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xuICAgICAgLypcbiAgICAgICAgWU9VUiBDT0RFIEhFUkVcbiAgICAgICovXG4gICAgICBjb25zdCBzaW5nbGVQbGF5ZXIgPSBhd2FpdCBmZXRjaFNpbmdsZVBsYXllcihidXR0b24uZGF0YXNldC5pZCk7XG4gICAgICByZW5kZXJTaW5nbGVQbGF5ZXIoc2luZ2xlUGxheWVyKTtcblxuICAgICAgbGV0IGJhY2tCdXR0b25FbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWUtYWxsJyk7XG4gICAgICBiYWNrQnV0dG9uRWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgcGxheWVycyA9IGF3YWl0IGZldGNoQWxsUGxheWVycygpXG4gICAgICAgIHJlbmRlckFsbFBsYXllcnMocGxheWVycyk7XG4gICAgICAgIHJlbmRlck5ld1BsYXllckZvcm0oKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIGxldCBkZWxldGVCdXR0b25FbCA9IFsuLi5kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZGVsZXRlLWJ1dHRvblwiKV07XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlbGV0ZUJ1dHRvbkVsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IGRlbGV0ZUJ1dHRvbkVsW2ldO1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICBhd2FpdCByZW1vdmVQbGF5ZXIoYnV0dG9uLmRhdGFzZXQuaWQpO1xuICAgICAgICAgIGNvbnN0IHBsYXllcnMyID0gYXdhaXQgZmV0Y2hBbGxQbGF5ZXJzKCk7XG4gICAgICAgICAgcmVuZGVyQWxsUGxheWVycyhwbGF5ZXJzMik7XG4gICAgICAgIH0pXG4gICAgICB9XG59O1xuXG5leHBvcnQgY29uc3QgcmVuZGVyU2luZ2xlUGxheWVyID0gKHBsYXllck9iaikgPT4ge1xuICBpZiAoIXBsYXllck9iaiB8fCAhcGxheWVyT2JqLmlkKSB7XG4gICAgcGxheWVyQ29udGFpbmVyLmlubmVySFRNTCA9IFwiPGgzPkNvdWxkbid0IGZpbmQgZGF0YSBmb3IgdGhpcyBwbGF5ZXIhPC9oMz5cIjtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgcHVwSFRNTCA9IGBcbiAgICA8ZGl2IGNsYXNzPVwic2luZ2xlLXBsYXllci12aWV3XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLWluZm9cIj5cbiAgICAgICAgPHAgY2xhc3M9XCJwdXAtdGl0bGVcIj4ke3BsYXllck9iai5uYW1lfTwvcD5cbiAgICAgICAgPHAgY2xhc3M9XCJwdXAtbnVtYmVyXCI+IyR7cGxheWVyT2JqLmlkfTwvcD5cbiAgICAgIDwvZGl2PlxuICAgICAgPHA+VGVhbTogJHtwbGF5ZXJPYmoudGVhbSA/IHBsYXllck9iai50ZWFtLm5hbWUgOiAnVW5hc3NpZ25lZCd9PC9wPlxuICAgICAgPHA+QnJlZWQ6ICR7cGxheWVyT2JqLmJyZWVkfTwvcD5cbiAgICAgIDxpbWcgc3JjPVwiJHtwbGF5ZXJPYmouaW1hZ2VVcmx9XCIgYWx0PVwicGhvdG8gb2YgJHtcbiAgICBwbGF5ZXJPYmoubmFtZVxuICB9IHRoZSBwdXBweVwiPlxuICAgICAgPGJ1dHRvbiBpZD1cInNlZS1hbGxcIj5CYWNrIHRvIGFsbCBwbGF5ZXJzPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIGA7XG5cbiAgcGxheWVyQ29udGFpbmVyLmlubmVySFRNTCA9IHB1cEhUTUw7XG59O1xuXG5leHBvcnQgY29uc3QgcmVuZGVyTmV3UGxheWVyRm9ybSA9ICgpID0+IHtcbiAgbGV0IGZvcm1IVE1MID0gYFxuICAgIDxmb3JtPlxuICAgICAgPGxhYmVsIGZvcj1cIm5hbWVcIj5OYW1lOjwvbGFiZWw+XG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwibmFtZVwiIC8+XG4gICAgICA8bGFiZWwgZm9yPVwiYnJlZWRcIj5CcmVlZDo8L2xhYmVsPlxuICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImJyZWVkXCIgLz5cbiAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPlN1Ym1pdDwvYnV0dG9uPlxuICAgIDwvZm9ybT5cbiAgYDtcbiAgbmV3UGxheWVyRm9ybUNvbnRhaW5lci5pbm5lckhUTUwgPSBmb3JtSFRNTDtcblxuICBsZXQgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXctcGxheWVyLWZvcm0gPiBmb3JtJyk7XG4gIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgYXN5bmMgKGV2ZW50KSA9PiB7XG4gICAgLypcbiAgICAgIFlPVVIgQ09ERSBIRVJFXG4gICAgKi9cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCBwbGF5ZXJEYXRhID0ge1xuICAgICAgbmFtZTogZm9ybS5lbGVtZW50cy5uYW1lLnZhbHVlLFxuICAgICAgYnJlZWQ6IGZvcm0uZWxlbWVudHMuYnJlZWQudmFsdWVcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGFkZE5ld1BsYXllcihwbGF5ZXJEYXRhKTtcbiAgICAgIGNvbnN0IHBsYXllcnMgPSBhd2FpdCBmZXRjaEFsbFBsYXllcnMoKTtcbiAgICAgIHJlbmRlckFsbFBsYXllcnMocGxheWVycyk7XG4gICAgfSBjYXRjaChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgfVxuICAgIGZvcm0ucmVzZXQoKTtcbiAgfSk7XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBmZXRjaEFsbFBsYXllcnMgfSBmcm9tICcuL2FqYXhIZWxwZXJzJ1xuaW1wb3J0IHsgcmVuZGVyQWxsUGxheWVycywgcmVuZGVyTmV3UGxheWVyRm9ybSB9IGZyb20gJy4vcmVuZGVySGVscGVycydcblxuY29uc3QgaW5pdCA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgcGxheWVycyA9IGF3YWl0IGZldGNoQWxsUGxheWVycygpXG4gIHJlbmRlckFsbFBsYXllcnMocGxheWVycylcblxuICByZW5kZXJOZXdQbGF5ZXJGb3JtKClcbn1cblxuaW5pdCgpXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=