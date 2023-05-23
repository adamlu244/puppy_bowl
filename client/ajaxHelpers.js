// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2209-ftb-web-pt';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;


export const fetchAllPlayers = async () => {
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

export const fetchSinglePlayer = async (playerId) => {
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

export const addNewPlayer = async (playerObj) => {
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

export const removePlayer = async (playerId) => {
    try {
        const response = await fetch(`${APIURL}players/${playerId}`, {
            method: "DELETE"
        });
        const result = await response.json();
    } catch (error) {
        console.error(error);
    }
};
