"use client";
import { useEffect, useRef, useState } from "react";
import { rgbaToHex } from "../../../utils/rgbaToHex";
import { Box, Grid, Typography } from "@mui/material";
import { handleCopyText } from "../../../utils/handleCopyText";
import { ToastContainer } from "react-toastify";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { showFullDetailsOfColors } from "../../../utils/showFullDetailsOfColors";
import { useRouter } from "next/navigation";

export function FavoritePalette() {
  const [collection, setCollection] = useState();

  const [index, setIndex] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const selectedColorPaletteRow = localStorage.getItem(
      "selectedColorPalette"
    );

    const colorPaletteIndexRow = localStorage.getItem("colorPaletteIndex");
    if (selectedColorPaletteRow && colorPaletteIndexRow) {
      const selectedColorPalette = JSON.parse(selectedColorPaletteRow);
      const colorPaletteIndex = JSON.parse(colorPaletteIndexRow);
      const updatedPalette = selectedColorPalette.filter(
        (unit, index) => !colorPaletteIndex.includes(unit.id)
      );
      localStorage.setItem(
        "selectedColorPalette",
        JSON.stringify(updatedPalette)
      );
        localStorage.setItem(
        "colorPaletteIndex",
        JSON.stringify([])
      );
      const temp = localStorage.getItem("selectedColorPalette");
      let finalColorPalette = JSON.parse(temp);
      setCollection(finalColorPalette);

    } else if (selectedColorPaletteRow) {
      const selectedColorPaletteRow = localStorage.getItem(
        "selectedColorPalette"
      );
      const selectedColorPalette = JSON.parse(selectedColorPaletteRow);
      setCollection(selectedColorPalette);
    }

    // console.log(selectedColorPalette);
  }, []);

  const handleStoreIndex = (e: React.MouseEvent<HTMLInputElement> ,id: any) => {
    e.stopPropagation();
    setIndex((prev) => [...prev, id]);
    const colorPaletteIndexRow = localStorage.getItem("colorPaletteIndex");
    if (colorPaletteIndexRow) {
      const colorPaletteIndex = JSON.parse(colorPaletteIndexRow);
      const updatedColorPaletteIndex = [...colorPaletteIndex, id];
      localStorage.setItem(
        "colorPaletteIndex",
        JSON.stringify(updatedColorPaletteIndex)
      );
    } else {
      localStorage.setItem("colorPaletteIndex", JSON.stringify([index]));
    }
  };

  const handleRemoveIndex = (e: React.MouseEvent<HTMLInputElement>, selectedIndex: any) => {
    e.stopPropagation();
    const colorPaletteIndexRow = localStorage.getItem("colorPaletteIndex");
    if (colorPaletteIndexRow) {
      const colorPaletteIndex = JSON.parse(colorPaletteIndexRow);
      const updatedColorPaletteIndex = colorPaletteIndex?.filter(
        (i) => i !== selectedIndex
      );

      localStorage.setItem(
        "colorPaletteIndex",
        JSON.stringify(updatedColorPaletteIndex)
      );
    }
    const updatedIndex = index?.filter((i) => i !== selectedIndex);

    console.log(updatedIndex);
    setIndex(updatedIndex);
  };

  console.log(index);
  return (
    <Box width="100%" minHeight="100vh" padding={{ xs: 2, sm: 4, md: 8 }}>
      <Grid container spacing={3} justifyContent="center" flexWrap="wrap">
        {collection?.map((unit: any, paletteIndex: any) => {
          return (
            <Box
              key={`palette-${unit.id}`}
              display="flex"
              flexDirection="column"
              alignContent="center"
              width={275}
              height={275}
              borderRadius={4}
              margin={1}
              onClick={(e)=>showFullDetailsOfColors(e, unit, router)}
            >
              {unit.colors.map((color: string, colorIndex: any) => {
                const hex = rgbaToHex(color);
                return (
                  <Box
                    key={`color-${paletteIndex}-${colorIndex}`}
                    width="100%"
                    height={100}
                    bgcolor={color}
                    display="flex"
                    alignItems="flex-end"
                    paddingLeft="5px"
                    sx={{
                      cursor: "pointer",
                      borderTopLeftRadius: colorIndex === 0 ? 5 : 0,
                      borderTopRightRadius: colorIndex === 0 ? 5 : 0,
                      borderBottomLeftRadius: colorIndex === 4 ? 5 : 0,
                      borderBottomRightRadius: colorIndex === 4 ? 5 : 0,
                      "&:hover .color-value": { opacity: 1 },
                    }}
                  >
                    <Typography
                      className="color-value"
                      fontSize="15px"
                      color="white"
                      sx={{
                        opacity: 0,
                        transition: "opacity 0.2s ease-in-out",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        marginBottom: "5px",
                      }}
                      onClick={(e) => handleCopyText(e, hex)}
                    >
                      {hex}
                    </Typography>
                  </Box>
                );
              })}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginTop: "6px",

                  // backgroundColor:'lightgrey',
                  // width : '60px',
                  // padding: '8px',
                  // margin: '8px'
                }}
              >
                {index.includes(unit.id) ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      gap: "10px",

                      padding: "7px",
                      borderRadius: "5px",
                    }}
                  >
                    {" "}
                    <FavoriteBorderIcon
                      onClick={(e) => handleRemoveIndex(e, unit.id)}
                    />{" "}
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      gap: "10px",
                      backgroundColor: "#bebec433",
                      padding: "7px",
                      borderRadius: "5px",
                    }}
                  >
                    <FavoriteIcon
                      fontSize="small"
                      onClick={(e) => handleStoreIndex(e, unit.id)}
                    />{" "}
                    <Typography>Like</Typography>
                  </Box>
                )}
              </Box>
            </Box>
          );
        })}
      </Grid>
      <ToastContainer />
    </Box>
  );
}
