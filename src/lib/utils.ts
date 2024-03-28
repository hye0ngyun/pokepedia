import { IFlavorText, IName } from "./services/pokemonService/pokemonService";

export function getFlavorText(array: IFlavorText[]) {
  return (
    array.find((el) => el.language.name === "ko")?.flavor_text ||
    array.find((el) => el.language.name === "en")?.flavor_text ||
    array.find((el) => el.language.name === "jp")?.flavor_text
  );
}
export function getName(array: IName[]) {
  return (
    array.find((el) => el.language.name === "ko")?.name ||
    array.find((el) => el.language.name === "en")?.name ||
    array.find((el) => el.language.name === "jp")?.name
  );
}
export function getIdFromUrl(url: string) {
  const splitUrls = url.split("/");
  const id = Number(splitUrls[splitUrls.length - 2]);
  return id;
}
