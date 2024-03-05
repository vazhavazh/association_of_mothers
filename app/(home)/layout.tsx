const HomeLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='h-full bg-[#FBFDFF]'>
			{/* <Navbar /> */}
			<main className='pb-10'>{children}</main>
			{/* <Footer /> */}
		</div>
	);
};

export default HomeLayout;
