import { LinearProgress, linearProgressClasses, styled } from "@mui/material";

interface testeValue {
  value: number;
}

export const ProgressBar = styled(LinearProgress)((props: any) => {
  console.log('any', props)
  const value = props.value
  return {
    top: 2,
    right: 2,
    height: 16,
    borderRadius: 16,
    border: '2px solid white',
    overflow: 'inherit',
    [`&.${linearProgressClasses.colorPrimary}`]: {
      padding: 4,
      boxShadow: 'inset -1px 1px 2px 2px rgb(0 0 0 / 16%)',
      backgroundImage: 'linear-gradient(90deg, transparent, transparent 70%, rgba(255, 255, 255, 0.6)  85%, #00000089 100%), linear-gradient(90deg, rgba(0,219,255,1) 0%, rgba(0,255,248,1) 10%, rgba(79,255,16,1) 29%, rgba(237,255,4,1) 36%, rgba(255,166,0,1) 66%, rgba(252,0,0,1) 90%)',
      backgroundSize: ' 10.1% 10%, 100% 10px'
      // backgroundImage: 'linear-gradient(90deg, rgba(0,219,255,1) 0%, rgba(0,255,248,1) 7%, rgba(79,255,16,1) 29%, rgba(237,255,4,1) 46%, rgba(255,166,0,1) 86%, rgba(252,0,0,1) 94%)',
      // backgroundSize: '20px 10px, 100% 3px'
      // backgroundImage: 'linear-gradient(90deg, #000 0%, #000 10%, transparent 11%, transparent 75%, transparent 100%)'
    },
    [`& .${linearProgressClasses.bar}`]: {
      top: 2,
      bottom: 2,
      left: 2,
      // right: 2,
      // borderRadius: 16,
      backgroundColor: 'transparent',
      // borderRight: '2px solid #fff',
      // boxShadow: 'inset -1px 0px 0px 1px black',
    },
    // '& :before': {
    //   content: "'" + value +'%'+ "'",
    //   position: 'absolute',
    //   right: -30,
    //   top: -16,
    //   borderRadius: 16,
    // background: 'black',
    // color: '#fff',
    // padding: '2px 8px'
    // },
    '& :after': {
      content: '""',
      width: 2,
      height: 16,
      // border: '1px solid #fff',
      boxShadow: '0px 0px 0px 2px rgb(255 255  255 / 80%)',
      borderRadius: 8,
      background: 'black',
      // borderLeft: '6px solid transparent',
      // borderRight: '6px solid transparent',
      // borderTop: '10px solid white',
      position: 'absolute',
      right: 1,
      top: -4,
      zIndex: 999
    },
  }
});