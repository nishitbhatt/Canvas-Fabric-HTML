const setVal = (ele, val) => ele.val(val)

const getVal = ele => ele.val();


// Dom Ready
$(function () {


    // Refs
    const canvas = new fabric.Canvas('canvas');
    // Make Text
    var text = new fabric.Textbox('hello world', {
        left: 100,
        top: 100,
        width: 200

    });
    // Add Object To Canvas
    canvas.add(text);


    // Input Refs
    const xPosition = $('#numXPosition');
    const yPosition = $('#numYPosition');
    const numRotation = $('#numRotation');
    const rngRotation = $('#rngRotation');

    const txtFontfamily = $('#txtFontfamily');
    const numSize = $('#numSize');
    const numTextColor = $('#numTextColor');
    const numBGColor = $('#numBGColor');

    // const chkStyleBold = $('#chkStyleBold');
    // const chkStyleItalic = $('#chkStyleItalic');
    // const chkStyleUnderline = $('#chkStyleUnderline');
    // const chkStyleStrikeThrough = $('#chkStyleStrikeThrough');
    // const chkStyleOverline = $('#chkStyleOverline');

    const numOpacity = $('#numOpacity');
    const numSpacing = $('#numSpacing');
    const numLineHeight = $('#numLineHeight');
    const numStroke = $('#numStroke');
    const numStrokeColor = $('#numStrokeColor');




    // ON:SELECT/ Get And Set Object Value in TextBox
    canvas.on('selection:updated', function (o) {
        changeTextboxvaue()
    }).on('selection:created', function (o) {
        changeTextboxvaue()
    }).on('object:moving', function (o) {
        changeTextboxvaue()
    }).on('object:rotating', function (o) {
        changeTextboxvaue()
    })



    function getActiveObject() {
        return canvas.getActiveObject()
    }
    function changeTextboxvaue() {

        const { left, top, angle } = getActiveObject()
        // Set Position
        setVal(xPosition, left.toFixed())
        setVal(yPosition, top.toFixed())
        !isNaN(angle) && setVal(numRotation, Number(angle)?.toFixed())
        !isNaN(angle) && setVal(rngRotation, Number(angle)?.toFixed())
    }



    // ON:INPUT/ GET and Set Value from Text box to object
    xPosition.on('input', function () {
        const object = getActiveObject()
        object.set('left', Number(getVal($(this))))
        canvas.renderAll()
    });
    yPosition.on('input', function () {
        const object = getActiveObject()
        object.set('top', Number(getVal($(this))))
        canvas.renderAll()
    });
    numRotation.on('input', function () {

        const object = getActiveObject()
        const rotateAngleVal = getVal($(this))
        object.rotate(rotateAngleVal);
        setVal(rngRotation, rotateAngleVal)
        canvas.renderAll()

    });
    rngRotation.on('input', function () {
        const object = getActiveObject()
        const rotateAngleVal = getVal($(this))
        object.rotate(rotateAngleVal);
        setVal(numRotation, rotateAngleVal)
        canvas.renderAll()
    });





    txtFontfamily.on('input', function () {

        const object = getActiveObject()
        const fontFamily = getVal($(this))
        object.set('fontFamily', fontFamily);
        canvas.renderAll()

    });
    numSize.on('input', function () {

        const object = getActiveObject()
        const fontSize = getVal($(this))
        object.set('fontSize', fontSize);
        canvas.renderAll()

    });
    numTextColor.on('input', function () {

        const object = getActiveObject()
        const fontColor = getVal($(this))
        object.set('fill', fontColor);
        canvas.renderAll()

    });


    function makeGradiant(params) {

        const { type, leftColor, rightColor, object } = params

        let coords = {
            x1: 0,
            y1: 0,
            x2: object.width,
            y2: object.height,

        };

        if (type === 'radial') {
            coords['r1'] = object.width / 6
            coords['r2'] = object.width / 2
        }
        return new fabric.Gradient({
            type,

            coords,

            colorStops: [
                { offset: leftColor.offset, color: leftColor.color }, // first color stop
                { offset: rightColor.offset, color: rightColor.color }, // second color stop
            ],
        })
    }

    $('.rdoGradiant, #clrGradiantLeftColor, #clrGradiantRighttColor, #numLeftSpread, #numRightSpread').on('change', function () {

        const type = $('.rdoGradiant').filter(":checked").val();
        const leftColor = {
            offset: $('#numLeftSpread').val() / 100,
            color: $('#clrGradiantLeftColor').val(),
        }
        const rightColor = {
            offset: $('#numRightSpread').val() / 100,
            color: $('#clrGradiantRighttColor').val(),
        }

        const object = getActiveObject()
        const gradientObj = makeGradiant({
            type,
            leftColor,
            rightColor,
            object
        })

        object.set("fill", gradientObj);
        canvas.renderAll()
    })

    numBGColor.on('input', function () {

        const object = getActiveObject()
        const backgroundColor = getVal($(this))

        object.set("backgroundColor", backgroundColor);
        canvas.renderAll()

    });
    $('#noBGColorBtn').on('click', function () {
        const object = getActiveObject()
        object.set('backgroundColor', '');
        canvas.renderAll()
    })

    /**
     * Individual Event
     */
    $('.chkStyleEle').on('change', function () {
        const object = getActiveObject();
        const property = $(this).data('prop')
        const isChecked = $(this).is(':checked');
        let propVal = isChecked;

        if (property === 'fontWeight') {
            propVal = isChecked ? 'bold' : 'normal';
        }
        if (property === 'fontStyle') {
            propVal = isChecked ? 'italic' : 'normal';
        }

        object.set(property, propVal);
        // console.log(object)
        canvas.renderAll();
    });

    // chkStyleBold.on('change', function(){
    //     const object = getActiveObject();
    //     const isBold = $(this).is(':checked');
    //     const boldValue = isBold ? 'bold' : 'normal';
    //     object.set('fontWeight', boldValue);
    //     canvas.renderAll();
    // });
    // chkStyleItalic.on('change', function(){
    //     const object = getActiveObject()
    //     const isItalic = $(this).is(':checked');
    //     const italicValue = isItalic ? 'italic' : 'normal';
    //     object.set('fontStyle', italicValue);
    //     canvas.renderAll()
    // })
    // chkStyleUnderline.on('change', function(){
    //     const object = getActiveObject()
    //     const hasUnderline = $(this).is(':checked');
    //     object.set('underline', hasUnderline);
    //     canvas.renderAll()
    // })
    // chkStyleStrikeThrough.on('change', function(){
    //     const object = getActiveObject()
    //     const hasLinethrough = $(this).is(':checked');
    //     object.set('linethrough', hasLinethrough);
    //     canvas.renderAll()
    // })
    // chkStyleOverline.on('change', function(){
    //     const object = getActiveObject()
    //     const hasOverline = $(this).is(':checked');
    //     object.set('overline', hasOverline);
    //     canvas.renderAll()

    // })
    $(".tdoTextAlignment").on('change', function () {

        const object = getActiveObject()
        const alignVal = $(this).val();
        object.set('textAlign', alignVal);
        canvas.renderAll()

    })






    numOpacity.on('input', function () {

        const object = getActiveObject()
        const Opacity = $(this).val();
        object.set('opacity', (Opacity / 100));
        canvas.renderAll()

    })

    numSpacing.on('input', function () {

        const object = getActiveObject()
        const Spacing = $(this).val();
        object.set('charSpacing', Spacing);
        canvas.renderAll()

    })
    numLineHeight.on('input', function () {

        const object = getActiveObject()
        const lineHeight = $(this).val();
        object.set('lineHeight', lineHeight);
        canvas.renderAll()

    })
    numStroke.on('input', function () {

        const object = getActiveObject()
        const stroke = $(this).val();
        object.set('strokeWidth', stroke);
        canvas.renderAll()

    })
    numStrokeColor.on('input', function () {

        const object = getActiveObject()
        const StrokeColor = $(this).val();
        object.set('stroke', StrokeColor);
        canvas.renderAll()

    })



    // Shadow/Shape
    $('.rdShadow').on('change', function () {
        const shadowHolder = $('#shadow-holder')
        shadowHolder.toggleClass('hide', $(this).val() === 'no_shadow')

        const object = getActiveObject()
        if ($(this).val() === 'add_shadow') {

            const shadowObj = makeShadow({
                blur: 5,
                color: '#bf4545',
                offsetX: 5,
                offsetY: 5
            })
            object.set('shadow', shadowObj);
            canvas.renderAll()
        } else {
            object.set('shadow', '');
            canvas.renderAll()
        }
    })

    const shadowColor = $('#shadowColor')
    const shadowBlur = $('#shadowBlur')
    const shadowXOffset = $('#shadowXOffset')
    const shadowYOffset = $('#shadowYOffset')

    $('#shadowColor').add(shadowBlur).add(shadowXOffset).add(shadowYOffset).on('input', function () {
        const object = getActiveObject()
        const shadowObj = makeShadow(getShadowValue())
        object.set('shadow', shadowObj);
        canvas.renderAll()
    })


    function getShadowValue() {
        return {
            blur: getVal(shadowBlur) || 0,
            color: getVal(shadowColor) || null,
            offsetX: getVal(shadowXOffset),
            offsetY: getVal(shadowYOffset)
        }
    }
    function makeShadow({ blur, color, offsetX, offsetY }) {
        return new fabric.Shadow({
            blur, color, offsetX, offsetY
        })
    }


    function drawTextAlongArc(context, str, centerX, centerY, radius, angle) {
        var len = str.length, s;
        
        context.reset()
       
        context.font = '30pt Calibri';
        context.textAlign = 'center';
        context.fillStyle = 'blue';
        context.strokeStyle = 'blue';
        context.lineWidth = 4;

        context.save();
        context.translate(centerX, centerY);
        context.rotate(-1 * angle / 2);
        context.rotate(-1 * (angle / len) / 2);
        for (var n = 0; n < len; n++) {
            context.rotate(angle / len);
            context.save();
            context.translate(0, -1 * radius);
            s = str[n];
            context.fillText(s, 0, 0);
            context.restore();
        }
        context.restore();
    }



    // Curve Shape
    $('#chkCurvedText').on('change', function () {


        const isChecked = $(this).is(':checked')
        const diaMeter = $('#numDiameter').val()

        var context = canvas.getContext('2d'),
            centerX = canvas.width / 2,
            centerY = canvas.height - 30,
            angle = Math.PI * 0.8,
            radius = diaMeter,
            textToShow = text.text;

        isChecked &&
            diaMeter && drawTextAlongArc(context, textToShow, centerX, centerY, radius, angle);

    })
    $('#numDiameter').on('input', function () {


        const diaMeter = $(this).val()
        const isChecked = $('#chkCurvedText').is(':checked')
        var context = canvas.getContext('2d'),
            centerX = canvas.width / 2,
            centerY = canvas.height - 30,
            angle = Math.PI * 0.8,
            radius = diaMeter,
            textToShow = text.text;


        isChecked &&
            diaMeter && drawTextAlongArc(context, textToShow, centerX, centerY, radius, angle);

    })
});

