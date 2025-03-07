import {useEffect, useState} from "react"

const Preloader = () => {

    useEffect(() => {
        animate()
    },[])

    const styles = {
        preloadWrapper: {
            height: "50px",
            width: "100px",
            // background: "rgba(0,0,0,0.8)",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform:"translate(-50%,-50%)",
            zIndex:100,
            gap:"0.5rem"
        },
        circles: {
            width: "15px",
            height: "15px",
            borderRadius: "50px",
            background: "black"
        },
        modal_overlay: {
            height: "100%",
            width: "100%",
            position: "absolute",
            top: "0",
            left: "0",
            zIndex:100,
            background: "rgba(0,0,0,0.2)",
        }
    }

    let sin = 15;
    var status = true
    var next = 0;
    var animationId;
    var angle =0



    // function animate() {
    //     if (next == 3) {
    //         next = 0;
    //     }

    //     const circles = document.querySelectorAll(".circle")[next]
    //     if (status) {
    //         sin+=0.2;
    //         if (sin >= 30) {
    //             status=false
    //         }
    //     }

    //     if (!status) {
    //         sin-=0.2
    //         if (sin <= 15) {
    //             status = true;
    //             next += 1;
    //         }
    //     }

    //     // To cancel to animation before it ends up with a 'undefined' reading 'styles'
    //     if (!circles) {
    //         cancelAnimationFrame(animationId)
    //         return
    //     }

    //     circles.style.height=sin+"px"
    //     circles.style.width = sin+"px";

    //     animationId = requestAnimationFrame(animate)
    // }

    function animate() {
        const circles = document.querySelectorAll(".circle");
        if (circles.length === 0) {
            cancelAnimationFrame(animationId);
            return;
        }

        if (!circles[next]) {
            next = 0; // Reset to avoid 'undefined' errors
        }

        // Smooth oscillation using sine function
        let sin = 15 + Math.sin(angle) * 8; // Oscillates between 15 and 30

        circles[next].style.height = sin + "px";
        circles[next].style.width = sin + "px";

        angle += 0.08; // Controls the speed of animation

        // Move to the next circle after a full oscillation
        if (angle >= Math.PI * 2) {
            angle = 0;
            next = (next + 1) % circles.length;
        }

        animationId = requestAnimationFrame(animate);
    }


    return (
        <>
            <div className="modal_overlay" style={styles.modal_overlay}> 
                <div className="preloadWrapper" style={styles.preloadWrapper}>
                    <div className="circle" style={styles.circles}></div>
                    <div className="circle" style={styles.circles}></div>
                    <div className="circle" style={styles.circles}></div>
                </div>
            </div>
        </>
    )
}

export default Preloader;