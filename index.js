// task 1
function createDebounceFunction(func, num) {
  if (!func || typeof func != "function") {
    throw new Error("Invalid argument");
  }
  if (
    !isFinite(num) ||
    typeof num != "number" ||
    num < 0 ||
    !Number.isInteger(num)
  ) {
    throw new Error("Invalid argument2");
  }

  let timer;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => func(), num);
  };
}

// task 2
class RickAndMorty {
  getCharacter(id) {
    if (
      !id ||
      typeof id != "number" ||
      !isFinite(id) ||
      id < 0 ||
      !Number.isInteger(id)
    ) {
      throw new Error("Invalid character id");
    }
    return fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error();
        }
      })
      .catch((error) => {
        return null;
      });
  }
  getEpisode = async function (id) {
    if (
      !id ||
      typeof id != "number" ||
      !isFinite(id) ||
      id < 0 ||
      !Number.isInteger(id)
    ) {
      throw new Error("Invalid episode id");
    }

    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/episode/${id}`
      );
      if (response.ok) {
        return response.json();
      } else {
        throw new Error();
      }
    } catch {
      return null;
    }
  };
}
