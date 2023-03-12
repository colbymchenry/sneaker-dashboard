<script>
    import {getContext, onMount, setContext} from 'svelte';
    import {FormContext} from "$lib/shared/FormContext.js";
    import {writable} from "svelte/store";

    export let className = '';
    export let initialValues = {};
    export let validationSchema = {};
    export let onSubmit = () => {};
    export let style = '';

    let values = initialValues;
    let errors = {};
    let submitted = false;

    setContext(FormContext.key, writable({ values, errors }));
    export let form = getContext(FormContext.key);

    const validateField = (name, value) => {
        const fieldValidationSchema = validationSchema[name];

        if (fieldValidationSchema) {
            const { required, validator } = fieldValidationSchema;

            if (required && !value) {
                return 'This field is required';
            }

            if (validator && !validator(value)) {
                return 'Invalid value';
            }
        }

        return '';
    };

    const validateForm = () => {
        let formErrors = {};

        Object.entries(values).forEach(([name, value]) => {
            const fieldError = validateField(name, value);

            if (fieldError) {
                formErrors[name] = fieldError;
            }
        });

        return formErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formErrors = validateForm();

        if (Object.keys(formErrors).length === 0) {
            submitted = true;
            await onSubmit(values);
            submitted = false;
        } else {
            errors = formErrors;
        }
    };

    const handleInput = (event) => {
        const { name, value } = event.target;

        values = {
            ...values,
            [name]: value
        };

        errors = {
            ...errors,
            [name]: validateField(name, value)
        };
    };

    onMount(() => {
        errors = validateForm();
    });

    $: $form = {values, errors, submitted, disabled: Object.values(errors).find((e) => e?.length) !== undefined};
</script>

<form class={className} {style} on:submit={handleSubmit}>
    <slot {handleInput} />
</form>
