import AddRealizationForm from "../RealizationsComponents/AddRealizationForm";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../../hooks/useHttp";
import { API_CALL_URL_BASE } from "../../../utils/Constants";
import { useParams } from "react-router-dom";
import { popUpInfoActions } from "../../../storage/redux";
import { useNavigate } from "react-router-dom";

export default function EditRealization(){

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState(null);
    const [inputCategory, setInputCategory] = useState("");
    const [oldImages, setOldImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [initialDescription, setInitialDescription] = useState("")

    const contentEditorRef = useRef(null);
    const imagesToRemoveRef = useRef([]);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const realizationId = useParams().realizationId;

    const token = useSelector((state) => {
        return state.loginData.token;
    })

    const [sendEditRequest, isEditRequestLoading] = useHttp(`${API_CALL_URL_BASE}api/post/edit`)

    function editResponseHandler(response){
        if(!response.ok){
            throw new Error("Nie udało się edytować realizacji")
        }
        return response.json().then(data=>{
            console.log(data)
            dispatch(
                popUpInfoActions.setMessage({
                    isError: false,
                    message: "Realizacja została zaktualizowana",
                    isVisible: true
                })
            )
            navigate("/admin/realizations")
        })
    }

    function editErrorHandler(error){
        dispatch(
            popUpInfoActions.setMessage({
                isError: true,
                message: error.message,
                isVisible: true
            })
        )
    }

    function formSubmitHandler(){
        const formData = new FormData()
        formData.append("id", realizationId)
        formData.append("title", title)
        formData.append("category", inputCategory)
        formData.append("description", contentEditorRef.current.getContent())
        for(const deletedImage of imagesToRemoveRef.current){
            formData.append("deletedPhotos",deletedImage)
        }
        for(const image of newImages){
            formData.append("images", image)
        }
        sendEditRequest(editResponseHandler, editErrorHandler, {
            method: "PUT",
            headers:{
                Authorization: token
            },
            body: formData
        })
    }

    const [getInitialData, isInitialDataLoading] = useHttp(`${API_CALL_URL_BASE}api/post/${realizationId}`)

    function initialDataResponseHandler(response){
        if(!response.ok){
            throw new Error("Nie udało się pobrać danych realizacji")
        }
        return response.json().then(data=>{
            const postContent = data.postContent
            const postPhotos = data.postPhotos
            setTitle(postContent.title)
            setInputCategory(postContent.category)
            setCategory(postContent.category)
            setOldImages(postPhotos)
            setInitialDescription(postContent.description)
        })
    }


    function initialDataErrorHandler(error){
        dispatch(
            popUpInfoActions.setMessage({
                isError: true,
                message: error.message,
                isVisible: true
            })
        )
        navigate("/admin/realizations")
    }

    useEffect(()=>{
        if(!realizationId) return;
        getInitialData(initialDataResponseHandler, initialDataErrorHandler)
    },[
        getInitialData, realizationId
    ])


    return <AddRealizationForm
    isLoading={isEditRequestLoading || isInitialDataLoading}
    title = {title}
    inputCategory = {inputCategory}
    category = {category}
    newImages = {newImages}
    oldImages = {oldImages}
    onFormSubmit = {formSubmitHandler}
    onTitleChange = {(title)=>setTitle(title)}
    onCategoryChange = {(category)=>setCategory(category)}
    onInputCategoryChange = {(category)=>setInputCategory(category)}
    onAddNewImages = {(images)=>setNewImages((prevValue)=>[...prevValue, ...images])}
    onRemoveNewImages = {(index)=>{
        setNewImages((prevState) => {
            const newState = [...prevState];
            newState.splice(index, 1);
            return newState;
          })
    }}
    onRemoveOldImages={(image, index)=>{
        imagesToRemoveRef.current.push(image.path)
        setOldImages((prevState)=>{
            const newState = [...prevState]
            newState.splice(index, 1)
            return newState
        })
    }}
    contentEditorRef = {contentEditorRef}
    editorInitialValue={initialDescription}
    />
}