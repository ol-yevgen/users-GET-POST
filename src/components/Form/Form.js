import { useForm, Controller, isValid, dirtyFields } from "react-hook-form";

import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHttp } from '../../hooks/http.hook'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

import { fetchUsers, usersCleaned, usersCount } from '../../redux/features/slices/usersSlice';
import { fetchRadioButton } from '../../redux/features/slices/radioButtonSlice'
import { RadioButtons, RadioButtonGroup } from '../PositionsRadio/PositionsRadio'

import { MyTextInput } from '../FormInputs/FormInputs'
import { Button } from '../UI/Button/Button';

import '../PositionsRadio/positionsRadio.scss';
import '../FormInputs/formInputs.scss';

const schema = yup.object().shape({
    name: yup
        .string()
        .required()
        .min(2, 'Minimum 2 characters')
        .max(60, 'Maximum 60 characters'),
    email: yup
        .string()
        .min(2, 'Minimum 2 characters')
        .max(60, 'Maximum 60 characters')
        .required()
        .matches(/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/, 'The email must be a valid email address.'),
    phone: yup
        .string()
        .required()
        .matches(/^[+]{0,1}380([0-9]{9})$/, 'The phone number must be +38 (XXX) XXX - XX - XX'),
    position_id: yup
        .number()
        .integer()
        .required(),
    photo: yup
        .mixed()
        .required('Required file')
        .test('fileSize', 'The file is too large', (value) => {
            return value && value.size <= 5000000
        })
})

export const CustomForm = forwardRef((props, ref) => {
    const [token, setToken] = useState('')

    const radioButtons = useSelector(state => state.radioButton.radioButton);
    const radioButtonLoadingStatus = useSelector(state => state.radioButton.radioButtonLoadingStatus);

    const dispatch = useDispatch();
    const { request } = useHttp();

    const {
        register,
        control,
        getValues,
        formState: {
            errors,
            isValid,
            dirtyFields
        },
        handleSubmit,
        reset
    } = useForm(
        {
            defaultValues: {
                name: "",
                email: "",
                phone: "",
                position_id: null,
                photo: ''
            },
            mode: "onChange",
            resolver: yupResolver(schema)
        }
    )

    useEffect(() => {
        dispatch(fetchRadioButton())
        // eslint-disable-next-line
    }, []);

    const renderPositionsList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Positions not found</h5>
        }

        return arr.map(({ id, name }) => {
            return <div key={name}>
                <input
                    type="radio"
                    name='position_id'
                    id={name}
                    value={id}
                    {...register('position_id')} />
                <label htmlFor={name}>{name}</label>
            </div>
        })
    }
    const radioButtonsList = renderPositionsList(radioButtons)

    const successfullyRegistered = useCallback(() => {
        
        return isValid ? props.setFormSubmited(true) : null
        // eslint-disable-next-line
    }, [isValid])

    const onSubmit = useCallback((data) => {

        request('https://frontend-test-assignment-api.abz.agency/api/v1/token', "GET")
            .then(token => setToken(token.token))
            .catch(err => console.log(err))

        request("https://frontend-test-assignment-api.abz.agency/api/v1/users", "POST", data, { Authentication: `Bearer ${token}` })
            .then(dispatch(usersCleaned()))
            .then(dispatch(fetchUsers(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6`)))
            .then(dispatch(usersCount()))
            .catch(err => console.log(err));
        reset();
    }, [])

    return (
        <form
            className="form"
            onSubmit={handleSubmit(onSubmit)}
            ref={ref}
        >

            <div className={errors?.name ? `form__input ${'error__border'}` : 'form__input'}>
                <input
                    type="text"
                    id="name"
                    autoComplete="off"
                    {...register('name',)} />
                <span className={errors?.name ? (dirtyFields.name ? 'form__input-small error__text' : 'form__input-big error__text') : (dirtyFields.name ? 'form__input-small' : 'form__input-big ')}>Name</span>

                {errors?.name && <span className="form__input-error ">{errors?.name?.message || "Error!"}</span>}
            </div>
            <div className={errors?.email ? `form__input ${'error__border'}` : 'form__input'}>
                <input
                    type="text"
                    id="email"
                    autoComplete="off"
                    {...register('email')}
                />
                <span className={errors?.email ? (dirtyFields.email ? 'form__input-small error__text' : 'form__input-big error__text') : (dirtyFields.email ? 'form__input-small' : 'form__input-big ')}>Email</span>
                {errors?.email && <span className="form__input-error ">{errors?.email?.message || "Error!"}</span>}
            </div>
            <div className={errors?.phone ? `form__input ${'error__border'}` : 'form__input'}>
                <input
                    type="text"
                    id="phone"
                    autoComplete="off"
                    {...register('phone')}
                />
                <span className={errors?.phone ? (dirtyFields.phone ? 'form__input-small error__text' : 'form__input-big error__text') : (dirtyFields.phone ? 'form__input-small' : 'form__input-big ')}>Phone</span>
                {errors.phone ? <span className="form__input-error ">{errors?.phone?.message || "Error!"}</span> : <span className="phone form__input-error ">+38 (XXX) XXX - XX - XX</span>}
            </div>

            <fieldset >
                <legend>Select</legend>
                {radioButtonsList}
                {errors?.position_id && <span className="form__input-error">{'Required radio'}</span>}
            </fieldset>

            <div className="form__file">
                <Controller
                    control={control}
                    name={'photo'}
                    rules={{ required: 'Required file' }}
                    render={({ field: { value, onChange, ...field } }) => {
                        return (
                            <input
                                {...field}
                                value={value?.fileName}
                                onChange={(event) => {
                                    onChange(event.target.files[0]);
                                }}
                                type="file"
                                id="photo"
                            />
                        );
                    }}
                />
                <label htmlFor="file">Upload</label>

                <div className="form__file-title">
                    <span className='file__title'>{!getValues('photo') ? 'Upload your photo' : (getValues('photo').name)}</span>
                </div>
                {errors.photo && <span className="form__input-error">{errors?.photo?.message || "Error!"}</span>}
            </div>

            <Button
                text="Sign Up"
                submit="submit"
                className={!isValid ? 'disabled' : ''}
                func={successfullyRegistered}
                disabled={!isValid}
            />
        </form>

    )
})