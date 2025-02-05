import React, { useEffect, useState } from 'react';
import api from "../../services/api";
import {
  Container,
  CssBaseline,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import { Check, Close } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  card: {
    minWidth: 800, // Aumentei a largura do card
    margin: theme.spacing(2),
    textAlign: "center",
  },
  title: {
    fontSize: 18, // Aumentei o tamanho da fonte
  },
  price: {
    fontSize: 32, // Aumentei o tamanho da fonte
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  table: {
    marginTop: theme.spacing(3),
  },
}));

const Plans = () => {
  const classes = useStyles();
  const history = useHistory();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserPlan, setCurrentUserPlan] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: plansData } = await api.get("/plans");
        setPlans(plansData.plans);

        const { data: userData } = await api.get("/companies/listPlan/" + localStorage.getItem('companyId'));
        setCurrentUserPlan(userData.plan);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleSelectPlan = (plan) => {
    localStorage.setItem('choosedPlan', JSON.stringify(plan));
    history.push({
      pathname: "/paymentBrick",
    });
  };

  const features = [
    { key: 'useCampaigns', label: 'Campanhas' },
    { key: 'useExternalApi', label: 'API Externa' },
    { key: 'useIntegrations', label: 'Integrações' },
    { key: 'useInternalChat', label: 'Chat Interno' },
    { key: 'useSchedules', label: 'Schedules' },
    { key: 'useKanban', label: 'Kanban' },
    { key: 'useOpenAI', label: 'OpenAi' },
    { key: 'users', label: 'Usuários' },
    { key: 'queues', label: 'Filas' },
    { key: 'connections', label: 'Conexões' },
  ];

  const isNumericFeature = (key) => {
    return ['users', 'queues', 'connections'].includes(key);
  };

  const userPlan = plans.find((plan) => currentUserPlan && plan.id === currentUserPlan.id);

  return (
    <Container component="main" maxWidth="lg"> {/* Aumentei o maxWidth para "lg" */}
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4" gutterBottom>
          Plano Atual
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {userPlan ? (
            <Grid item xs={12} md={8}> {/* Ajustei o número de colunas ocupadas */}
              <Card className={classes.card}>
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    {userPlan.name}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {userPlan.description}
                  </Typography>
                  <Typography className={classes.price}>
                    R$ {userPlan.value}
                  </Typography>
                  <TableContainer component={Paper} className={classes.table}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Funcionalidade</TableCell>
                          <TableCell align="center">Disponível</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {features.map((feature) => (
                          <TableRow key={feature.key}>
                            <TableCell component="th" scope="row">
                              {feature.label}
                            </TableCell>
                            <TableCell align="center">
                              {isNumericFeature(feature.key) ? (
                                userPlan[feature.key] || 0
                              ) : (
                                userPlan[feature.key] ? <Check style={{ color: 'green' }} /> : <Close style={{ color: 'red' }} />
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    fullWidth
                    onClick={() => {
                      handleSelectPlan(userPlan);
                    }}
                  >
                    Renovar Plano Atual
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ) : (
            <Typography variant="body1" color="textSecondary">
              Nenhum plano encontrado.
            </Typography>
          )}
        </Grid>
      </div>
    </Container>
  );
};

export default Plans;