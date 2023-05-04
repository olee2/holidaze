export const searchAlgo = (venue, term) =>
  venue.name.toLowerCase().search(term.trim()) > -1 ||
  venue.description.toLowerCase().search(term.trim()) > -1;
