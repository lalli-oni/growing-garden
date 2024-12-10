type DateStyle = Intl.DateTimeFormatOptions['dateStyle']

export function formatDate(date: string | Date, dateStyle: DateStyle = 'medium', locales = 'en') {
	// Safari is mad about dashes in the date
	const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle })
	if (typeof date === 'string') {
		return dateFormatter.format(new Date(date))
	}

	return dateFormatter.format(date)
}
