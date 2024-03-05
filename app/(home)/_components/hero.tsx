"use client";

import { useGetHeroImage } from "@/hooks/useGetHeroImage";

export const Hero = () => {
	const { bgWithGradient, loading } = useGetHeroImage();
	return (
		<div>
			<div
				style={{
					background: `${bgWithGradient}`,
				}}></div>
		</div>
	);
};
