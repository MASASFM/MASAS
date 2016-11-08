export const TOOGLE_LEGALS_PAGE_NUMBER = "TOOGLE_LEGALS_PAGE_NUMBER"

export function toogleLegalsPageNumber(pageNumber) {
	return {
		type: TOOGLE_LEGALS_PAGE_NUMBER,
		pageNumber,
	}
}