import { Grid, SvgIcon, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Link, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import { ReactComponent as LogoApp } from '@/assets/trello.svg'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { signupUserAPI } from '@/apis/users.api'

const formInterFace = {
  email: '',
  password: '',
  confirmPassword: ''
}

const SignIn = () => {
  const [auth, setAuth] = useState(formInterFace)

  const onChangeInput = (e) => {
    setAuth((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const navigate = useNavigate()

  const mutionsSignUp = useMutation({
    mutationFn: async () => {
      const res = await signupUserAPI(auth)
      return res
    },
    onSuccess: (data) => {
      if (data) {
        navigate('/sign-in')
      }
    }
  })

  const handleSignUp = () => {
    mutionsSignUp.mutate()
  }

  return (
    <Box sx={{ p: 10 }}>
      <Grid container sx={{ border: 0.5, borderRadius: '5px', borderColor: '#e5e7eb', height: 'calc(100vh - 160px)' }}>
        <Grid item md={6}>
          <Box sx={{ display: 'flex', p: 2, gap: 1 }}>
            <SvgIcon
              component={LogoApp}
              sx={{
                color: (theme) => (theme.palette.mode === 'dark' ? '#fff' : '#172B4D')
              }}
            />
            <Typography
              variant='span'
              sx={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                color: (theme) => (theme.palette.mode === 'dark' ? '#fff' : '#172B4D'),
                cursor: 'pointer'
              }}
            >
              TaskCraft
            </Typography>
          </Box>
          <Box sx={{ p: '48px 150px' }}>
            <Typography variant='h6' sx={{ fontSize: '1.5rem' }}>
              Sign Up
            </Typography>
            <Typography sx={{ fontSize: '0.875rem' }}>
              Have a account? <Link to='/sign-in'>Sign in!</Link>
            </Typography>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSignUp()
              }}
            >
              <Typography variant='subtitle1' sx={{ mt: 3, mb: 0.5 }}>
                Email
              </Typography>
              <TextField
                onChange={onChangeInput}
                name='email'
                type='email'
                variant='outlined'
                size='small'
                sx={{ width: '100%' }}
              />

              <Typography variant='subtitle1' sx={{ mt: 2, mb: 0.5 }}>
                Password
              </Typography>
              <TextField
                onChange={onChangeInput}
                name='password'
                type='password'
                variant='outlined'
                size='small'
                sx={{ width: '100%', mb: 0.5 }}
              />

              <Typography variant='subtitle1' sx={{ mt: 2, mb: 0.5 }}>
                Confirm Password
              </Typography>
              <TextField
                onChange={onChangeInput}
                name='confirmPassword'
                type='password'
                variant='outlined'
                size='small'
                sx={{ width: '100%', mb: 0.5 }}
              />

              <Typography sx={{ mt: 1, mb: 2, color: '#3742fa', textAlign: 'end' }}>Forgot password?</Typography>

              <Button
                type='submit'
                sx={{
                  bgcolor: '#4F46E5',
                  width: '100%'
                }}
                variant='contained'
                disableElevation
              >
                Sign up
              </Button>
            </form>
          </Box>
        </Grid>
        <Grid item md={6}>
          <img
            src='https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80'
            alt='Form Image'
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default SignIn
