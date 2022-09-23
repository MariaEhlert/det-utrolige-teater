export const Main = props => {
	// kalder Main rundt om AppRouter for at sætte main tager på alle Route 
	// kalder props.children i main taget
	return (
		<main>
			{props.children}
		</main>
	)
}