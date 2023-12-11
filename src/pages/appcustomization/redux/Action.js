import AppCustomizationRepository from "../../../repositories/AppCustomizationRepository";
import GeneralUtility from "../../../utils/general-utility";
import PopupUtility from "../../../utils/popup-utility";

import { setAddForm } from "./Reducer";

const getList = async (dispatch) => {
  const response = await AppCustomizationRepository.getAppCustomization();

  let data = {};
  if(response && !response.error) {
    if (Array.isArray(response.heroBanner)) {
      if (response.heroBanner.length > 0) {
        // Elemen pertama
        if (response.heroBanner[0].id !== "") {
          data.idHero1 = response.heroBanner[0].id;
          data.imageHero1 = response.heroBanner[0].image;
        } else {
          data.idHero1 = "";
          data.imageHero1 = "";
        }
    
        // Elemen kedua
        if (response.heroBanner.length > 1) {
          if (response.heroBanner[1].id !== "") {
            data.idHero2 = response.heroBanner[1].id;
            data.imageHero2 = response.heroBanner[1].image;
          } else {
            data.idHero2 = "";
            data.imageHero2 = "";
          }
        } else {
          data.idHero2 = "";
          data.imageHero2 = "";
        }
    
        // Elemen ketiga
        if (response.heroBanner.length > 2) {
          if (response.heroBanner[2].id !== "") {
            data.idHero3 = response.heroBanner[2].id;
            data.imageHero3 = response.heroBanner[2].image;
          } else {
            data.idHero3 = "";
            data.imageHero3 = "";
          }
        } else {
          data.idHero3 = "";
          data.imageHero3 = "";
        }
      } else {
        data.idHero1 = "";
        data.imageHero1 = "";
        data.idHero2 = "";
        data.imageHero2 = "";
        data.idHero3 = "";
        data.imageHero3 = "";
      }
    } else {
      data.idHero1 = "";
      data.imageHero1 = "";
      data.idHero2 = "";
      data.imageHero2 = "";
      data.idHero3 = "";
      data.imageHero3 = "";
    }

    if (response.buybackBanner && response.buybackBanner.id !== "") {
      data.idBuyback = response.buybackBanner.id;
      data.imageBuyback = response.buybackBanner.image;
    } else {
      data.idBuyback = "";
      data.imageBuyback = "";
    }
    
  }
  dispatch(setAddForm(data));
};

const handleChange = (dispatch, e, addForm) => {
  const { name, value } = e.target;
  dispatch(setAddForm({ ...addForm, [name]: value }));
};

const handleSubmit = async (dispatch, e, addForm, setLoadingButton) => {
  e.preventDefault();
  let data = new FormData();
  if (
    addForm.imageHero1 !== undefined &&
    addForm.imageHero1 !== "" &&
    addForm.imageHero1name
  ) {
    data.append(
      "heroBanners[0].image",
      GeneralUtility.dataURLtoFile(addForm.imageHero1, addForm.imageHero1name),
      addForm.imageHero1name
    );
  
    // Hanya mengirimkan id jika addForm.idHero1 ada dan tidak kosong
    if (addForm.idHero1) {
      data.append("heroBanners[0].id", addForm.idHero1);
    }
  }
  
  if (
    addForm.imageHero2 !== undefined &&
    addForm.imageHero2 !== "" &&
    addForm.imageHero2name
  ) {
    data.append(
      "heroBanners[1].image",
      GeneralUtility.dataURLtoFile(addForm.imageHero2, addForm.imageHero2name),
      addForm.imageHero2name
    );
  
    // Hanya mengirimkan id jika addForm.idHero2 ada dan tidak kosong
    if (addForm.idHero2) {
      data.append("heroBanners[1].id", addForm.idHero2);
    }
  }
  
  if (
    addForm.imageHero3 !== undefined &&
    addForm.imageHero3 !== "" &&
    addForm.imageHero3name
  ) {
    data.append(
      "heroBanners[2].image",
      GeneralUtility.dataURLtoFile(addForm.imageHero3, addForm.imageHero3name),
      addForm.imageHero3name
    );
  
    // Hanya mengirimkan id jika addForm.idHero3 ada dan tidak kosong
    if (addForm.idHero3) {
      data.append("heroBanners[2].id", addForm.idHero3);
    }
  }
  if (
    addForm.imageBuyback !== undefined &&
    addForm.imageBuyback !== "" &&
    addForm.imageBuybackname
  ) {
    data.append(
      "buybackBanner.image",
      GeneralUtility.dataURLtoFile(
        addForm.imageBuyback,
        addForm.imageBuybackname
      ),
      addForm.imageBuybackname
    );
    // Hanya mengirimkan id jika addForm.idBuyback ada dan tidak kosong
  if (addForm.idBuyback) {
    data.append("buybackBanner.id", addForm.idBuyback);
  }

  }
  
  
  dispatch(setLoadingButton(true));
  let res = await AppCustomizationRepository.updateBanner(data);

  if (!res.error) {
    dispatch(getList);
    PopupUtility.success("Successfully updated");
    dispatch(setLoadingButton(false));
  } else {
    PopupUtility.responseValidate("Failed to update", res.message);
    dispatch(setLoadingButton(false));
  }
};

const Action = {
  getList,
  handleChange,
  handleSubmit,
};

export default Action;
