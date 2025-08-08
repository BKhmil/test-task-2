const Footer = () => (
	<footer className='bg-gray-800 border-t border-gray-700 py-6'>
		<div className='container mx-auto px-4 text-center'>
			<p className='text-gray-300'>
				© {new Date().getFullYear()} Meeting Rooms. All rights reserved.
			</p>
		</div>
	</footer>
);

export default Footer;
