import { toast } from '@zerodevx/svelte-toast';
import colors from '$css/colors';

export const error = (msg) => {
    toast.push(msg, {
        pausable: true,
        duration: 10000,
        theme: {
            '--toastBackground': '#F56565',
            '--toastBarBackground': '#C53030'
        }
    })
}

export const info = (msg) => {
    toast.push(msg, {
        pausable: true,
        duration: 5000,
        theme: {
            '--toastBackground': '#48BB78',
            '--toastBarBackground': '#2F855A'
        }
    })
}

export const success = (msg) => {
    toast.push(msg, {
        pausable: true,
        duration: 3000,
        theme: {
            '--toastBackground': colors.primary,
            '--toastBarBackground': colors.primary_shade
        }
    })
}