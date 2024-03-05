import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { ref, getDownloadURL, StorageReference } from "firebase/storage";
import { storage } from "@/firebase/firebase";

export const useGetHeroImage = () => {
	const [bgWithGradient, setBgWithGradient] = useState("");
	const [heroBgURL, setHeroBgURL] = useState("");

	const isSmallScreen = useMediaQuery({ maxWidth: 467 });
	const isMediumScreen = useMediaQuery({ minWidth: 468, maxWidth: 767 });
	const isLargeScreen = useMediaQuery({ minWidth: 768, maxWidth: 1439 });
	const isDesktopScreen = useMediaQuery({ minWidth: 1440 });
	const [loading, setLoading] = useState(true);

	const getPhotoURL = async (fileRef: StorageReference) => {
		try {
			const downloadURL = await getDownloadURL(fileRef);
			setHeroBgURL(downloadURL);
			setLoading(false);
		} catch (error) {
			console.error("Error getting photo URL:", error);
			setLoading(false);
		}
	};

	useEffect(() => {
		let heroBgRef;

		if (isSmallScreen) {
			heroBgRef = ref(storage, "home/hero/heroBgMob.webp");
		} else if (isMediumScreen) {
			heroBgRef = ref(storage, "home/hero/heroBg.webp");
		} else if (isLargeScreen) {
			heroBgRef = ref(storage, "home/hero/heroBg.webp");
		} else if (isDesktopScreen) {
			heroBgRef = ref(storage, "home/hero/heroBg.webp");
		}

		if (heroBgRef) {
			getPhotoURL(heroBgRef);
		}
	}, [isSmallScreen, isMediumScreen, isLargeScreen, isDesktopScreen]);

	useEffect(() => {
		if (isSmallScreen) {
			setBgWithGradient(`center center / cover no-repeat url(${heroBgURL})`);
		} else if (isMediumScreen) {
			setBgWithGradient(`linear-gradient(
        89deg,
        rgba(31, 31, 31, 0.70) 63.3%, 
        rgba(31, 31, 31, 0.00) 97.94%),center center / cover no-repeat url(${heroBgURL}), lightgray 0px -9.5px / 100% 137.358%`);
		} else if (isLargeScreen) {
			setBgWithGradient(`linear-gradient(
        89deg,
        rgba(31, 31, 31, 0.70) 63.3%, 
        rgba(31, 31, 31, 0.00) 97.94%),center center / cover no-repeat url(${heroBgURL}), lightgray 0px -9.5px / 100% 137.358%`);
		} else if (isDesktopScreen) {
			setBgWithGradient(`linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.70) 61.75%,
		rgba(0, 0, 0, 0.00) 89.98%), center center / cover no-repeat url(${heroBgURL}), lightgray 1.967px 6.227px / 99.906% 98.983%`);
		}

		// linear-gradient(90deg, rgba(0, 0, 0, 0.70) 61.75%, rgba(0, 0, 0, 0.00) 89.98%), url(<path-to-image>), lightgray 1.967px 6.227px / 99.906% 98.983% no-repeat;
	}, [
		isSmallScreen,
		isMediumScreen,
		isLargeScreen,
		heroBgURL,
		isDesktopScreen,
	]);

	return { bgWithGradient, loading };
};
