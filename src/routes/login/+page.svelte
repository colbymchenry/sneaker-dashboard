<script>

    import Input from "$lib/shared/Input.svelte";
    import Button from "$lib/shared/Button.svelte";
    import {authClient} from "$lib/stores/firebase_store";
    import Form from "$lib/shared/Form.svelte";

    let form;

    function validateEmail() {
        if (!$form.values["email"]) {
            $form.errors["email"] = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($form.values["email"])) {
            $form.errors["email"] = 'Invalid email address';
        } else {
            $form.errors["email"] = '';
        }
    }

    function validatePassword() {
        if (!$form.values["password"]) {
            $form.errors["password"] = 'Password is required';
        } else if ($form.values["password"].length < 6) {
            $form.errors["password"] = 'Password must be at least 6 characters';
        } else {
            $form.errors["password"] = '';
        }
    }

    async function onSubmit(formData) {
        validateEmail();
        validatePassword();

        try {
            await $authClient.signIn(formData.email, formData.password);
        } catch (error) {
            if (error.code === 'auth/wrong-password') {
                $form.errors["password"] = 'Invalid password';
            } else if (error.code === 'auth/user-not-found') {
                $form.errors["email"] = 'Email not found';
            } else {
                console.error('Login failed', error);
            }
        }
    }
</script>

<div class="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-50 bg-gray-700 z-50">
    <Form bind:form className="bg-white rounded-md p-8 shadow-lg" {onSubmit} let:handleInput>
        <h2 class="text-lg font-medium text-text mb-4">Login</h2>
        <div class="mb-4">
            <Input name="email" type="email" label="Email" placeholder="Enter your email" on:input={handleInput}/>
        </div>
        <div class="mb-6">
            <Input name="password" type="password" label="Password" placeholder="Enter your password" on:input={handleInput}/>
        </div>
        <div class="flex items-center justify-center">
            <Button type="submit" color="secondary" disabled={$form?.disabled} loading={$form?.submitted}>Sign in</Button>
        </div>
    </Form>
</div>