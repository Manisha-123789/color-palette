"use client";
import { Box, Grid, Snackbar, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { rgbaToHex } from "../../../utils/rgbaToHex";
import { handleCopyText } from "../../../utils/handleCopyText";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { showFullDetailsOfColors } from "../../../utils/showFullDetailsOfColors";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function Home() {
  const [palettes, setPalettes] = useState([]);
  const [visibleItems, setVisibleItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [selectedColorPalette, setSelectedColorPalette] = useState([]);
  const [index, setIndex] = useState();
  const itemsPerPage = 8;
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  console.log(selectedColorPalette);

  useEffect(() => {
    console.log("called");
    const allColorPaletteRaw = localStorage.getItem("allColorPalette");
    const selectedColorPaletteRaw = localStorage.getItem(
      "selectedColorPalette"
    );
    let selectedColorPalettelocal;
    if(selectedColorPaletteRaw){
      selectedColorPalettelocal = JSON.parse(selectedColorPaletteRaw);
    }
    const colorPaletteIndexRow = localStorage.getItem("colorPaletteIndex");
    const colorPaletteIndex = JSON.parse(colorPaletteIndexRow);
    
    if (colorPaletteIndex?.length > 0) {
      const temp = selectedColorPalettelocal?.filter(
        (palette) => !colorPaletteIndex.includes(palette.id)
      );
      localStorage.setItem("selectedColorPalette", JSON.stringify(temp));
      localStorage.setItem("colorPaletteIndex", JSON.stringify([]));
      setSelectedColorPalette(temp);
    }else {
setSelectedColorPalette(selectedColorPalettelocal);
    }
    

    if (allColorPaletteRaw) {
      const allColorPalette = JSON.parse(allColorPaletteRaw);
      setPalettes(allColorPalette);
    } else {
      function generateColorPalette() {
        return Array(10000)
          .fill("")
          .map((_, index) => {
            let r = Math.floor(Math.random() * 256);
            let g = Math.floor(Math.random() * 256);
            let b = Math.floor(Math.random() * 256);

            const rgba = Array.from({ length: 5 }, (_, index) =>
              index === 4
                ? `rgba(${r},${g},${b},1)`
                : `rgba(${r},${g},${b},0.${index * 2 + 2})`
            );

            return { id: uuidv4(), colors: rgba };
          });
      }
      const allColorPalette = generateColorPalette();
      localStorage.setItem("allColorPalette", JSON.stringify(allColorPalette));
      setPalettes(allColorPalette);
    }
  }, []);

  useEffect(() => {
    if (palettes.length) {
      const slice = palettes.slice(0, page * itemsPerPage);
      setVisibleItems(slice);
    }
  }, [palettes, page]);

  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });

    observer.observe(loaderRef.current);

    return () => {
      observer.disconnect();
    };
  }, [loaderRef]);

  const handleSelectedColor = (e: React.MouseEvent<HTMLInputElement>, unit) => {
    e.stopPropagation();

    const selectedColorPaletteRow = localStorage.getItem(
      "selectedColorPalette"
    );
    if (selectedColorPaletteRow) {
      let selectedColorPalette = JSON.parse(selectedColorPaletteRow);
      let setColorPalette = [
        ...selectedColorPalette,
        { id: unit.id, colors: unit.colors },
      ];
      localStorage.setItem(
        "selectedColorPalette",
        JSON.stringify(setColorPalette)
      );
      setSelectedColorPalette(setColorPalette);
    } else {
      localStorage.setItem(
        "selectedColorPalette",
        JSON.stringify([{ id: unit.id, colors: unit.colors }])
      );
      setSelectedColorPalette([{ id: unit.id, colors: unit.colors }]);
    }
  };

  const handleRemoveIndex = (
    e: React.MouseEvent<HTMLInputElement>,
    selectedIndex: any
  ) => {
    e.stopPropagation();
    const temp = selectedColorPalette.filter(
      (unit) => unit.id !== selectedIndex
    );
    setSelectedColorPalette(temp);
    localStorage.setItem("selectedColorPalette", JSON.stringify(temp));
  };

  return (
    <>
      <Box width="100%" minHeight="100vh" padding={{ xs: 2, sm: 4, md: 8 }}>
        <Grid container spacing={3} justifyContent="center" flexWrap="wrap">
          {visibleItems?.map((unit, paletteIndex) => {
            return (
              <Box
                id={unit.id}
                key={`palette-${paletteIndex}`}
                display="flex"
                flexDirection="column"
                alignContent="center"
                width={275}
                height={275}
                borderRadius={4}
                margin={1}
                onClick={(e) => showFullDetailsOfColors(e, unit, router)}
              >
                {unit?.colors?.map((color, colorIndex) => {
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
                {/* <FavoriteBorderIcon
                  onClick={(e) => handleSelectedColor(e, unit)}
                /> */}
                {!selectedColorPalette?.find(
                  (palette) => palette.id === unit.id
                ) ? (
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
                      onClick={(e) => handleSelectedColor(e, unit)}
                    />{" "}
                  </Box>
                ) : (
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
                    <FavoriteIcon
                      fontSize="small"
                      onClick={(e) => handleRemoveIndex(e, unit.id)}
                    />{" "}
                  </Box>
                )}
              </Box>
            );
          })}
          <div ref={loaderRef} style={{ height: "50px", width: "100%" }}></div>
        </Grid>
        <ToastContainer />
      </Box>
    </>
  );
}
