import { signinUserAPI } from '@/apis/users.api'
import { ReactComponent as LogoApp } from '@/assets/trello.svg'
import { loginUser } from '@/redux/userSile'
import { Grid, SvgIcon, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const SignIn = () => {
  const [user, setUser] = useState({ email: '', password: '' })

  // currying
  const handleChangeUserInput = (inputName) => (event) => {
    setUser((prev) => ({ ...prev, [inputName]: event.target.value }))
  }

  const navigate = useNavigate()
  const disPatch = useDispatch()

  const mutionUserLogin = useMutation({
    mutationFn: async () => {
      const res = await signinUserAPI(user)
      return res
    },
    onSuccess: (data) => {
      if (data) {
        localStorage.setItem('accessToken', data?.accessToken)
        disPatch(loginUser(data))
        navigate('/')
      }
    }
  })

  const userLogin = () => {
    mutionUserLogin.mutate()
  }

  return (
    <Box sx={{ p: 10 }}>
      <Grid container sx={{ border: 0.5, borderRadius: '5px', borderColor: '#e5e7eb', height: 'calc(100vh - 160px)' }}>
        <Grid item md={6}>
          <Box sx={{ display: 'flex', p: 2, gap: 1 }} onClick={() => navigate('/')}>
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
              Sign in
            </Typography>
            <Typography sx={{ fontSize: '0.875rem' }}>
              Not a member? <Link to='/sign-up'>Sign up!</Link>
            </Typography>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                userLogin()
              }}
            >
              <Typography variant='subtitle1' sx={{ mt: 3, mb: 0.5 }}>
                Email
              </Typography>
              <TextField
                value={user.email}
                onChange={handleChangeUserInput('email')}
                type='email'
                variant='outlined'
                size='small'
                sx={{ width: '100%' }}
              />

              <Typography variant='subtitle1' sx={{ mt: 2, mb: 0.5 }}>
                Password
              </Typography>
              <TextField
                value={user.password}
                onChange={handleChangeUserInput('password')}
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
                Sign in
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
