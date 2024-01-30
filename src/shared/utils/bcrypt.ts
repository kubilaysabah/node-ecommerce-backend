export async function hash(password: string, saltRounds: number = 10): Promise<string> {
	const bcrypt = await import('bcrypt')
	const salt = await bcrypt.genSalt(saltRounds)
	return bcrypt.hash(password, salt)
}

export async function compare(password: string, hashedPassword: string): Promise<boolean> {
	const bcrypt = await import('bcrypt')
	return bcrypt.compare(password, hashedPassword)
}
