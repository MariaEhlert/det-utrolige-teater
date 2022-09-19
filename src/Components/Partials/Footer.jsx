import './Footer.scss';
export const Footer = () => {
	return (
		<footer>
			<section className='infoWrapper'>
				<article>
					<h4>ADRESSE</h4>
					<p>Det utrolige teater</p>
					<p>Havnegade 901</p>
					<p>9000 Aalborg</p>
					<p>EAN 5798003279845</p>
					<p>CVR 1001 0012</p><br></br>
					<p>Find vej på kort</p>
				</article>
				<div>
					<article>
						<h4>BILLETSERVICE</h4>
						<p>Se åbningstider</p>
						<a href="tel:+45-96-31-80-80" target="_blank">Billettelefon: +45 96 31 80 80</a> <br></br>
						<a href="mailto:billet@dut.dk" target="_blank">billet@dut.dk</a>
					</article> <br></br>
					<article>
						<h4>ADMINSTRATION</h4>
						<a href="tel:+45-96-31-80-90" target="_blank">Telefon: +45 96 31 80 90</a> <br></br>
						<a href="mailto:adm@dut.dk" target="_blank">adm@dut.dk</a>
					</article>
				</div>
				<article>
					<h4>PRAKTISK INFO</h4>
					<p>Kontakt</p>
					<p>Kom trygt i teatret</p>
					<p>Presseside</p>
					<p>Skoleforestillinger</p>
					<p>Teatercaféen</p>
					<p>Handelsbetingelser</p>
				</article>
			</section>
			<figure className='mediaWrapper'>
				<img src={require('../../Assets/Image/Facebook.png')} alt="facebook-icon" />
				<img src={require('../../Assets/Image/Instagram.png')} alt="instagram-icon" />
				<img src={require('../../Assets/Image/Linked.png')} alt="linked-icon" />
			</figure>
		</footer>
	)
}














